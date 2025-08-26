// Load existing todos from localStorage or start with empty array
let todoList = JSON.parse(localStorage.getItem('todoList')) || [];

// Save todos to localStorage
function saveToStorage() {
  localStorage.setItem('todoList', JSON.stringify(todoList));
}

// Render the todo list
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

  // Show/hide Clear button dynamically
  const clearButton = document.querySelector('.js-clear-todo-button');
  clearButton.style.display = todoList.length > 0 ? 'inline-block' : 'none';

  // Add delete button functionality
  document.querySelectorAll('.js-delete-todo-button').forEach((deleteButton, index) => {
    deleteButton.addEventListener('click', () => {
      todoList.splice(index, 1);
      saveToStorage();
      renderTodoList();
    });
  });
}

// Add new todo
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

  // Clear input fields
  document.querySelector('.js-name-input').value = '';
  document.querySelector('.js-due-date-input').value = '';
});

// Clear all todos
document.querySelector('.js-clear-todo-button').addEventListener('click', () => {
  if (confirm('Are you sure you want to clear all todos?')) {
    todoList = [];
    saveToStorage();
    renderTodoList();
  }
});

// Initial render
renderTodoList();
