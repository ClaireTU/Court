# ⚖️ 人民的法槌 — People's Gavel

互動式法槌模擬器 Web App，支援中英雙語，可安裝至手機桌面（PWA）。

## ✨ 功能

- 🔨 有罪宣判（終身監禁）
- 💀 死刑宣判（立即執行）
- 🔇 肅靜 / ⏸ 休庭 / 🚫 與本案無關
- 🕊 無罪釋放
- 🎙 自訂宣判錄音
- 🎲 隨機罪名產生器
- 📜 判決書產生器
- 👨‍⚖️ 法官語錄
- 🌐 中英雙語切換

## 🚀 部署

### GitHub Pages
1. 上傳所有檔案至 GitHub Repository
2. Settings → Pages → Source 選 `main` / `root`
3. 完成！

### 本地測試
```bash
python3 -m http.server 8000
```

## 📁 結構
```
├── index.html       # 主頁面（CSS+JS 內嵌，一個檔案搞定）
├── manifest.json    # PWA 設定
├── sw.js            # Service Worker（離線快取）
├── icons/           # App 圖示
├── .gitignore
└── README.md
```

## 📱 安裝為 App
- **iOS**: Safari → 分享 → 加入主畫面
- **Android**: Chrome → 安裝應用程式

## License
MIT
