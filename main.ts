import { initState, getState, setFilter, setSearchQuery } from './state.js';
import { render } from './render.js';
import { createTodo, applyFilter, applySearch, toggleAll, clearCompleted } from './actions.js';

// DOM refs
const todoForm = document.getElementById('todoForm') as HTMLFormElement;
const titleInput = document.getElementById('todoTitle') as HTMLInputElement;
const descInput = document.getElementById('todoDescription') as HTMLTextAreaElement;
const prioritySelect = document.getElementById('todoPriority') as HTMLSelectElement;
const categoryInput = document.getElementById('todoCategory') as HTMLInputElement;
const dueDateInput = document.getElementById('todoDueDate') as HTMLInputElement;
const filterGroup = document.getElementById('filterGroup') as HTMLDivElement;
const searchInput = document.getElementById('searchInput') as HTMLInputElement;
const toggleAllBtn = document.getElementById('toggleAllBtn') as HTMLButtonElement;
const clearCompletedBtn = document.getElementById('clearCompletedBtn') as HTMLButtonElement;

// Initialize state from localStorage
initState();
render();

// Add todo form
todoForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = titleInput.value.trim();
  if (!title) {
    titleInput.focus();
    return;
  }
  createTodo({
    title,
    description: descInput.value.trim() || null,
    priority: prioritySelect.value as any,
    category: categoryInput.value.trim() || null,
    dueDate: dueDateInput.value || null,
  });
  todoForm.reset();
  titleInput.focus();
});

// Filter buttons
filterGroup.addEventListener('click', (e) => {
  const btn = (e.target as HTMLElement).closest('.btn-filter') as HTMLButtonElement | null;
  if (!btn) return;
  filterGroup.querySelectorAll('.btn-filter').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  applyFilter(btn.dataset.filter as any);
});

// Search
searchInput.addEventListener('input', (e) => {
  applySearch((e.target as HTMLInputElement).value);
});

// Toggle all
toggleAllBtn.addEventListener('click', toggleAll);

// Clear completed
clearCompletedBtn.addEventListener('click', clearCompleted);

// Optional: re-render on state changes (already called in actions)