// ============================================================
// 香山國小分組積分系統：Firebase 設定
// ------------------------------------------------------------
// Firebase 專案：xiangshan-groups（Firestore 位置 asia-east1 台灣）
// 設定來源：Firebase 主控台 → 專案設定 → 一般 → 你的應用程式「香山國小分組系統」
// 這些值不是密碼，放在 GitHub 上是正常的；
// 資料能不能被讀寫，是由 Firestore 的「規則」決定。
// ============================================================

window.FIREBASE_CONFIG = {
  apiKey: "AIzaSyBHzoQkCYQbynkZ2CcvwqN1vyHvxyDe6F8",
  authDomain: "xiangshan-groups.firebaseapp.com",
  projectId: "xiangshan-groups",
  storageBucket: "xiangshan-groups.firebasestorage.app",
  messagingSenderId: "911951215521",
  appId: "1:911951215521:web:c4b14496f1b7e22128a9e0"
};

// ============================================================
// 登入設定（目前：不用登入，知道網址的人都能使用）
// 之後想改成只有老師能用：
//   requireLogin 改成 true，allowedEmails 填老師的 Gmail，
//   並把 Firestore 規則換成說明文件裡的「登入版」。
// ============================================================

window.APP_OPTIONS = {
  requireLogin: false,
  allowedEmails: ["dronex666666@gmail.com"]
};
