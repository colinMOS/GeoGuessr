import L, { LatLng } from 'leaflet';
import { resultPanel, setGuessMap } from './guessMap';
import { showResults } from './result';
import location from '../locations.json';
// exports
export const textInput = document.querySelector('#map') as HTMLInputElement;
export let guessMap = L.map('GuessMap').setView([50, 50], 4);
export const randomNumb: number = getRandomNumb();

const Map = document.getElementById("Map") as HTMLIFrameElement | null;
const locations = location.locations;
const nextButton = document.getElementById("nextRound");
let round: number = 1;

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
    const roundText = document.querySelector(".round");

    round++;
    if(round <=3) {   
        resultPanel?.classList.remove("show");
        if (roundText) {
            roundText.innerHTML = round.toString();
        }
        changeMapLocation();
    } else {
        showResults();
    }
    
})

function changeMapLocation() {
    console.log("Change Location");

    if(Map) {
        Map.src = getJsonEmbed(randomNumb);
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