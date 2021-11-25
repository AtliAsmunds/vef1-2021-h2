import { fetchData } from './lib/data.js';
import { syncData, fetchTask } from './lib/localstorage.js';
import { fetchAndRenderPage } from './lib/ui.js';

// Clears storage
window.localStorage.clear();

// <main> er rót alls efnisins
const mainEl = document.querySelector('main');

async function main() {
  const json = await fetchData();
  syncData(json);
  console.log(fetchTask(98));

  // Render the page into <main>
  fetchAndRenderPage(mainEl);
}

main();
