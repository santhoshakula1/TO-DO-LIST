let todoList = JSON.parse(localStorage.getItem('todoList')) || [];

function saveToStorage() {
  localStorage.setItem('todoList', JSON.stringify(todoList));
}

function renderTodoList() {
  let todoListHTML = '';

  todoList.forEach((todoObject, index) => {
    const { name, dueDate } = todoObject;
    const html = `
      <div>${name}</div>
      <div>${dueDate}</div>
      <button class="delete-todo-button js-delete-todo-button">Delete</button>
    `;
    todoListHTML += html;
  });

  document.querySelector('.js-todo-list').innerHTML = todoListHTML;
  const clearButton = document.querySelector('.js-clear-todo-button');
  clearButton.style.display = todoList.length > 0 ? 'inline-block' : 'none';
  document.querySelectorAll('.js-delete-todo-button').forEach((deleteButton, index) => {
    deleteButton.addEventListener('click', () => {
      todoList.splice(index, 1);
      saveToStorage();
      renderTodoList();
    });
  });
}
document.querySelector('.js-add-todo-button').addEventListener('click', () => {
  const nameInput = document.querySelector('.js-name-input').value.trim();
  const dueDateInput = document.querySelector('.js-due-date-input').value;

  if (nameInput === '' || dueDateInput === '') {
    alert('Please enter both todo name and due date.');
    return;
  }

  todoList.push({ name: nameInput, dueDate: dueDateInput });
  saveToStorage();
  renderTodoList();
  document.querySelector('.js-name-input').value = '';
  document.querySelector('.js-due-date-input').value = '';
});
document.querySelector('.js-clear-todo-button').addEventListener('click', () => {
  if (confirm('Are you sure you want to clear all todos?')) {
    todoList = [];
    saveToStorage();
    renderTodoList();
  }
});

renderTodoList();

