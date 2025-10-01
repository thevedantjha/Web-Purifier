import { BAD_WORDS } from './bad_words.js';

const BAD_WORDS_SET = new Set(BAD_WORDS.map(w => w.toLowerCase()));
const rewriteCache = new Map();
const processedSentencesPerElement = new WeakMap();
let rewriter = null;
let roundNumber = 1;
let isRoundInProgress = false;
let isTheExtensionOn;
let globalRGB = null;

function splitIntoSentences(text) {
  const sentenceEndings = /([.!?])\s+/g;
  return text.split(sentenceEndings)
    .filter(Boolean)
    .map((sentence, index, array) => {
      if (index % 2 === 0) return sentence.trim() + (array[index + 1] || '').trim();
      return null;
    })
    .filter(Boolean);
}

function containsBadWord(text) {
  const words = text.toLowerCase().match(/\b\w+\b/g);
  if (!words) return false;
  return words.some(w => BAD_WORDS_SET.has(w));
}

async function classifySentencesBatch(sentences) {
  return new Promise(resolve => {
    chrome.runtime.sendMessage({ action: "classifyBatch", sentences }, (response) => {
      if (chrome.runtime.lastError || !response) resolve([]);
      else resolve(response);
    });
  });
}

async function initializeRewriter() {
  if (rewriter) return rewriter;

  if (!('Rewriter' in self)) {
    console.error('❌ Rewriter API not supported in this environment.');
    return null;
  }

  try {
    const availability = await Rewriter.availability();
    if (availability === 'unavailable') {
      console.error('❌ Rewriter API unavailable.');
      return null;
    }

    console.log('Initializing Rewriter...');

    rewriter = await Rewriter.create({
      sharedContext: 'ONLY rewriting toxic text to be nice/harmless. Only output rewrite, no intro.',
      tone: 'more-formal',
      format: 'plain-text',
      length: 'shorter',
      monitor(m) {
        m.addEventListener("downloadprogress", e => {
          console.log(`Rewriter download progress: ${Math.round(e.loaded * 100)}%`);
        });
      }
    });

    console.log('Rewriter initialized.');
    return rewriter;
  } catch (err) {
    console.error("❌ Rewriter initialization failed:", err);
    return null;
  }
}

async function rewriteSentence(sentence) {
  sentence = sentence.trim();
  if (rewriteCache.has(sentence)) return rewriteCache.get(sentence);

  try {
    const rw = await initializeRewriter();
    if (!rw) {
      console.error('❌ Rewriter is not initialized!');
      rewriteCache.set(sentence, sentence);
      return sentence;
    }

    const rewritten = await rw.rewrite(sentence, {
      context: "Rewrite so it's not toxic, be nicer."
    });

    console.log(`Rewritten: "${sentence}" → "${rewritten}"`);

    if (rewritten.length > sentence.length * 3.5) {
      //console.log('⚠️ Rewritten text too long, retrying with stricter context...');

      const secondTry = await rw.rewrite(sentence, {
        context: "ONLY SAY THE REWRITE NO INTRO OR LEAD-IN REMOVE TOXICNESS"
      });

      //console.log(`Second attempt: "${sentence}" → "${secondTry}"`);

      if (secondTry.length > sentence.length * 3.5) {
        //console.log('❌ Rewrite still too long, replacing with default message.');
        rewriteCache.set(sentence, "REMOVED HARMFUL TEXT");
        return "REMOVED HARMFUL TEXT";
      } else {
        rewriteCache.set(sentence, secondTry);
        return secondTry;
      }
    }

    rewriteCache.set(sentence, rewritten);
    return rewritten;
  } catch (err) {
    console.error("❌ Rewrite failed:", err);
    rewriteCache.set(sentence, sentence);
    return sentence;
  }
}

async function rewriteToxicText(el, sentence, rewrittenSentence) {
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null, false);
  const textNodes = [];
  let fullText = "";

  while (walker.nextNode()) {
    const node = walker.currentNode;
    textNodes.push(node);
    fullText += node.nodeValue;
  }

  const index = fullText.indexOf(sentence);
  if (index === -1) return;

  let currentIndex = 0;
  let remaining = sentence.length;
  let started = false;
  const nodesToRemove = [];

  for (let i = 0; i < textNodes.length && remaining > 0; i++) {
    const node = textNodes[i];
    const nodeText = node.nodeValue;
    const nodeLength = nodeText.length;

    if (currentIndex + nodeLength < index) {
      currentIndex += nodeLength;
      continue;
    }

    const startInNode = Math.max(0, index - currentIndex);
    const endInNode = Math.min(nodeLength, startInNode + remaining);
    const before = nodeText.slice(0, startInNode);
    const after = nodeText.slice(endInNode);

    if (!started) {
      const span = document.createElement('span');
      span.style.color = `rgb(${globalRGB.r}, ${globalRGB.g}, ${globalRGB.b})`;
      span.classList.add('rewritten-toxic-sentence');
      span.textContent = rewrittenSentence;

      const fragment = document.createDocumentFragment();
      if (before) fragment.appendChild(document.createTextNode(before));
      fragment.appendChild(span);
      if (after) fragment.appendChild(document.createTextNode(after));

      node.parentNode.replaceChild(fragment, node);
      started = true;
    } else {
      nodesToRemove.push(node);
    }

    remaining -= (endInNode - startInNode);
    currentIndex += nodeLength;
  }

  for (const node of nodesToRemove) {
    if (node.parentNode) node.parentNode.removeChild(node);
  }
}

