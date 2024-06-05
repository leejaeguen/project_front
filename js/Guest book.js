const host = "http://54.147.247.233:8080";
const todosContainer = document.querySelector('.todos-container');

function getTodos() {
    axios.get(`${host}/todo`)
        .then(response => {
            console.log(response.data);
            renderTodos(response.data.todos);
        })
        .catch(error => {
            console.error('Error fetching todos:', error);
        });
}

function renderTodos(todos) {
    todosContainer.innerHTML = '';
    todos.forEach(todo => {
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo-item');
        todoDiv.textContent = `${todo.name}: ${todo.content}`;
        todoDiv.setAttribute('data-id', todo.id);

        todoDiv.innerHTML = `
            <div style="text-align: left;">
                <span class="timestamp">${new Date(todo.timestamp).toLocaleString()}</span>
            </div>
            <div>
                <span>${todo.name}: ${todo.content}</span>
            </div>
            <button class="delete-btn">x</button>
        `;
        todoDiv.setAttribute('data-id', todo.id);

        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete-btn');
        deleteBtn.textContent = 'x';
        deleteBtn.addEventListener('click', () => deleteTodo(todo.id));

        todoDiv.appendChild(deleteBtn);
        todosContainer.appendChild(todoDiv);
    });
}

window.addEventListener('DOMContentLoaded', function () {
    getTodos();
});

function sendTodo() {
    const nameInput = document.getElementById('nameInput');
    const contentInput = document.getElementById('contentInput');

    const name = nameInput.value.trim();
    const content = contentInput.value.trim();

    if (name === '' || content === '') return;

    const todoData = {
        id: 0,
        name: name,
        content: content,
        timestamp: new Date().toISOString() 
    };

    axios.post(`${host}/todo`, todoData)
        .then(response => {
            nameInput.value = '';
            contentInput.value = '';
            getTodos();
        })
        .catch(error => {
            console.error('Error adding todo:', error);
        });
}

function deleteTodo(todoId) {
    axios.delete(`${host}/todo/${todoId}`)
        .then(response => {
            console.log('Todo deleted:', response.data);
            getTodos();
        })
        .catch(error => {
            console.error('Error deleting todo:', error);
        });
}
