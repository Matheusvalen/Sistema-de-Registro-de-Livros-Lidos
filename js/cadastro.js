// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

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
const auth = getAuth(app);  
const db = getFirestore(app);

export { auth, db };

document.getElementById("cadastroForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  if (emailInput && senhaInput) {
    document.getElementById("cadastroForm").addEventListener("submit", async (e) => {
        e.preventDefault();

        const email = emailInput.value;
        const senha = senhaInput.value;

        try {
            await createUserWithEmailAndPassword(auth, email, senha);
            alert("Usuário cadastrado com sucesso!");
            window.location.href = "../index.html";
        } catch (error) {
            alert("Erro no cadastro: " + error.message);
        }
    });
} 
else {
    console.error("Campos de cadastro não encontrados.");
}
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
    const user = userCredential.user;

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