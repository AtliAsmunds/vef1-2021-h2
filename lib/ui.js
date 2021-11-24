import { fetchTask, pushTask, deleteTask, modifyTask } from './localstorage.js';

import { empty, el } from './helpers.js';

export function fetchAndRenderPage(container) {
  // Page consists of valstika and task list
  const valstikan = document.querySelector('.valstika');  
  renderValstika(valstikan);
  const verkefnalistinn = document.querySelector('.verkefnalisti');  
  renderTaskList(verkefnalistinn);
}

// document.getElementById('nyttVerkefni').onsubmit = pushTask(task);
// document.getElementById('deleteButton').onclick = deleteTask(task);
function fjoldiKlaradraVerkefna() {

}

function renderValstika(container) {
  const data = JSON.parse(localStorage.getItem('data'));
  // All tasks and completed tasks
  const allTasks = document.querySelector('.Verkefni');
  let fjoldiKlaradra = 0;
  for(const item of data.items) {
    if(item.completed) fjoldiKlaradra++;
  }
  allTasks.innerText = fjoldiKlaradra;
  const completedTasks = document.querySelector('.kláruðVerkefni');
  completedTasks.innerText = data.items.length;
  // Categories
  const categories = document.querySelector('.flokkarListi');
  renderCategoryList(categories);
  // Tags
  const tags = document.querySelector('.tagListi');
}

function renderCategoryList(container) {
  empty(container);
  const data = JSON.parse(localStorage.getItem('data'));
  for(const cat of data.categories) {
    const catEl = el('li', cat.title);
    container.appendChild(catEl);
  }
 }

function renderTaskList(container) {
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
