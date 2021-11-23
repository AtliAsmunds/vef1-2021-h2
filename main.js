import { fetchData } from './lib/data.js';
import { compareData } from './lib/localstorage.js';

// Clears storage
window.localStorage.clear();

const json = fetchData();
compareData(json);
