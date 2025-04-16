import L from 'leaflet';
import { showResults, changeNextButton } from './result';
import { locations, StreetView, nextButton, guessMap, pinIcon, pinIcon2, roundPanel } from './index';
// exports
export let roundMap : L.Map;
export let round    : number = 1;

export function getRandomNumb(): number {
    const randomNumb: number = Math.floor(Math.random() * locations.length);
    
    return randomNumb;
}

function getJsonEmbed(randomNumb: number): string {
    const randomEmbed: string = locations[randomNumb].embed;

    return randomEmbed;
}

export function getJsonCoords(randomNumb: number): {lat: number, lng: number} {
    let jsonLat     : number    = locations[randomNumb].lat;
    let jsonLong    : number    = locations[randomNumb].long;
    let jsonCoords              = {lat: jsonLat, lng: jsonLong }; 

    return jsonCoords;
}

export function clickNextRound() : void {

    nextButton?.addEventListener("click", function() {
        const roundTexts = document.querySelectorAll(".round") as NodeListOf<HTMLElement>;
        guessMap.closePopup();
        roundMap?.closePopup();
        
        round++;;
        if(round <= 3) {  
            
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
}

export function changeMapLocation(): void {
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

    let tileLayer = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
    
    roundMap = L.map('RoundMap',
        {
            zoomControl: true,
            layers: [tileLayer],
            minZoom: 2,
            maxZoom: 2,
        })
        .setView([coords1.lat, coords1.lng], 12);
    
    //markers
    const targetMarker = L.marker([coords1.lat, coords1.lng], { title: 'Ziel', icon: pinIcon2 }).addTo(roundMap);
    const guessMarker  = L.marker([coords2.lat, coords2.lng], { title: 'Dein Guess', icon: pinIcon }).addTo(roundMap);
    
    // line between markers
    let polyLine = L.polyline([
        [coords1.lat, coords1.lng],
        [coords2.lat, coords2.lng]
    ], {
        color: 'red',
        weight: 10,
        opacity: 0.8
    }).addTo(roundMap);

    setTimeout(() => {
        roundMap.invalidateSize();

        targetMarker.addTo(roundMap);
        guessMarker.addTo(roundMap);
        polyLine.addTo(roundMap);

        const bounds = L.latLngBounds([
            [coords1.lat, coords1.lng],
            [coords2.lat, coords2.lng]
        ]);

        // zoom to fit polyline
        roundMap.fitBounds(bounds, {
            padding: [40, 40]
        });
    }, 800);
}

function playMusic(): void {
    const backgroundMusic: HTMLAudioElement = new Audio('./public/happyBgMusic.mp3');

    backgroundMusic.loop = true;
    backgroundMusic.play(); 
    backgroundMusic.volume = 0.3;
}

export function reloadGame(): void {
    const reloadGame = document.querySelector("#reloadGame") as HTMLButtonElement | null;
    reloadGame?.addEventListener('click', function() {
        window.location.reload();
    })
}