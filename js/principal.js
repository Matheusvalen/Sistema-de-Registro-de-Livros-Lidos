// Configuração Firebase (sem imports!)
const firebaseConfig = {
  apiKey: "AIzaSyBVmEk49QfHFfK0WZhzuhmYK6j70le0Tv0",
  authDomain: "registro-de-livros-lidos.firebaseapp.com",
  databaseURL: "https://registro-de-livros-lidos-default-rtdb.firebaseio.com",
  projectId: "registro-de-livros-lidos",
  storageBucket: "registro-de-livros-lidos.appspot.com",
  messagingSenderId: "706099221747",
  appId: "1:706099221747:web:d8851eaa3e5234b537a186"
};

// Inicializa o Firebase
const app = firebase.initializeApp(firebaseConfig);
const database = firebase.database();

const livroForm = document.getElementById('livroForm');
const tabelaLivros = document.getElementById('tabelaLivros');

livroForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const titulo = document.getElementById('titulo').value;
    const autor = document.getElementById('autor').value;
    const resenha = document.getElementById('resenha').value;
    const status = document.getElementById('status').value;
    const avaliacao = document.getElementById('avaliacao').value;

    const novoLivro = {
        titulo,
        autor,
        resenha,
        status,
        avaliacao
    };

    const livroId = app.database().ref().child('livros').push().key;
    app.database().ref('livro/' + livroId).set(novoLivro);

    livroForm.reset();
});

app.database().ref('livros').on('value', (snapshot) =>{
    const livros = snapshot.val();
    tabelaLivros.innerHTML = '';
    for (let id in livros){
        const livro = livros[id];
        const row = `
        <tr>
            <td><em>${livro.titulo}</em></td>
            <td>${livro.autor}</td>
            <td>${'★'.repeat(livro.avaliacao)}${'☆'.repeat(5 - livro.avaliacao)}</td>
            <td>${livro.status}</td>
            <td>${livro.resenha}</td>a
            <td>
                <a href="#" onclick="editarLivro('${id}')">Editar</a> |
                <a href="#" onclick="excluirLivro('${id}')">Excluir</>
            </td>
        </tr>`;
        tabelaLivros.innerHTML += row;
    }
});

function excluirLivro(id){
    firebaseConfig.database().ref('livros/' + id).remove();
}