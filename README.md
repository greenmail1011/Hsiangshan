# 香山國小分組積分系統

AI 足球無人機社團上課用的分組與個人加分工具。網頁放在 GitHub Pages，資料存在 Firebase（Firestore），教室電腦、平板、手機打開同一個網址，看到的是同一份名單和積分。

## 檔案

| 檔案 | 用途 |
|---|---|
| `index.html` | 系統本身 |
| `firebase-config.js` | Firebase 連線設定，**要自己填** |
| `firestore.rules` | Firestore 安全規則（免登入版，目前使用） |
| `firestore-login.rules` | Firestore 安全規則（登入版，之後想改成只有老師能用時換上） |
| `README.md` | 這份說明 |

學生名單的備份檔（`香山國小分組-名單備份.json`）**不要**上傳到 GitHub，第 7 步會用網頁把它匯入 Firebase。

---

## 第 1 步：建立 Firebase 專案

1. 用 Google 帳號打開 <https://console.firebase.google.com/>
2. 按「建立專案」（或「新增專案」），名稱可以取 `xiangshan-groups`
3. Google Analytics 可以關掉，不影響使用
4. 等專案建立完成，按「繼續」

## 第 2 步：建立 Firestore 資料庫

1. 左邊選單：「建構」→「Firestore Database」
2. 按「建立資料庫」
3. 位置選 **asia-east1（台灣）**，選了之後不能改
4. 啟動模式選「以正式版模式啟動」（規則在下一步換掉）
5. 按「建立」

## 第 3 步：貼上安全規則

1. 在 Firestore Database 頁面上方點「規則」分頁
2. 把編輯框裡原本的內容全部刪掉
3. 打開這個資料夾的 `firestore.rules`，整份複製貼上
4. 按「發布」

## 第 4 步：取得網頁設定，填進 `firebase-config.js`

1. 左上角齒輪 →「專案設定」→「一般」分頁
2. 拉到下方「你的應用程式」，按網頁圖示 `</>`
3. 應用程式暱稱隨意（例如「分組系統」），**不用**勾選 Firebase Hosting，按「註冊應用程式」
4. 畫面會出現一段程式碼，裡面有 `const firebaseConfig = { apiKey: "...", ... }`
5. 用記事本（Mac 用「文字編輯」）打開 `firebase-config.js`，把六行「請貼上…」換成那段大括號裡對應的值，例如：

```js
window.FIREBASE_CONFIG = {
  apiKey: "AIzaSy…",
  authDomain: "xiangshan-groups.firebaseapp.com",
  projectId: "xiangshan-groups",
  storageBucket: "xiangshan-groups.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abcdef…"
};
```

6. 存檔

> 這些值不是密碼，放上 GitHub 是正常做法。誰能讀寫資料，是由第 3 步的規則決定。

## 第 5 步：上傳到 GitHub

1. 登入 <https://github.com/>，右上角「+」→「New repository」
2. Repository name 例如 `xiangshan-groups`，選 **Public**（免費帳號的 GitHub Pages 需要公開的 repository），按「Create repository」
3. 在新的 repository 頁面點「uploading an existing file」（或「Add file」→「Upload files」）
4. 把 `index.html`、`firebase-config.js`、`firestore.rules`、`firestore-login.rules`、`README.md` 一起拖進去
5. 下方按「Commit changes」

## 第 6 步：開啟 GitHub Pages

1. repository 上方「Settings」→ 左邊「Pages」
2. 「Build and deployment」的 Source 選「Deploy from a branch」
3. Branch 選 `main`，資料夾選 `/ (root)`，按「Save」
4. 等 1～2 分鐘重新整理，上方會出現網址，格式是
   `https://你的帳號.github.io/xiangshan-groups/`

右上角顯示綠點「已同步到 Firebase」就代表連上了。如果是黃色的「未連上 Firebase」，回去檢查第 4 步貼的設定。

## 第 7 步：把現有名單搬進來

1. 打開第 6 步的網址
2. 切到「名單設定」→「備份」→「匯入備份檔」
3. 選 `香山國小分組-名單備份.json`
4. 按「匯入」，14 位學生、分組、小組長、英文名和積分紀錄就會進到 Firebase

之後可以隨時在同一個地方按「下載備份檔」，存一份到自己電腦。

---

## 第 8 步（選用）：改成只有老師登入才能用

目前是免登入版：**任何拿到網址的人，或在 GitHub 上看到 `firebase-config.js` 的人，都能讀到、也能改動名單和積分。**名單是小朋友的真實姓名，如果之後想收緊，照下面做：

1. Firebase 主控台 →「建構」→「Authentication」→「開始使用」→「登入方式」→ 啟用「Google」→ 儲存
2. 同一頁的「設定」→「授權網域」→「新增網域」，填 `你的帳號.github.io`
3. Firestore Database →「規則」，改貼 `firestore-login.rules` 的內容，按「發布」
   （要讓其他老師也能用，在規則的 `teachers()` 清單加上他們的 Gmail）
4. 在 GitHub 上編輯 `firebase-config.js`：`requireLogin` 改成 `true`，`allowedEmails` 填上同樣的 Gmail 名單，Commit
5. 重新打開網址，會先出現「用 Google 登入」的畫面

## 費用

Firebase 免費方案（Spark）每天有 5 萬次讀取、2 萬次寫入，一個社團上課用不到上限，不需要綁信用卡。

## 常見問題

- **畫面顯示「沒有儲存：Firebase 安全規則擋下了這次寫入」**：第 3 步的規則沒有發布成功，重新貼一次再按「發布」。
- **改了 `firebase-config.js` 但網頁沒變**：GitHub Pages 更新要 1～2 分鐘，之後按重新整理（Windows：Ctrl+F5；Mac：Cmd+Shift+R）。
- **教室網路斷掉**：還是可以繼續加分，網路恢復後會自動補傳。右上角顯示「儲存中…」代表還有資料沒傳上去，先不要關掉網頁。
