// functions
import { changeMapLocation, clickNextRound, getRandomNumb, reloadGame } from './basic';
import { setGuessMap, toggleGuessMap }  from './guess';

// styling
import './styles/main.scss';
import 'leaflet/dist/leaflet.css';

// json import
import locationsData                    from '../locations.json';
export interface Location {
    name: string;
    embed: string;
    lat: number;
    long: number;
}
export const locations: Location[] = locationsData.locations;

export const randomNumb: number = getRandomNumb();
// leaflet
import L                                from 'leaflet';
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

function startApp() {
    changeMapLocation();
    setGuessMap();
    clickNextRound();
    reloadGame();
    toggleGuessMap();
}

startApp();