import { MAP_GUESS_EL, BUTTON_GUESS, PANEL_ROUND, BUTTON_TOGGLE_GUESS, MAP_GUESS_WRAPPER } from './dom-utils';
import { guessMap, locations } from './index';
import { loadRoundMap } from './basic';
import { checkDistance } from './calculation';
import L from 'leaflet';

let guessedCoords: L.LatLng | null                  = null;
let jsonCoords: { lat: number, lng: number } | null = null;
let guessButtonClickListener: (() => void) | null   = null;

export function setGuessMap(): void {
    guessMap.on('click', (e: L.LeafletMouseEvent) => placeGuess(e.latlng));
    setTimeout(() => guessMap.invalidateSize(), 800);
}

function placeGuess(latlng: L.LatLng): void {
    MAP_GUESS_EL.classList.add("guessPlaced");

    const popup = L.popup()
        .setLatLng(latlng)
        .setContent("Dein Guess wurde gesetzt!")
        .openOn(guessMap);

    guessedCoords = latlng;
    const randomLocation    = locations[Math.floor(Math.random() * locations.length)];
    jsonCoords              = { lat: randomLocation.lat, lng: randomLocation.long };

    loadRoundMap(jsonCoords, guessedCoords);

    BUTTON_GUESS.removeAttribute("disabled");
    setupGuessButtonListener(); 
}

function setupGuessButtonListener(): void {
    if (!guessButtonClickListener) {
        guessButtonClickListener = () => {
            PANEL_ROUND.classList.add("show");

            if (guessedCoords && jsonCoords) {
                checkDistance(
                    { lat: jsonCoords.lat, lng: jsonCoords.lng },
                    guessedCoords
                );
            }
        };
        BUTTON_GUESS.addEventListener("click", (e: MouseEvent) => guessButtonClickListener);
    }
}

export function toggleGuessMap(): void {
    BUTTON_TOGGLE_GUESS.addEventListener("click", function (e: MouseEvent) {
        MAP_GUESS_WRAPPER.classList.toggle("guessmap__tall");
    });
}