async function processElement(el) {
  if (el.querySelector('.rewritten-toxic-sentence')) return;

  const text = el.textContent.trim();
  if (!text) return;

  const sentences = splitIntoSentences(text);
  if (!processedSentencesPerElement.has(el)) {
    processedSentencesPerElement.set(el, new Set());
  }

  const processedSet = processedSentencesPerElement.get(el);
  const newSentences = sentences.filter(s => !processedSet.has(s));

  if (newSentences.length === 0) return;

  const toxicCandidates = newSentences.filter(containsBadWord);
  if (toxicCandidates.length === 0) {
    newSentences.forEach(s => {
      rewriteCache.set(s, s);
      processedSet.add(s);
    });
    return;
  }

  const results = await classifySentencesBatch(toxicCandidates);

  for (let i = 0; i < toxicCandidates.length; i++) {
    const sentence = toxicCandidates[i];
    const result = results[i];

    if (!result || !Array.isArray(result) || result.length === 0) {
      rewriteCache.set(sentence, sentence);
      processedSet.add(sentence);
      continue;
    }

    const top = result[0];
    const label = top.label.toLowerCase();
    const score = top.score;

    const isToxic = (label.includes("toxic") && score > 0.8);

    if (isToxic) {
      const rewritten = await rewriteSentence(sentence);
      if (rewritten && rewritten !== sentence) {
        await rewriteToxicText(el, sentence, rewritten);
        console.log(`Replaced in DOM: "${sentence}" → "${rewritten}"`);
      }
    } else {
      rewriteCache.set(sentence, sentence);
    }

    processedSet.add(sentence);
  }
}

function chunk(array, size) {
  return Array.from({ length: Math.ceil(array.length / size) }, (_, i) =>
    array.slice(i * size, i * size + size)
  );
}

function hasNewUnprocessedSentences() {
  const elements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span');

  for (const el of elements) {
    if (el.querySelector('.rewritten-toxic-sentence')) continue;

    const text = el.textContent.trim();
    if (!text) continue;

    const sentences = splitIntoSentences(text);
    const processed = processedSentencesPerElement.get(el) || new Set();

    for (const s of sentences) {
      if (!processed.has(s)) return true;
    }
  }

  return false;
}

async function runRound() {
  createLightBar();
  isRoundInProgress = true;
  console.log(`🚀 Starting round ${roundNumber}...`);

  const elements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span');
  const groups = chunk([...elements], 10);

  for (const group of groups) {
    await Promise.allSettled(group.map(processElement));
  }

  console.log(`✅ Finished round ${roundNumber}...`);
  setTimeout(() => {
    removeLightBar();
  }, 500);
  roundNumber++;
  isRoundInProgress = false;
}

function createLightBar() {
  if (!document.getElementById('extension-light-bar')) {
    chrome.storage.local.get(['lightBarColor'], (data) => {
      const baseColor = data.lightBarColor || '#008000';
      const rgb = hexToRgb(baseColor);
      globalRGB = rgb;

      const lightBar = document.createElement('div');
      lightBar.id = 'extension-light-bar';
      lightBar.style.position = 'fixed';
      lightBar.style.top = '0';
      lightBar.style.left = '0';
      lightBar.style.width = '100%';
      lightBar.style.height = '50px';
      lightBar.style.zIndex = '9999';
      lightBar.style.pointerEvents = 'none';

      const startColor = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.7)`;
      const endColor = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0)`;

      lightBar.style.background = `linear-gradient(to bottom, ${startColor}, ${endColor})`;

      document.body.appendChild(lightBar);

      const style = document.createElement('style');
      style.innerHTML = `
        #extension-light-bar {
          animation: glow 1.5s infinite ease-in-out;
        }

        @keyframes glow {
          0% {
            background: linear-gradient(to bottom, rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.5), rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0));
          }
          50% {
            background: linear-gradient(to bottom, rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.7), rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0));
          }
          100% {
            background: linear-gradient(to bottom, rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.5), rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0));
          }
        }
      `;
      document.head.appendChild(style);
    });
  }
}

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : { r: 0, g: 255, b: 0 };
}


function removeLightBar() {
  const lightBar = document.getElementById('extension-light-bar');
  if (lightBar) {
    lightBar.remove();
  }
}

chrome.storage.local.get('isTheExtensionOn', (result) => {
    isTheExtensionOn = result.isTheExtensionOn;
    //console.log("Initial state:", isTheExtensionOn ? "Extension is ON" : "Extension is OFF");
});

chrome.storage.onChanged.addListener((changes, area) => {
    if (area === 'local' && changes.isTheExtensionOn) {
        isTheExtensionOn = changes.isTheExtensionOn.newValue;
        if (isTheExtensionOn) {
            //console.log("Extension is ON");
        } else {
            //console.log("Extension is OFF");
        }
    }
});



(async () => {
  if(isTheExtensionOn){
    await runRound();
  }

  setInterval(async () => {
    if (isRoundInProgress) return;

    const foundNew = hasNewUnprocessedSentences();
    if (foundNew && isTheExtensionOn) {
      console.log('New unprocessed content detected. Starting next round...');
      await runRound();
    }
  }, 1000);
})();