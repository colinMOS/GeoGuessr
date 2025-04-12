import L, { LatLng } from 'leaflet';
import { roundPanel, setGuessMap } from './guessMap';
import { showResults } from './result';
import location from '../locations.json';
// exports
export const textInput = document.querySelector('#map') as HTMLInputElement;
const locations = location.locations;
export let guessMap = L.map('GuessMap').setView([50, 50], 4);
export const randomNumb: number = getRandomNumb();

const Map = document.getElementById("Map") as HTMLIFrameElement | null;
const nextButton = document.getElementById("nextRound");
export let round: number = 1;

//THIS IS THE ENTRY FILE - WRITE YOUR MAIN LOGIC HERE
changeMapLocation();
setGuessMap();

function getRandomNumb(): number {
    const randomNumb: number = Math.floor(Math.random() * locations.length);
    return randomNumb;
}

function getJsonEmbed(randomNumb: number): string {
    const randomEmbed: string = locations[randomNumb].embed;
    return randomEmbed;
}

export function getJsonCoords(randomNumb: number): {lat: number, lng: number} {
    let jsonLat: number = locations[randomNumb].lat;
    let jsonLong: number = locations[randomNumb].long;
    let jsonCoords = {lat: jsonLat, lng: jsonLong }; 

    return jsonCoords;
}

nextButton?.addEventListener("click", function() {
    const roundTexts = document.querySelectorAll(".round");

    round++;
    if(round < 4) {   
        roundPanel?.classList.remove("show");
        if (roundTexts) {
            roundTexts.forEach(text => {
                text.innerHTML = round.toString();
            })
        }
        changeMapLocation();
    }
})

function changeMapLocation() {
    console.log("Change Location");
    let number: number = getRandomNumb()
    if(Map) {
        Map.src = getJsonEmbed(number);
    }
}

function nextRound() {
    // const roundNumber: String = document.getElementById("Round");
    // for(let i = 1;i < 3;i++) {
    //     roundNumber = i;

    //     if (i=3) {
    //         const buttonText: string = "Spiel beenden";
    //     }
    // }
}