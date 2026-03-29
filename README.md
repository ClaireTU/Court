# ⚖️ Judge's Gavel 法槌 APP

> A mobile-friendly judge's gavel web app with sound effects, voice recording, and multiple court functions.

---

## 📱 功能 Features

| 按鈕 | 功能 |
|------|------|
| 🔨 點擊法槌 | 敲槌音效 + 揮動動畫 |
| 🔨 有罪 / Guilty | 顯示「有罪・終身監禁不得假釋」/ 英文版完整宣判詞 |
| 🎙 錄音設定 | 錄製自己的聲音取代系統音效 |
| 🔇 肅靜 / Silence | 連敲三聲 + 全螢幕肅靜提示 |
| ⏸ 休庭 / Recess | 全螢幕休庭公告 |
| 🚫 與本案無關 / Irrelevant | 全螢幕提示 |
| 🕊 當庭無罪釋放 / Not Guilty | 全螢幕無罪公告 |
| 🌐 語言切換 | 開啟時選擇中文／英文，可隨時切換 |

---

## 🚀 安裝到 GitHub Pages（免費托管）

### 第一步：建立 GitHub 帳號
1. 前往 [https://github.com](https://github.com)
2. 點右上角 **Sign up** 建立免費帳號

### 第二步：建立新 Repository
1. 登入後，點右上角 **+** → **New repository**
2. Repository name 填入：`gavel-app`
3. 選 **Public**（公開，才能用 GitHub Pages）
4. 勾選 **Add a README file**
5. 點 **Create repository**

### 第三步：上傳檔案
1. 在你的 repository 頁面，點 **Add file** → **Upload files**
2. 把以下三個檔案全部拖進去：
   - `index.html`
   - `style.css`
   - `app.js`
3. 滾到底部，點 **Commit changes**

### 第四步：開啟 GitHub Pages
1. 點上方 **Settings** 標籤
2. 左側選單找 **Pages**
3. 在 **Source** 區域，Branch 選 **main**，資料夾選 **/ (root)**
4. 點 **Save**
5. 等約 1～2 分鐘，畫面上會出現：
   > Your site is published at `https://你的帳號名.github.io/gavel-app/`

### 第五步：加入手機主畫面
**iOS (iPhone/iPad)**
1. 用 **Safari** 開啟上面的網址
2. 點下方分享按鈕 📤
3. 選 **「加入主畫面」**
4. 名稱改成「法槌」，點 **新增**
5. 主畫面就會出現圖示，像 APP 一樣使用！

**Android**
1. 用 **Chrome** 開啟網址
2. 點右上角三個點 ⋮
3. 選 **「新增至主畫面」**
4. 點 **新增**

---

## 🎙 自訂錄音使用方式
1. 打開 APP，點 **🎙 錄音設定**
2. 點 **開始錄音**，說出你想要的宣判詞
3. 點 **停止錄音**
4. 點 **試聽** 確認效果
5. 勾選 **使用自訂錄音**
6. 之後按「有罪」按鈕，就會播放你的聲音！

> ⚠️ 注意：錄音只存在當次開啟的瀏覽器中，關閉頁面後需重新錄製。

---

## 📁 檔案結構

```
gavel-app/
├── index.html   ← 主要頁面
├── style.css    ← 樣式設計
├── app.js       ← 所有邏輯功能
└── README.md    ← 說明文件
```

---

## 🛠 技術規格

- **純前端**：HTML + CSS + JavaScript，不需後端
- **音效**：Web Audio API 合成法槌撞擊音
- **錄音**：MediaRecorder API
- **手機優化**：PWA ready，支援加入主畫面
- **瀏覽器支援**：iOS Safari 14+、Chrome 88+、Firefox 85+

---

Made with ⚖️
