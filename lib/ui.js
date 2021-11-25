import { fetchTask, pushTask, deleteTask, modifyTask } from './localstorage.js';

import { empty, el, compare } from './helpers.js';

export function fetchAndRenderPage(container) {
  const baetaVid = document.querySelector('.baetavidverkefni');
<<<<<<< HEAD
  baetaVid.addEventListener('click',baetaVidVerkefni);
  populateForm(1); // Test
=======
  baetaVid.addEventListener('click', baetaVidVerkefni);
>>>>>>> 2512dd3f1bab73a8a24af5b9220d49efe59ebe2a
  // Page consists of valstika and task list
  const valstikan = document.querySelector('.valstika');
  renderValstika(valstikan);
  const verkefnalistinn = document.querySelector('.verkefnalisti');
  renderTaskList(verkefnalistinn, 'due');
}

// document.getElementById('nyttVerkefni').onsubmit = pushTask(task);
// document.getElementById('deleteButton').onclick = deleteTask(task);

function renderValstika(container) {
  console.log('renderValstika');
  const data = JSON.parse(localStorage.getItem('data'));
  // All tasks and completed tasks
  const allTasks = document.querySelector('.Verkefni');
  let fjoldiKlaradra = 0;
  for (const item of data.items) {
    if (item.completed) fjoldiKlaradra++;
  }
  const completedTasks = document.querySelector('.kláruðVerkefni');
  completedTasks.innerText = fjoldiKlaradra;
  allTasks.innerText = data.items.length;
  // Categories
  const categories = document.querySelector('.flokkarListi');
  renderCategoryList(categories);
  // Tags
  const tags = document.querySelector('.tagListi');
  renderTagList(tags);
}

function renderCategoryList(container) {
  empty(container);
  const data = JSON.parse(localStorage.getItem('data'));
  const keys = Object.keys(data.taskPerCat);
  for (const cat of keys) {
    console.log(cat);
    const catLI = el('li');
    container.appendChild(catLI);
    let nafn = cat;
    nafn = nafn[0].toUpperCase() + nafn.substring(1);
    catLI.appendChild(el('div', nafn));
    let fjoldi = data.taskPerCat[cat].toString();
    const catFjoldi = el('div', fjoldi);
    catFjoldi.classList.add('valfjoldi');
    catLI.appendChild(el('div', catFjoldi));
  }
}

function renderTagList(container) {
  empty(container);
  const data = JSON.parse(localStorage.getItem('data'));
  for (const tag of data.tags) {
    let number = 0;
    for (const task of data.items) {
      if (task.tags.includes(tag)) number++;
    }
    const tagLI = el('li');
    container.appendChild(tagLI);
    let nafn = tag;
    nafn = nafn[0].toUpperCase() + nafn.substring(1);
    tagLI.appendChild(el('div', nafn));
    const tagFjoldi = el('div', number.toString());
    tagFjoldi.classList.add('valfjoldi');
    tagLI.appendChild(el('div', tagFjoldi));
  }
}

function renderTaskList(container, sortKey) {
  const data = JSON.parse(localStorage.getItem('data'));
  const items = data.items.sort(compare(sortKey));
  console.log(items);

  for (const item of items) {
    if (!item.deleted) {
      const task = el('li');
      task.classList.add('verkefni');

      const check = el('input');
      check.setAttribute('type', 'checkbox');
      if (item.completed) {
        check.setAttribute('checked', 'checked');
      }
      task.appendChild(check);

      const anchor = el('a');
      anchor.classList.add('verkefnisinfo');
      anchor.setAttribute('href', '#');

      const title = el('h3', item.title);
      title.classList.add('verkefnistitill');
      anchor.appendChild(title);
      task.appendChild(anchor);

      const description = el('p', item.description);
      description.classList.add('verkefnislysing');
      task.appendChild(description);

      const details = el('div');
      details.classList.add('verkefnisflokkun');

      const d = new Date(item.due);
      const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
      };
      const date = el('span', d.toLocaleDateString('is', options));
      details.appendChild(date);

      const tags = el('div');
      tags.classList.add('taggar');
      for (const tag of item.tags) {
        const t = el('span', tag);
        t.classList.add('tag');
        tags.appendChild(t);
      }
      details.appendChild(tags);

      const category = el('div', item.category);
      details.appendChild(category);

      // anchor.appendChild(details);
      task.appendChild(details);
      container.appendChild(task);
    }
  }
}
function baetaVidVerkefni(e) {
  e.preventDefault();
  show('form');
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

function populateForm(id) {
  const task = fetchTask(id);
<<<<<<< HEAD
  document.querySelector('#titill').value=task.title;
  document.querySelector('#lysing').value=task.description;
  const date = new Date(task.due).toISOString(true).split('T')[0];
=======
  document.querySelector('#titill').value = task.title;
  document.querySelector('#lysing').value = task.description;
  const date = new Date(task.due);
>>>>>>> 2512dd3f1bab73a8a24af5b9220d49efe59ebe2a
  document.querySelector('#due').value = date;
  document.querySelector('#dueTime').value = null; // !!
  if(task.priority) 
    document.querySelector('#jaForgang').checked = true;
  else 
    document.querySelector('#neiForgang').checked = true;

  
  
}
