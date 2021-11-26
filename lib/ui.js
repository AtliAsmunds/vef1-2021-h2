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
  const cancel = document.querySelector('#cancelButton');
  cancel.addEventListener('click', (e) => {
    show('taskList');
  });
  populateForm(5);
  // Page consists of valstika and task list
  const valstikan = document.querySelector('.valstika');
  renderValstika(valstikan);
  const verkefnalistinn = document.querySelector('.verkefnalisti');
  const sort = document.querySelector('.sorting');
  sort.addEventListener('change', (e) => {
    renderTaskList(e.target.value);
  });
  renderTaskList();
}

function renderValstika(container) {
  console.log('renderValstika');
  const data = JSON.parse(localStorage.getItem('data'));
  // All, completed and uncompleted tasks
  const allTasks = document.querySelector('.Verkefni');
  allTasks.innerText = data.items.length;
  let fjoldiKlaradra = 0;
  for (const item of data.items) {
    if (item.completed) fjoldiKlaradra++;
  }

  const all = document.querySelector('.all-tasks');
  all.addEventListener('click', handleMenuClick());

  const finished = document.querySelector('.finished');
  finished.addEventListener('click', handleMenuClick('completed', true));
  const completedTasks = document.querySelector('.kláruðVerkefni');

  const unfinished = document.querySelector('.unfinished');
  unfinished.addEventListener('click', handleMenuClick('completed', false));
  completedTasks.innerText = fjoldiKlaradra;
  const uncompletedTasks = document.querySelector('.ókláruðVerkefni');

  uncompletedTasks.innerText = data.items.length - fjoldiKlaradra;
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
    catLI.addEventListener('click', handleMenuClick('category', cat));
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

function handleMenuClick(type = null, value = null) {
  return (e) => {
    e.preventDefault();
    if (type) {
      window.history.pushState({}, '', `/?${type}=${value}`);
    } else {
      window.history.pushState({}, '', '/');
    }
    renderTaskList();
  };
}

function handleTaskClick(id) {
  return (e) => {
    e.preventDefault();
    populateForm(id);
    show('form');
  };
}

function handleDeleteButtonClick(id) {
  return (e) => {
    e.preventDefault();
    deleteTask(id);
    show('taskList');
    const verkefnalistinn = document.querySelector('.verkefnalisti');
    const sort = document.querySelector('.sorting');
    renderTaskList(verkefnalistinn, sort.value);
  };
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
    tagLI.addEventListener('click', handleMenuClick('tag', tag));
    container.appendChild(tagLI);
    let nafn = tag;
    nafn = nafn[0].toUpperCase() + nafn.substring(1);
    tagLI.appendChild(el('div', nafn));
    const tagFjoldi = el('div', number.toString());
    tagFjoldi.classList.add('valfjoldi');
    tagLI.appendChild(el('div', tagFjoldi));
  }
}

function renderTaskList(sortKey = 'due') {
  const container = document.querySelector('.verkefnalisti');
  empty(container);

  const params = new URLSearchParams(window.location.search);
  const data = JSON.parse(localStorage.getItem('data'));
  let tasks;

  if (params.get('category')) {
    tasks = [];
    for (const task of data.items) {
      if (task.category === params.get('category')) {
        tasks.push(task);
      }
    }
  } else if (params.get('tag')) {
    tasks = [];
    for (const task of data.items) {
      if (task.tags.indexOf(params.get('tag')) >= 0) {
        tasks.push(task);
      }
    }
  } else if (params.get('completed')) {
    tasks = [];
    for (const task of data.items) {
      if (`${task.completed}` === params.get('completed')) {
        tasks.push(task);
      }
    }
  } else tasks = data.items;

  tasks.sort(compare(sortKey));

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
      anchor.addEventListener('click', handleTaskClick(task.id));
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
  // console.log("Populate form");
  const deleteButton = document.querySelector('#deleteButton');
  deleteButton.addEventListener('click', handleDeleteButtonClick(id));
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
