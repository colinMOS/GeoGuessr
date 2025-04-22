// Imports use relative file paths or Node.js package names
import { changeMapLocation, clickNextRound, getRandomNumb, reloadGame } from './basic';
import { setGuessMap, toggleGuessMap }  from './guess';
import locationsData                    from '../locations.json';
import L                                from 'leaflet';
// CSS IMPORT IN TS NUR ÜBER VITE MÖGLICH
import './styles/main.scss';
import 'leaflet/dist/leaflet.css';

export const locations          = locationsData.locations;
export const randomNumb: number = getRandomNumb();

export let pinIcon              = L.icon({iconUrl: './public/pin.png',  iconSize: [30, 34] });
export let pinIcon2             = L.icon({iconUrl: './public/goal.svg', iconSize: [34, 34] });

let tile                        = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png');
export let guessMap             = L.map('GuessMap',
                                {
                                    zoomControl: true,
                                    layers: [tile],
                                    minZoom: 2,
                                    maxZoom: 12,
                                })
                                .setView([50, 10], 5);

// Functions
function startApp() {
    changeMapLocation();
    setGuessMap();
    clickNextRound();
    reloadGame();
    toggleGuessMap();
}

startApp();