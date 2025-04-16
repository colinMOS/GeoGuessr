import { roundPanel, GuessMap, randomNumb, GuessButton, guessMap } from './index';
import { setRoundMap, getJsonCoords } from './dom-utils';
import { checkDistance } from './calculation';
import L from 'leaflet';

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

    let guessedCoords   : L.LatLng = e.latlng;
    let jsonCoords      : L.LatLng = L.latLng(getJsonCoords(randomNumb).lat, getJsonCoords(randomNumb).lng);
    setRoundMap(jsonCoords, guessedCoords);
    
    // activate Guess Button
    GuessButton?.removeAttribute("disabled");
    clickGuessButton(guessedCoords, jsonCoords);
}

function clickGuessButton(coordsGuess: L.LatLng, coordsTrue : L.LatLng): void {
    GuessButton?.addEventListener("click", function() {
        roundPanel?.classList.add("show");
        if (coordsTrue && coordsGuess) {
            checkDistance(coordsGuess, coordsTrue);
        }
    })
}

export function toggleGuessMap(): void {
    const toggleGuessButton = document.querySelector(".guessmap__toggle") as HTMLButtonElement | null;
    const guessWrapper = document.querySelector(".guessmap__wrapper") as HTMLDivElement | null;

    toggleGuessButton?.addEventListener("click", function() {
        guessWrapper?.classList.toggle("guessmap__tall")
    })
}