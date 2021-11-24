import { fetchTask, pushTask, deleteTask, modifyTask } from './localstorage.js';

import { empty } from './helpers.js';

export function renderCategoryList(container, categories) {
  empty(container);
}

document.getElementById('nyttVerkefni').onsubmit = pushTask(task)
document.getElementById('deleteButton').onclick = deleteTask(task)

function show(part) {
  const listOfTasks = document.querySelector('.taskList');
  const createForm = document.querySelector('.createChange');

  listOfTasks.classList.add('hidden');
  createForm.classList.add('hidden');
  
}