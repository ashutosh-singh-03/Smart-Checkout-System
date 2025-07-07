// Frontend Configuration EXAMPLE
// Copy this file to config.js and fill in your actual Firebase values

const CONFIG = {
  FIREBASE: {
    API_KEY: "your-firebase-api-key-here",
    AUTH_DOMAIN: "your-project.firebaseapp.com",
    PROJECT_ID: "your-project-id",
    STORAGE_BUCKET: "your-project.firebasestorage.app",
    MESSAGING_SENDER_ID: "your-messaging-sender-id",
    APP_ID_LANDING: "your-app-id-for-landing-page",
    APP_ID_MAIN: "your-app-id-for-main-pages",
    MEASUREMENT_ID_LANDING: "your-measurement-id-for-landing",
    MEASUREMENT_ID_MAIN: "your-measurement-id-for-main"
  }
};

// Firebase configuration helpers
function getFirebaseConfig() {
  return {
    apiKey: CONFIG.FIREBASE.API_KEY,
    authDomain: CONFIG.FIREBASE.AUTH_DOMAIN,
    projectId: CONFIG.FIREBASE.PROJECT_ID,
    storageBucket: CONFIG.FIREBASE.STORAGE_BUCKET,
    messagingSenderId: CONFIG.FIREBASE.MESSAGING_SENDER_ID,
    appId: CONFIG.FIREBASE.APP_ID_MAIN,
    measurementId: CONFIG.FIREBASE.MEASUREMENT_ID_MAIN
  };
}

function getFirebaseConfigForLanding() {
  return {
    apiKey: CONFIG.FIREBASE.API_KEY,
    authDomain: CONFIG.FIREBASE.AUTH_DOMAIN,
    projectId: CONFIG.FIREBASE.PROJECT_ID,
    storageBucket: CONFIG.FIREBASE.STORAGE_BUCKET,
    messagingSenderId: CONFIG.FIREBASE.MESSAGING_SENDER_ID,
    appId: CONFIG.FIREBASE.APP_ID_LANDING,
    measurementId: CONFIG.FIREBASE.MEASUREMENT_ID_LANDING
  };
}
