import { MAP_GUESS_EL, BUTTON_GUESS, PANEL_ROUND, BUTTON_TOGGLE_GUESS, MAP_GUESS_WRAPPER } from './dom-utils';
import { randomNumb, guessMap }         from './index';
import { getJsonCoords, loadRoundMap }  from './basic';
import { checkDistance }                from './calculation';
import L                                from 'leaflet';

export function setGuessMap(): void {
    guessMap.on('click', placeGuess) && setTimeout(() => guessMap.invalidateSize(), 800);
}

function placeGuess(e: L.LeafletMouseEvent): void {
    MAP_GUESS_EL?.classList.add("guessPlaced");

    const popup = L.popup()

    popup
        .setLatLng(e.latlng)
        .setContent("Dein Guess wurde gesetzt!")
        .openOn(guessMap);

    let guessedCoords   : L.LatLng = e.latlng;
    let jsonCoords      : L.LatLng = L.latLng(  getJsonCoords(randomNumb).lat, 
                                                getJsonCoords(randomNumb).lng
                                            );
    loadRoundMap(jsonCoords, guessedCoords);
    
    // activate Guess Button
    BUTTON_GUESS?.removeAttribute("disabled");
    clickGuessButton(guessedCoords, jsonCoords);
}

function clickGuessButton(coordsGuess: L.LatLng, coordsTrue : L.LatLng): void {
    BUTTON_GUESS?.addEventListener("click", function() {
        PANEL_ROUND?.classList.add("show");
        if (coordsTrue && coordsGuess) {
            checkDistance(coordsGuess, coordsTrue);
        }
    })
}

export function toggleGuessMap(): void {
    BUTTON_TOGGLE_GUESS?.addEventListener("click", function() {
        MAP_GUESS_WRAPPER?.classList.toggle("guessmap__tall")
    })
}