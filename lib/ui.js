import { fetchTask, pushTask, deleteTask, modifyTask } from './localstorage.js';

import { empty, el } from './helpers.js';

export function renderCategoryList(container, categories) {
  empty(container);
}

document.getElementById('nyttVerkefni').onsubmit = pushTask(task);
document.getElementById('deleteButton').onclick = deleteTask(task);

function createTaskList() {
  const data = JSON.parse(localStorage.getItem('data'));
  let i = 0;
  
  while (data.items[i]) {
    task = fetchTask(i)
    if (task) {
      const taskElement = el('li');
      taskElement.classList('verkefni', )
    }
  
  }
  const taskListElement = el('ul', taskElement);
 }


function show(part) {
  const listOfTasks = document.querySelector('.taskList');
  const createForm = document.querySelector('.createChange');

  listOfTasks.classList.add('hidden');
  createForm.classList.add('hidden');
   
  switch (part) {
    case 'taskList':
      listOfTasks.classList.remove('hidden');
      break;
    case 'form':
      createForm.classList.remove('hidden');
      break;  
      default:
        console.warn(`${part} óþekkt`);
    }
}
