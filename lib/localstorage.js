export function syncData({ items, categories }) {
  let data;

  // Make a default empty data object if localStorage is empty
  if (localStorage.getItem('data') === null) {
    data = {
      items: [],
      categories,
      notDeleted: [],
      taskPerCat: {},
      taskPerTag: {},
    };
  } else {
    data = JSON.parse(localStorage.getItem('data'));
  }

  for (const item of items) {
    // Make sure we don't add items already in the storage
    if (item.id > data.items.length) {
      data.items.push(item);

      // Update tag list
      // for (const tag of item.tags) {
      //   if (!data.tags.includes(tag)) {
      //     data.tags.push(tag);
      //   }
      // }

      for (const tag of item.tags) {
        if (!data.taskPerTag[tag]) {
          data.taskPerTag[tag] = 1;
        } else {
          data.taskPerTag[tag]++;
        }
      }

      // If item is not marked as deleted:
      if (!item.deleted) {
        // Add it to the notDeleted list
        data.notDeleted[item.id - 1] = item.id;

        // And update category counter
        if (!data.taskPerCat[item.category]) {
          data.taskPerCat[item.category] = 1;
        } else {
          data.taskPerCat[item.category]++;
        }
      } else {
        data.notDeleted[item.id - 1] = null;
      }
    }
  }

  // Push updated data to localStorage
  localStorage.setItem('data', JSON.stringify(data));
}

export function fetchTask(id) {
  const data = JSON.parse(localStorage.getItem('data'));

  if (id > data.items.length) throw new Error(`Id ${id} was not found`);
  else return data.items[id - 1];
}

// Ætti að setja in timestamp hér fyrir 'moddified'?
export function pushTask(task) {
  const data = JSON.parse(localStorage.getItem('data'));

  data.items.push(task);
  data.notDeleted.push(task.id);

  // Update tag list
  // for (const tag of task.tags) {
  //   if (!data.tags.includes(tag)) {
  //     data.tags.push(tag);
  //   }
  // }

  for (const tag of task.tags) {
    if (!data.taskPerTag[tag]) {
      data.taskPerTag[tag] = 1;
    } else {
      data.taskPerTag[tag]++;
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
  data.items[id - 1].deleted = true;
  data.notDeleted[id - 1] = null;
  data.taskPerCat[data.items[id - 1].category]--;
  console.log(id);
  for (const tag of data.items[id - 1].tags) {
    data.taskPerTag[tag]--;
  }

  // Push changes to storage
  localStorage.setItem('data', JSON.stringify(data));
}

export function modifyTask(id, key, value, task = null) {
  const data = JSON.parse(localStorage.getItem('data'));
  if (task !== null) {
    data.items[task.id - 1] = task;
    for (const tag of task.tags) {
      if (!data.taskPerTag[tag]) {
        data.taskPerTag[tag] = 1;
      } else {
        data.taskPerTag[tag]++;
      }
    }
    localStorage.setItem('data', JSON.stringify(data));
    return;
  }
  // TODO: Laga þannig tekið hægt sé að vinna með tögg!
  if (key !== 'tags') {
    data.items[id - 1][key] = value;
  } else {
    for (const tag of value) {
      if (!data.tags.includes(tag)) {
        data.tags.push(tag);
      }
    }
  }

  localStorage.setItem('data', JSON.stringify(data));
}
