import { guessMap, getJsonCoords, randomNumb } from './dom-utils'
import { setResultMap } from './result'
import L, { LatLng } from 'leaflet';
const GuessMap = document.getElementById("GuessMap") as HTMLIFrameElement | null;


// Map bottom right
// ######################################################################
export function setGuessMap(): void {
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(guessMap);
 
    guessMap.on('click', placeGuess);
}


function placeGuess(e: L.LeafletMouseEvent): void {
    GuessMap?.classList.add("guessPlaced");

    const popup = L.popup()
    popup
        .setLatLng(e.latlng)
        .setContent("Dein Guess wurde gesetzt!")
        .openOn(guessMap);

    const guessedCoords = e.latlng;
    const jsonCoords = getJsonCoords(randomNumb);
    setResultMap(jsonCoords, guessedCoords);

    // activate Guess Button
    GuessButton.removeAttribute("disabled");
}

const GuessButton = document.getElementById("GuessButton") as HTMLButtonElement;
export const resultPanel = document.getElementById("ResultPanel")
GuessButton.addEventListener("click", function() {
    resultPanel?.classList.add("show");
    
    // checkDistance(getJsonCoords(randomNumb), guessedCoords);
})

toggleGuessMap()
function toggleGuessMap() {
    const toggleGuessButton = document.querySelector(".guessmap__toggle")
    const guessWrapper = document.querySelector(".guessmap__wrapper")
    toggleGuessButton?.addEventListener("click", function() {
        guessWrapper?.classList.toggle("guessmap__tall")
    })
}