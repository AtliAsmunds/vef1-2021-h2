import { fetchData } from './lib/data.js';
import { syncData } from './lib/localstorage.js';

// Clears storage
// window.localStorage.clear();

const json = await fetchData();
syncData(json);
