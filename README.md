# Web Purify
Introducing a way to reduce toxic content on the web. Meet Web Purifier, a chrome extension for replacing toxic content while browsing with neutral, safe text. Private with all processing on-device.

---

## 🌟 Key Features
- **Toxic sentence detection** using an on-device model, specifically [`Xenova/toxic-bert`](https://huggingface.co/Xenova/toxic-bert).
- **Rewrite toxic text** into a more neutral, readable version.
- **Customizable styles** for rewritten text: "As-is", "More formal", and "More casual".
- **Live scanning** for content loaded after page load.
- **Accessibility options** to customize the color of rewritten text for better visibility.

---

## ⚠️ Prerequisites
1. **Browser**
    - Google Chrome version 140 or later
    - APIs on browser
        1. Go to `chrome://flags/#rewriter-api-for-gemini-nano` and select `Enable`.
        2. Relaunch Chrome.
2. **System Requirements**
    - Windows 10/11, MacOS 13+, Linux, or ChromeOS 16389.0.0 and above.
    - At least 22 GB free space on disk with Chrome profile.
    - More than 4 GB of VRAM.

---

## ✅ Installation
1. Clone or download this repository.
2. Navigate to the `build/` folder — this contains the production-ready extension.
3. Go to `chrome://extensions` in Chrome.
4. Enable **Developer Mode** (top-right toggle).
5. Click **Load unpacked**
6. Select the `build/` folder.

> Only the contents of `build/` should be uploaded

---

## 🔒 Privacy
- Complete offline processing, no data sent to external sources.
- No tracking.
- No data collection.

---

## 📋 License
MIT License

---

## 🙌 Acknowledgements
- [Google Chrome Rewriter API](https://developer.chrome.com/docs/ai/rewriter-api)
- [Xenova/toxic-bert model](https://huggingface.co/Xenova/toxic-bert)
- [CMU School of Computer Science bad-words.js](https://www.cs.cmu.edu/~biglou/resources/bad-words.txt) (Note: I modified the list to include additional words)
