import { fetchData } from './lib/data.js';
import { syncData } from './lib/localstorage.js';
import { fetchAndRenderPage } from './lib/ui.js';

// Clears storage
window.localStorage.clear();

// <main> er rót alls efnisins
const mainEl = document.querySelector('main');

async function main() {
  const json = await fetchData();
  syncData(json);
  
  // Render the page into <main>
  // fetchAndRenderPage(mainEl);
}

main();
