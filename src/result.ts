import { roundPanel } from './guess';
import { guessMap, nextButton } from './dom-utils';
import L from 'leaflet';
const resultPanel = document.getElementById("ResultPanel")
export let roundMap: L.Map | null = null;

export function setRoundMap(
    coords1: { lat: number, lng: number }, 
    coords2: L.LatLng
): void {
    // no map -> initialize, else: update map
    if(!roundMap) {
        roundMap = L.map('RoundMap').setView([coords1.lat, coords1.lng], 15);
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(roundMap);
    } else {
        roundMap.setView([coords1.lat, coords1.lng], 15);
    }
    
    // Popup jsonCoords
    L.marker([coords1.lat, coords1.lng], { title: 'Ziel' }).addTo(roundMap);
    // Popup guessedCoords
    L.marker([coords2.lat, coords2.lng], { title: 'Dein Guess' }).addTo(roundMap);
}

export function changeNextButton() {
    if (nextButton) {
        nextButton.innerHTML = "Ergebnisse ansehen";
        nextButton.style.background = "#FFA43D";
        nextButton.style.color = "#1A1A2E";
    }
}

export function showResults() {
    // hide roundPanel
    roundPanel?.classList.remove("show");
    // show resultPanel
    resultPanel?.classList.add("show");
}