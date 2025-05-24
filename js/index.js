// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-analytics.js";
import { getFirestore, collection, addDoc, getDocs, getDoc, setDoc, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-firestore.js";
import { auth } from "../firebase/firebase.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBWmEK49QfFHfOXZwzhumYtK6j70le0Tv0",
    authDomain: "registro-de-livros-lidos.firebaseapp.com",
    databaseURL: "https://registro-de-livros-lidos-default-rtdb.firebaseio.com/",  
    projectId: "registro-de-livros-lidos",
    storageBucket: "registro-de-livros-lidos.firebasestorage.app",
    messagingSenderId: "700699221747",
    appId: "1:700699221747:web:d8851eaa3e52348537a186",
    measurementId: "G-MZS07SJ92M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  try {
    await signInWithEmailAndPassword(auth, email, senha);
    alert("Login bem-sucedido!");
    window.location.href = "html/principal.html";
  } catch (error) {
    alert("Erro no login: " + error.message);
  }
});
