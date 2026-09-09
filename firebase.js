// استدعاء مكتبات فايربيس عبر الـ CDN للعمل المباشر في المتصفح
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, doc, setDoc, getDoc, updateDoc, deleteDoc, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAkxLhBsjo9RYEJUGbSa7HsAH1BX1J0myA",
  authDomain: "smartexamsystem-54acc.firebaseapp.com",
  projectId: "smartexamsystem-54acc",
  storageBucket: "smartexamsystem-54acc.firebasestorage.app",
  messagingSenderId: "731167992880",
  appId: "1:731167992880:web:6db1a33efb1dd467f151f5"
};

// تهيئة فايربيس وقاعدة البيانات Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// تصدير الأدوات عشان نستخدمها في باقي صفحات المشروع (Admin, Student, Exam)
export { db, doc, setDoc, getDoc, updateDoc, deleteDoc, collection, getDocs };