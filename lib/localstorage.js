export function syncData({ items, categories }) {
  let data;

  if (localStorage.getItem('data') === null) {
    data = { items: [], categories, tags: [], notDeleted: [] };
  } else {
    data = JSON.parse(localStorage.getItem('data'));
  }

  for (const item of items) {
    if (item.id > data.items.length) {
      data.items.push(item);

      for (const tag of item.tags) {
        if (!data.tags.includes(tag)) {
          data.tags.push(tag);
        }
      }

      if (!item.deleted) data.notDeleted.push(item);
    }
  }

  localStorage.setItem('data', JSON.stringify(data));
}

export function fetchTask(id) {}

export function pushTask(task) {}

export function deleteTask(id) {}
