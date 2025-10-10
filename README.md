# Web Purifier
Introducing a way to reduce toxic content on the web. Meet Web Purifier, a chrome extension for replacing toxic content while browsing with neutral, safe text. Private with all processing on-device.

---

## 🌟 Key Features
- **Toxic sentence detection** using an on-device model, specifically [`Xenova/toxic-bert`](https://huggingface.co/Xenova/toxic-bert).
- **Rewrite toxic text** into a more neutral, readable version, using Google Chrome's Built-In on-device AI model [`Rewriter API`](https://developer.chrome.com/docs/ai/rewriter-api).
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

> Only the contents in `build/` should be uploaded

---

## 🛠️ Editing the Extension Code

> ⚠️ **Do not edit files inside the `build/` folder directly.**  
> This folder is automatically generated and will be overwritten every time you run a build.
To make changes to the extension's code:
1. Make sure [Node.js](https://nodejs.org/) is installed on your system.
2. Edit files in the `src/` and `public/` folders.
3. After making your changes, open a terminal in the project root and run:
    ```bash
    npm install    # Only needed once to install dependencies  
    npm run build  # Rebuilds the extension
    ```
4. The updated extension will be output to the `build/` folder.
5. Reload the extension in Chrome:  
   - Go to `chrome://extensions`  
   - Make sure **Developer Mode** is enabled  
   - Click the **Reload** button (⟳ icon) on your extension
> The `build/` folder contains the production-ready extension and is the only folder that should be loaded into Chrome.

---

## 🔒 Privacy
- Complete offline processing, no data sent to external sources.
- No tracking.
- No data collection.

---

## 📄 License
MIT License

---

## 🙌 Acknowledgements
- [Google Chrome Rewriter API](https://developer.chrome.com/docs/ai/rewriter-api)
- [Xenova/toxic-bert model](https://huggingface.co/Xenova/toxic-bert)
- CMU School of Computer Science [bad-words.txt](https://www.cs.cmu.edu/~biglou/resources/bad-words.txt) (Note: I modified the list to include additional words)
- [Google Gemini](https://www.gemini.google.com) for `icon.png`.
