// Importação do Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

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
const auth = getAuth(app);
const db = getFirestore(app);

// Aguarda o DOM estar carregado
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("cadastroForm");
  const emailInput = document.getElementById("emailCadastro");
  const senhaInput = document.getElementById("senhaCadastro");

  if (!form || !emailInput || !senhaInput) {
    console.error("Elementos do formulário não encontrados.");
    return;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = emailInput.value;
    const senha = senhaInput.value;

    try {
      // Cria usuário no Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
      const user = userCredential.user;

      // Salva dados no Firestore
      await setDoc(doc(db, "usuarios", user.uid), {
        email: user.email,
        criadoEm: new Date()
      });

      alert("Cadastro feito com sucesso!");
      window.location.href = "../html/principal.html";

    } catch (error) {
      alert("Erro ao cadastrar: " + error.message);
    }
  });
});
