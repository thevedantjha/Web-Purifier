import { pipeline } from '@huggingface/transformers';


let modelsPreloaded = false;

class PipelineSingleton {
  static task = 'text-classification';
  static model = 'Xenova/toxic-bert';
  static instance = null;

  static async getInstance(progress_callback = null) {
    if (this.instance) return this.instance;

    console.log("⏳ Loading Hugging Face model...");
    try {
      this.instance = await pipeline(this.task, this.model, {
        progress_callback
      });
      console.log("✅ Hugging Face model loaded");
    } catch (err) {
      console.warn("Failed to load Hugging Face model:", err);
      this.instance = null;
    }

    return this.instance;
  }
}

class RewriterSingleton {
  static instance = null;

  static async getInstance() {
    if (this.instance) return this.instance;

    if (!('Rewriter' in self)) {
      console.warn("❌ Rewriter API not available");
      return null;
    }

    try {
      const availability = await Rewriter.availability();
      if (availability === 'unavailable') {
        console.warn("❌ Rewriter API unavailable");
        return null;
      }

      console.log("⏳ Initializing Rewriter...");
      this.instance = await Rewriter.create({
        sharedContext: "Rewriting toxic, offensive, or obscene text to be clean/harmless.",
        tone: "more-casual",
        format: "plain-text",
        length: "shorter",
        monitor(m) {
          m.addEventListener("downloadprogress", (e) => {
            console.log(`📦 Rewriter download: ${Math.floor((e.loaded / e.total) * 100)}%`);
          });
        }
      });

      console.log("✅ Rewriter initialized");
      return this.instance;
    } catch (err) {
      console.error("❌ Failed to initialize Rewriter:", err);
      return null;
    }
  }
}

async function preloadModels() {
  if (modelsPreloaded) {
    console.log("⚠️ Models already preloaded, skipping.");
    return;
  }

  modelsPreloaded = true;
  console.log("🚀 Preloading models...");
  await PipelineSingleton.getInstance();
  await RewriterSingleton.getInstance();
}

chrome.runtime.onStartup.addListener(() => {
  preloadModels();
});

chrome.runtime.onInstalled.addListener(() => {
  preloadModels();
});

async function classify(text) {
  const model = await PipelineSingleton.getInstance();
  if (!model) return null;
  return await model(text);
}

async function classifyBatch(sentences) {
  const model = await PipelineSingleton.getInstance();
  if (!model) return [];
  return await Promise.all(sentences.map(sentence => model(sentence)));
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'classify') {
    (async () => {
      try {
        const result = await classify(message.text);
        sendResponse(result);
      } catch (err) {
        console.error("❌ classify error:", err);
        sendResponse(null);
      }
    })();
    return true;
  }

  if (message.action === 'classifyBatch') {
    (async () => {
      try {
        const results = await classifyBatch(message.sentences);
        sendResponse(results);
      } catch (err) {
        console.error("❌ classifyBatch error:", err);
        sendResponse([]);
      }
    })();
    return true;
  }

  if (message.action === 'rewrite') {
    (async () => {
      const rw = await RewriterSingleton.getInstance();
      if (!rw) {
        sendResponse("❌ Rewriter unavailable.");
        return;
      }

      try {
        const rewritten = await rw.rewrite(message.text, {
          context: "Rewrite this to make it not toxic, offensive, or obscene."
        });
        sendResponse(rewritten);
      } catch (err) {
        console.error("❌ Rewrite failed:", err);
        sendResponse("❌ Failed to rewrite.");
      }
    })();
    return true;
  }
});
