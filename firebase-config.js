// ============================================================
// 香山國小分組積分系統：Firebase 設定
// ------------------------------------------------------------
// 1. 到 Firebase 主控台 → 專案設定 → 一般 → 你的應用程式（網頁 </>）
// 2. 找到「SDK 設定和配置」裡的 firebaseConfig，
//    把大括號裡的內容整段貼進下面，取代 "請貼上…" 那幾行。
// 這些值不是密碼，放在 GitHub 上是正常的；
// 資料能不能被讀寫，是由 Firestore 的「規則」決定。
// ============================================================

window.FIREBASE_CONFIG = {
  apiKey: "請貼上 apiKey",
  authDomain: "請貼上 authDomain",
  projectId: "請貼上 projectId",
  storageBucket: "請貼上 storageBucket",
  messagingSenderId: "請貼上 messagingSenderId",
  appId: "請貼上 appId"
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
