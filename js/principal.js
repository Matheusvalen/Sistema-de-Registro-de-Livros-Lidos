// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-analytics.js";
import { getFirestore, collection, addDoc, getDocs, getDoc, setDoc, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-firestore.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-auth.js";


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
const auth = getAuth(app);
const db = getFirestore(app);

const livroForm = document.getElementById('livroForm');
const tabelaLivros = document.getElementById('tabelaLivros');

// Verifica se o usuário está logado antes de entrar
onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "../index.html";
  }
});

// Função para carregar livros do Firestore
async function carregarLivros() {
    const querySnapshot = await getDocs(collection(db, "livros"));
    tabelaLivros.innerHTML = '';

    querySnapshot.forEach((docSnapshot) => {
        const livro = docSnapshot.data();
        const id = docSnapshot.id;

        const row = `
            <tr>
                <td><em>${livro.titulo}</em></td>
                <td>${livro.autor}</td>
                <td>${'★'.repeat(livro.avaliacao)}${'☆'.repeat(5 - livro.avaliacao)}</td>
                <td>${livro.status}</td>
                <td>${livro.resenha}</td>
                <td>
                    <a href="#" onclick="editarLivro('${id}')">Editar</a> |
                    <a href="#" onclick="excluirLivro('${id}')">Excluir</a>
                </td>
            </tr>
        `;
        tabelaLivros.innerHTML += row;
    });
}

let livroEditandoId = null;

livroForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const titulo = document.getElementById('titulo').value;
  const autor = document.getElementById('autor').value;
  const resenha = document.getElementById('resenha').value;
  const status = document.getElementById('status').value;
  const avaliacao = parseInt(document.getElementById('avaliacao').value);

  const livro = { titulo, autor, resenha, status, avaliacao };

  if (livroEditandoId) {
    const livroRef = doc(db, "livros", livroEditandoId);
    await setDoc(livroRef, livro);
    livroEditandoId = null; // Limpa modo de edição
  } else {
    await addDoc(collection(db, "livros"), livro);
  }

  livroForm.reset();
  carregarLivros();
});

document.getElementById('btnFiltrar').addEventListener('click', async () => {
  const filtroTitulo = document.getElementById('filtroTitulo').value.toLowerCase().trim();

  const querySnapshot = await getDocs(collection(db, "livros"));
  tabelaLivros.innerHTML = '';

  querySnapshot.forEach((docSnapshot) => {
    const livro = docSnapshot.data();
    const id = docSnapshot.id;

    // Verifica se o título inclui o texto digitado (ignorando maiúsculas/minúsculas)
    if (livro.titulo.toLowerCase().includes(filtroTitulo)) {
      const row = `
        <tr>
            <td><em>${livro.titulo}</em></td>
            <td>${livro.autor}</td>
            <td>${'★'.repeat(livro.avaliacao)}${'☆'.repeat(5 - livro.avaliacao)}</td>
            <td>${livro.status}</td>
            <td>${livro.resenha}</td>
            <td>
                <a href="#" onclick="editarLivro('${id}')">Editar</a> |
                <a href="#" onclick="excluirLivro('${id}')">Excluir</a>
            </td>
        </tr>
      `;
      tabelaLivros.innerHTML += row;
    }
  });
});

document.getElementById('btnLimpar').addEventListener('click', () => {
  document.getElementById('filtroTitulo').value = '';
  carregarLivros(); // Recarrega todos os livros
})

// Função para excluir livro
window.excluirLivro = async function(id) {
    await deleteDoc(doc(db, "livros", id));
    carregarLivros(); // Recarrega a lista após excluir
};

window.editarLivro = async function(id) {
  const livroDoc = doc(db, "livros", id);
  const livroSnapshot = await getDoc(livroDoc);

  if (!livroSnapshot.exists()) {
    alert("Livro não encontrado!");
    return;
  }

  const livro = livroSnapshot.data();

  document.getElementById('titulo').value = livro.titulo;
  document.getElementById('autor').value = livro.autor;
  document.getElementById('resenha').value = livro.resenha;
  document.getElementById('status').value = livro.status;
  document.getElementById('avaliacao').value = livro.avaliacao;

  livroEditandoId = id; // Define que estamos editando
};

// Chama a função inicialmente para carregar livros
carregarLivros();
window.sair = function() {
    if(confirm('Tem certeza que deseja sair do sistema?')) {
        auth.signOut().then(() => {
            window.location.href = '../index.html';
        }).catch((error) => {
            console.error('Erro ao sair:', error);
        });
    }
};