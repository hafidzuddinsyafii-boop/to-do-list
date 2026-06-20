const todoForm = document.querySelector('form');
const todoInput = document.getElementById('todo-input');
const todoListUl = document.getElementById('todo-list');

let allTodos = getTodos();
updateTodoList();

todoForm.addEventListener('submit', function(e){
    e.preventDefault();
    addTodo();
})

function addTodo(){
    const todoText = todoInput.value;
    if(todoText.length > 0){
        const todoObject = {
            text: todoText,
            completed: false
        }
        allTodos.push(todoObject);
        updateTodoList();
        saveTodos();
        todoInput.value = '';
    }
}
function updateTodoList(){
    todoListUl.innerHTML = '';
    allTodos.forEach((todo, todoIndex) =>{
        todoItem = createTodoItem(todo, todoIndex);
        todoListUl.append(todoItem);
    })
}
function createTodoItem(todo, todoIndex){
    const todoId = 'todo-' + todoIndex;
    const todoLi = document.createElement('li');
    const todoText = todo.text;
    todoLi.className = 'todo';
    todoLi.innerHTML = `
        <input type="checkbox" id="${todoId}">
        <label class="custom-checkbox" for="${todoId}">
            <svg fill="transparent" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg>
        </label>
        <label for="${todoId}" class="todo-text">
            ${todoText}
        </label>
        <button type="button" class="delete-button">
            <svg fill="var(--secondary-color)" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"><path d="M294.73-148.08q-28.26 0-48.26-20-20.01-20.01-20.01-48.27v-501.23h-39.19v-55.89h174.35v-33.84h237.57v33.77h174.35v55.96h-39.2v501.32q0 28.35-19.91 48.27-19.92 19.91-48.35 19.91H294.73Zm383.65-569.5H282.42v501.23q0 5.39 3.46 8.85 3.47 3.46 8.85 3.46h371.35q4.61 0 8.46-3.84 3.84-3.85 3.84-8.47v-501.23ZM380.19-282.92h55.96v-355.96h-55.96v355。96Zm144。46 0h55。96v-355。96h-55。96v355。96ZM282。42-717。58V-204。04v-513。54Z"/></svg>
        </button>`

    const deleteButton = todoLi.querySelector('.delete-button');
    deleteButton.addEventListener('click', () => {
        deleteTodoItem(todoIndex);
    })
    const checkbox = todoLi.querySelector('input');
    checkbox.addEventListener('change', () => {
        allTodos[todoIndex].completed = checkbox.checked;
        saveTodos();
    })
    checkbox.checked = todo.completed;
    return todoLi;
}
function deleteTodoItem(todoIndex){
    allTodos = allTodos.filter((_, i) => i !== todoIndex);
    saveTodos();
    updateTodoList();
}
function saveTodos(){
    const todosJson = JSON.stringify(allTodos);
    localStorage.setItem('todos', todosJson);
}
function getTodos(){
    const todos = localStorage.getItem('todos') || '[]';
    return JSON.parse(todos);
}