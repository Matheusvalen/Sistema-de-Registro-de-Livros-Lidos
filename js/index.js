// -------------------------------
// Importações do Firebase SDK
// -------------------------------

// Importa o núcleo do Firebase (obrigatório)
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";

// Importa o serviço de analytics (opcional, para estatísticas)
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-analytics.js";

// Importa o Firestore (banco de dados em nuvem)
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-firestore.js";

// Importa o serviço de autenticação + função para login com email e senha
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-auth.js";


// -------------------------------
// Configuração do Firebase do projeto
// -------------------------------

const firebaseConfig = {
  apiKey: "AIzaSyBWmEK49QfFHfOXZwzhumYtK6j70le0Tv0",                  // Chave da API
  authDomain: "registro-de-livros-lidos.firebaseapp.com",            // Domínio de autenticação
  databaseURL: "https://registro-de-livros-lidos-default-rtdb.firebaseio.com/", // URL do banco de dados Realtime Database (se necessário)
  projectId: "registro-de-livros-lidos",                             // ID do projeto
  storageBucket: "registro-de-livros-lidos.firebasestorage.app",    // Local de armazenamento de arquivos
  messagingSenderId: "700699221747",                                 // ID do remetente (notificações)
  appId: "1:700699221747:web:d8851eaa3e52348537a186",                // ID da aplicação
  measurementId: "G-MZS07SJ92M"                                      // ID para o Google Analytics
};


// -------------------------------
// Inicialização do Firebase
// -------------------------------

const app = initializeApp(firebaseConfig);     // Inicializa o Firebase com a configuração acima
const analytics = getAnalytics(app);           // Inicializa o Google Analytics (opcional)
const db = getFirestore(app);                  // Inicializa o Firestore
const auth = getAuth(app);                     // Inicializa o sistema de autenticação


// -------------------------------
// Manipulação do DOM após carregamento
// -------------------------------

document.addEventListener("DOMContentLoaded", () => {
  // Referência ao formulário de login e campos de entrada
  const loginForm = document.getElementById("loginForm");
  const emailInput = document.getElementById("email");
  const senhaInput = document.getElementById("senha");

  // Verifica se os elementos existem no DOM
  if (!loginForm || !emailInput || !senhaInput) {
    console.error("Formulário de login ou campos não encontrados.");
    return; // Encerra a execução se algo estiver faltando
  }

  // Adiciona evento de envio ao formulário
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault(); // Impede que a página recarregue

    // Obtém os valores inseridos
    const email = emailInput.value;
    const senha = senhaInput.value;

    try {
      // Tenta autenticar o usuário com Firebase Auth
      await signInWithEmailAndPassword(auth, email, senha);

      // Se funcionar, mostra um alerta e redireciona para a página principal
      alert("Login bem-sucedido!");
      window.location.href = "html/principal.html";
    } catch (error) {
      // Em caso de erro (ex: usuário ou senha inválidos)
      alert("Erro no login: " + error.message);
    }
  });
});
