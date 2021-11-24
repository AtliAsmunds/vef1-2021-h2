export function syncData({ items, categories }) {
  let data;

  // Make a default empty data object if localStorage is empty
  if (localStorage.getItem('data') === null) {
    data = {
      items: [],
      categories,
      tags: [],
      notDeleted: [],
      taskPerCat: {},
    };
  } else {
    data = JSON.parse(localStorage.getItem('data'));
  }

  for (const item of items) {
    // Make sure we don't add items already in the storage
    if (item.id > data.items.length) {
      data.items.push(item);

      // Update tag list
      for (const tag of item.tags) {
        if (!data.tags.includes(tag)) {
          data.tags.push(tag);
        }
      }

      // If item is not marked as deleted:
      if (!item.deleted) {
        // Add it to the notDeleted list
        data.notDeleted.push(item);

        // And update category counter
        if (!data.taskPerCat[item.category]) {
          data.taskPerCat[item.category] = 1;
        } else {
          data.taskPerCat[item.category]++;
        }
      }
    }
  }

  // Push updated data to localStorage
  localStorage.setItem('data', JSON.stringify(data));
}

export function fetchTask(id) {
  const data = JSON.parse(localStorage.getItem('data'));

  // Search the notDeleted list for task
  for (const item of data.notDeleted) {
    if (item.id === id) {
      return item;
    }
  }

  // If not found throw error
  throw new Error(`Id ${id} not found in data`);
}

// Ætti að setja in timestamp hér fyrir 'moddified'?
export function pushTask(task) {
  const data = JSON.parse(localStorage.getItem('data'));

  data.items.push(task);

  // Update tag list
  for (const tag of task.tags) {
    if (!data.tags.includes(tag)) {
      data.tags.push(tag);
    }
  }

  // Update category count
  if (!data.taskPerCat[task.category]) {
    data.taskPerCat[task.category] = 1;
  } else {
    data.taskPerCat[task.category]++;
  }

  // Push changes to storage
  localStorage.setItem('data', JSON.stringify(data));
}

// Ætti að setja in timestamp hér fyrir 'moddified'?
export function deleteTask(id) {
  const data = JSON.parse(localStorage.getItem('data'));

  // Soft delete task
  for (const item of data.items) {
    if (item.id === id) {
      item.deleted = true;

      // And update category count
      data.taskPerCat[item.category]--;
    }
  }

  // Delete task from notDeleted list
  for (let i = 0; i < data.notDeleted.length; i++) {
    if (data.notDeleted[i].id === id) {
      data.notDeleted.splice(i, 1);
    }
  }

  // Push changes to storage
  localStorage.setItem('data', JSON.stringify(data));
}

export function modifyTask(id, key, value) {
  const data = JSON.parse(localStorage.getItem('data'));

  // TODO: Laga þannig tekið hægt sé að vinna með tögg!
  for (const item of data.items) {
    if (item.id === id) {
      item[key] = value;
      item.modified = Date.now();
    }
  }

  localStorage.setItem('data', JSON.stringify(data));
}
