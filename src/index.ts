// Imports use relative file paths or Node.js package names
import { changeMapLocation, clickNextRound, getRandomNumb, reloadGame } from './dom-utils';
import { setGuessMap, toggleGuessMap } from './guess';
import location from '../locations.json';
import L from 'leaflet';
// CSS IMPORT IN TS NUR ÜBER VITE MÖGLICH
import './styles/main.scss';
import 'leaflet/dist/leaflet.css';

// for dom-utils.ts
export const locations          = location.locations;
export const StreetView         = document.getElementById("Map") as HTMLIFrameElement | null;
export const randomNumb: number = getRandomNumb();
export const nextButton         = document.getElementById("nextRound") as HTMLButtonElement | null;

export let pinIcon      = L.icon({iconUrl: './public/pin.png',  iconSize: [30, 34] });
export let pinIcon2     = L.icon({iconUrl: './public/goal.svg', iconSize: [34, 34] });

export let tile         = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png');
export let guessMap     = L.map('GuessMap',
    {
        zoomControl: true,
        layers: [tile],
        minZoom: 2,
        maxZoom: 12,
    })
    .setView([50, 10], 5);

// for guess.ts
export const roundPanel     = document.getElementById("RoundPanel") as HTMLDivElement | null;
export const GuessMap       = document.getElementById("GuessMap") as HTMLIFrameElement | null;
export const GuessButton    = document.getElementById("GuessButton") as HTMLButtonElement | null;
export let jsonCoords: { lat: number, lng: number } | null = null;
export let guessedCoords: L.LatLng | null = null;

// for result.ts
export const resultPanel    = document.getElementById("ResultPanel") as HTMLDivElement | null;

/// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// Functions
function startApp() {
    changeMapLocation();
    setGuessMap();
    clickNextRound();
    reloadGame();
    toggleGuessMap();
}

startApp();