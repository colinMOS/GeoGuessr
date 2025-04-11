// Imports use relative file paths or Node.js package names
import { textInput } from './dom-utils';
// CSS IMPORT IN TS NUR ÜBER VITE MÖGLICH
// CSS Imports
import './styles/styles.css';
import './styles/main.scss';
import 'leaflet/dist/leaflet.css';


// init App
textInput.addEventListener('input', (e) => {
    //log input value
    console.log((e.target as HTMLInputElement).value);
})