// Importação das funções do Firebase SDK 
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-analytics.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-firestore.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-auth.js";

// Configuração do Firebase
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

// Inicialização do Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);

// Aguarda o DOM carregar antes de manipular elementos
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const emailInput = document.getElementById("email");
  const senhaInput = document.getElementById("senha");

  if (!loginForm || !emailInput || !senhaInput) {
    console.error("Formulário de login ou campos não encontrados.");
    return;
  }

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = emailInput.value;
    const senha = senhaInput.value;

    try {
      await signInWithEmailAndPassword(auth, email, senha);
      alert("Login bem-sucedido!");
      window.location.href = "html/principal.html";
    } catch (error) {
      alert("Erro no login: " + error.message);
    }
  });
});
