import { checkDistance } from './calculation';
import L, { LatLng } from 'leaflet';

export function setResultMap(coords1: { lat: number, lng: number }, coords2: L.LatLng): void {
    var resultMap = L.map('ResultMap').setView([coords1.lat, coords1.lng], 15);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(resultMap);

    // Popup jsonCoords
    var jsonPopup = L.marker([coords1.lat, coords1.lng],
        {   title: 'Ziel'
        }
        ).addTo(resultMap);
    // Popup guessedCoords
    var guessPopup = L.marker([coords2.lat, coords2.lng],
        {   title: 'Dein Guess'
        }
    ).addTo(resultMap);

    checkDistance(coords1, coords2);

}

export function showResults() {
    alert("finished")
}