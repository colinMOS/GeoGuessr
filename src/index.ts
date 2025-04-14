// Imports use relative file paths or Node.js package names
import './dom-utils';
import './guess';
// CSS IMPORT IN TS NUR ÜBER VITE MÖGLICH
import './styles/main.scss';
import 'leaflet/dist/leaflet.css';

reloadGame();

function reloadGame() {
    const reloadGame = document.querySelector("#reloadGame");
    reloadGame?.addEventListener('click', function() {
        window.location.reload();
    })
}