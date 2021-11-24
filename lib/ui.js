import { fetchTask, pushTask, deleteTask, modifyTask } from './localstorage.js';

import { empty, el } from './helpers.js';

export function renderCategoryList(container, categories) {
  empty(container);
}

document.getElementById('nyttVerkefni').onsubmit = pushTask(task);
document.getElementById('deleteButton').onclick = deleteTask(task);

function createTaskList() {
  const taskListElement = el('ul', taskElement);

  const data = JSON.parse(localStorage.getItem('data'));
  let i = 0;
  
  while (data.items[i]) {
    const task = fetchTask(i)
    if (task) {
      taskDisplay(taskListElement, task)
    }
  
  }
    
 }

function taskDisplay (container, task) {

  const checkbox = el('input');
  checkbox.type = 'checkbox';

  const infoContainer = el('div');
  infoContainer.classList('verkefnisinfo');

  const titleElement = el('div');
  titleElement.classList('verkefnistitill');
  titleElement.textContent(task.title)

  const descriptionElement = el('div');
  descriptionElement.classList('verkefnislysing');
  descriptionElement.textContent(task.description);

  const categoryElement = el('div');
  categoryElement.classList('verkefnisflokkun');
  categoryElement.textContent(task.category);

  const dateElement = el('div');

  const tagsElement = el('div');
  tagsElement.classList('taggar');

  infoContainer.append(titleElement, descriptionElement, categoryElement, dateElement,
    tagsElement);
  
  const taskElement = el('li', infoContainer);
  taskElement.classList('verkefni');
  taskElement.appendChild(checkbox);

  container.appendChild(taskElement)
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
