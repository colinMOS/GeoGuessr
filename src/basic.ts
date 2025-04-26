import { MAP_STREETVIEW, NEXT_BUTTON, PANEL_ROUND, ROUND_ELEMENTS, RELOAD } from './dom-utils';
import L                                            from 'leaflet';
import { showResults, changeNextButton }            from './result';
import { locations, guessMap, pinIcon, pinIcon2 }   from './index';

let roundMap : L.Map;

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
    let jsonCoords              = { lat: jsonLat, lng: jsonLong }; 

    return jsonCoords;
}

export function clickNextRound() : void {
    let round : number = 1;
    
    NEXT_BUTTON?.addEventListener("click", function() {
        guessMap.closePopup();
        roundMap?.closePopup();
        
        round++;
        if(round <= 3) {  
            
            PANEL_ROUND?.classList.remove("show");
            if (ROUND_ELEMENTS) {
                ROUND_ELEMENTS.forEach(text => {
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

    if(MAP_STREETVIEW) {
        MAP_STREETVIEW.src = getJsonEmbed(number);
    }
}

function createTileLayer(): L.TileLayer {
    return L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png');
}

function createTargetMarker(coords: { lat: number, lng: number }): L.Marker {
    return L.marker([coords.lat, coords.lng], { title: 'Ziel', icon: pinIcon2 });
}

function createGuessMarker(coords: { lat: number, lng: number }): L.Marker {
    return L.marker([coords.lat, coords.lng], { title: 'Dein Guess', icon: pinIcon });
}

function createPolyline(coords1: { lat: number, lng: number }, coords2: L.LatLng): L.Polyline {
    return L.polyline([
        [coords1.lat, coords1.lng],
        [coords2.lat, coords2.lng]
    ], {
        color: 'red',
        weight: 10,
        opacity: 0.8
    })
}

function fitMapToBounds(map: L.Map, coords1: { lat: number, lng: number }, coords2: L.LatLng): void {
    const bounds = L.latLngBounds([
        [coords1.lat, coords1.lng],
        [coords2.lat, coords2.lng],
    ]);

    map.fitBounds(bounds, {
        padding: [40, 40],
    });
}

function setRoundMap(coords1: { lat: number, lng: number }): void {
    roundMap = L.map('RoundMap',
        {
            zoomControl: true,
            layers: [createTileLayer()],
            minZoom: 2,
            maxZoom: 6,
        })
        .setView([coords1.lat, coords1.lng], 12);
}

export function loadRoundMap(
    coords1: { lat: number, lng: number }, 
    coords2: L.LatLng
): void {

    if (roundMap) {
        roundMap.remove();
    }
   
    setRoundMap(coords1);

    if (!roundMap) { 
        throw new Error("RoundMap not found!"); 
    }

    const targetMarker = createTargetMarker(coords1).addTo(roundMap);
    const guessMarker  = createGuessMarker(coords2).addTo(roundMap);
    const polyLine     = createPolyline(coords1, coords2).addTo(roundMap);

    roundMap.on('load', () => {
        roundMap.invalidateSize();
        fitMapToBounds(roundMap, coords1, coords2);
    });

    window.dispatchEvent(new Event('resize'));
}

export function reloadGame(): void {
    RELOAD?.addEventListener('click', function() {
        window.location.reload();
    })
}