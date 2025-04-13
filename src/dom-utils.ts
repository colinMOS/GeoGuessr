import L from 'leaflet';
import { roundPanel, setGuessMap } from './guess';
import { showResults, changeNextButton } from './result';
import location from '../locations.json';

const locations = location.locations;
const StreetView = document.getElementById("Map") as HTMLIFrameElement | null;
// exports
let roundMap: L.Map;
export let guessMap = L.map('GuessMap').setView([50, 50], 4);
export const randomNumb: number = getRandomNumb();
export const nextButton = document.getElementById("nextRound");
export let round: number = 1;
// marker icons
export let pinIcon     = L.icon({iconUrl: './public/pin.png',  iconSize: [30, 34] });
export let pinIcon2    = L.icon({iconUrl: './public/goal.svg', iconSize: [34, 34] });

changeMapLocation();
setGuessMap();
// playMusic();

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
    guessMap.closePopup();
    roundMap?.closePopup();

    round++;
    if(round <= 3) {  
        console.log("round"+ round);
         
        roundPanel?.classList.remove("show");
        if (roundTexts) {
            roundTexts.forEach(text => {
                text.innerHTML = round.toString();
            })
        }
        changeMapLocation();
    } else {
        showResults();
    }
    if(round > 2) {
        changeNextButton();
    }
})

function changeMapLocation() {
    let number: number = getRandomNumb();

    if(StreetView) {
        StreetView.src = getJsonEmbed(number);
    }
}

export function setRoundMap(
    coords1: { lat: number, lng: number }, 
    coords2: L.LatLng
): void {
     if (roundMap) {
        roundMap.remove();
    }

    roundMap = L.map('RoundMap').setView([coords1.lat, coords1.lng], 10);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(roundMap);

    //markers
    L.marker([coords1.lat, coords1.lng], { title: 'Ziel', icon: pinIcon2 }).addTo(roundMap);
    L.marker([coords2.lat, coords2.lng], { title: 'Dein Guess', icon: pinIcon }).addTo(roundMap);
    
    // line between markers
    L.polyline([
        [coords1.lat, coords1.lng],
        [coords2.lat, coords2.lng]
    ], {
        color: 'red',
        weight: 30,
        opacity: 0.8
    }).addTo(roundMap);
    
    // roundMap.fitBounds(polyLine.getBounds());
}

function playMusic() {
    const backgroundMusic: HTMLAudioElement = new Audio('./public/music.mp3');

    backgroundMusic.loop = true;
    backgroundMusic.play(); 
    backgroundMusic.volume = 0.3;
}