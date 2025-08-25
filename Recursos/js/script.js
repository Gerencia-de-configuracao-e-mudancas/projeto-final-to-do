const input = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const list = document.getElementById('todo-list');

const load = () => JSON.parse(localStorage.getItem('todos') || '[]');
const save = (todos) => localStorage.setItem('todos', JSON.stringify(todos));

const render = () => {
    const todos = load();
    if (!list) return;
    list.innerHTML = '';
    todos.forEach((t, i) => {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        li.textContent = t;

        const del = document.createElement('button');
        del.className = 'btn btn-sm btn-outline-danger';
        del.textContent = 'remover';
        del.onclick = () => {
            todos.splice(i, 1);
            save(todos);
            render();
        };

        li.appendChild(del);
        list.appendChild(li);
    });
};

addBtn?.addEventListener('click', () => {
    const v = input.value.trim();
    if (!v) return;
    const todos = load();
    todos.push(v);
    save(todos);
    input.value = '';
    render();
});

input?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') addBtn.click();
});

render();


// --- Função de login ---
function login(email, senha) {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.email === email && user.senha === senha) {
        localStorage.setItem("logado", "true"); // marca como logado
        window.location.href = "index.html"; // redireciona
    } else {
        alert("E-mail ou senha incorretos!");
    }
}

// --- Função de logout (opcional) ---
function logout() {
    localStorage.removeItem("logado");
    window.location.href = "login.html";
}
