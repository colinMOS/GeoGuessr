import { guessMap, getJsonCoords, randomNumb, setRoundMap, pinIcon } from './dom-utils';
import { checkDistance } from './calculation';
import L from 'leaflet';

export const roundPanel = document.getElementById("RoundPanel");
const GuessMap = document.getElementById("GuessMap") as HTMLIFrameElement | null;
const GuessButton = document.getElementById("GuessButton") as HTMLButtonElement | null;
export let jsonCoords: { lat: number, lng: number } | null = null;
export let guessedCoords: L.LatLng | null = null;

toggleGuessMap();

export function setGuessMap(): void {
    guessMap.on('click', placeGuess) && setTimeout(() => guessMap.invalidateSize(), 800);
}

function placeGuess(e: L.LeafletMouseEvent): void {
    GuessMap?.classList.add("guessPlaced");

    const popup = L.popup()

    popup
        .setLatLng(e.latlng)
        .setContent("Dein Guess wurde gesetzt!")
        .openOn(guessMap);

    guessedCoords = e.latlng;
    jsonCoords = getJsonCoords(randomNumb);
    setRoundMap(jsonCoords, guessedCoords);

    // activate Guess Button
    GuessButton?.removeAttribute("disabled");
    clickGuessButton();
}

function clickGuessButton() {
    GuessButton?.addEventListener("click", function() {
        roundPanel?.classList.add("show");
        if (jsonCoords && guessedCoords) {
            checkDistance(jsonCoords, guessedCoords);
        }
    })
}

function toggleGuessMap() {
    const toggleGuessButton = document.querySelector(".guessmap__toggle");
    const guessWrapper = document.querySelector(".guessmap__wrapper");

    toggleGuessButton?.addEventListener("click", function() {
        guessWrapper?.classList.toggle("guessmap__tall")
    })
}