import { fetchTask, pushTask, deleteTask, modifyTask } from './localstorage.js';

import { empty, el, compare } from './helpers.js';

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

export function fetchAndRenderPage(container) {
  const baetaVid = document.querySelector('.baetavidverkefni');
  baetaVid.addEventListener('click', baetaVidVerkefni);
  populateForm(5);
  // Page consists of valstika and task list
  const valstikan = document.querySelector('.valstika');
  renderValstika(valstikan);
  const verkefnalistinn = document.querySelector('.verkefnalisti');
  const sort = document.querySelector('.sorting');
  sort.addEventListener('change', (e) => {
    renderTaskList(verkefnalistinn, e.target.value);
  });
  renderTaskList(verkefnalistinn, 'due');
}

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

function handleTagClick(e) {}

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

function renderTaskList(container, sortKey, searchTag = null) {
  empty(container);
  const data = JSON.parse(localStorage.getItem('data'));

  let tasks;
  if (!searchTag) {
    tasks = data.items.sort(compare(sortKey));
  } else {
    tasks = [];
    for (const task in data.items) {
      if (searchTag in task.tags) {
        tasks.push(task);
      }
    }
    tasks.sort(compare(sortKey));
  }

  for (const task of tasks) {
    if (!task.deleted) {
      const taskElem = el('li');
      taskElem.classList.add('verkefni');

      const check = el('input');
      check.setAttribute('type', 'checkbox');
      check.setAttribute('value', task.id);
      if (task.completed) {
        check.setAttribute('checked', 'true');
      }
      check.addEventListener('change', (e) => {
        modifyTask(e.target.value, 'completed', e.target.checked);
      });
      taskElem.appendChild(check);

      const anchor = el('a');
      anchor.classList.add('verkefnisinfo');
      anchor.setAttribute('href', '#');

      const title = el('h3', task.title);
      title.classList.add('verkefnistitill');
      anchor.appendChild(title);
      taskElem.appendChild(anchor);

      const description = el('p', task.description);
      description.classList.add('verkefnislysing');
      taskElem.appendChild(description);

      const details = el('div');
      details.classList.add('verkefnisflokkun');

      const d = new Date(task.due);
      const options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
      };
      const date = el('span', d.toLocaleDateString('is', options));
      details.appendChild(date);

      const tags = el('div');
      tags.classList.add('taggar');
      for (const tag of task.tags) {
        const t = el('span', tag);
        t.classList.add('tag');
        tags.appendChild(t);
      }
      details.appendChild(tags);

      const category = el('div', task.category);
      details.appendChild(category);

      // anchor.appendChild(details);
      taskElem.appendChild(details);
      container.appendChild(taskElem);
    }
  }
}

function baetaVidVerkefni(e) {
  e.preventDefault();
  show('form');
}

function populateForm(id) {
  console.log("Populate form");
  const task = fetchTask(id);
  document.querySelector('#titill').value = task.title;
  document.querySelector('#lysing').value = task.description;
  const date = new Date(task.due).toISOString(true).split('T')[0];
  document.querySelector('#due').value = date;
  let time = new Date(task.due).toISOString(true).split('T')[1];
  time = time.split('.')[0];
  document.querySelector('#dueTime').value = time; // !! Vantar að setja tíma
  if (task.priority) document.querySelector('#jaForgang').checked = true;
  else document.querySelector('#neiForgang').checked = true;
  let cat = task.category;
  cat = cat[0].toUpperCase() + cat.substring(1);
  document.querySelector('#neiForgang').value = cat;
  const tagTextbox = document.querySelector('#tags');
  for (const tag of task.tags) {
    tagTextbox.value += `${tag} `;
  }
}
