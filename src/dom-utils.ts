export const textInput = document.querySelector('#map') as HTMLInputElement;
import L from 'leaflet';
import location from '../locations.json';

console.log("AAAAA");
const Map = document.getElementById("Map") as HTMLIFrameElement | null;
const GuessMap = document.getElementById("GuessMap") as HTMLIFrameElement | null;
const locations = location.locations;
const randomNumb = getRandomNumb();

//THIS IS THE ENTRY FILE - WRITE YOUR MAIN LOGIC HERE
setGuessMap()
changeMapLocation();

function nextRound() {
    // const roundNumber: String = document.getElementById("Round");
    // for(let i = 1;i < 3;i++) {
    //     roundNumber = i;

    //     if (i=3) {
    //         const buttonText: string = "Spiel beenden";
    //     }
    // }
}


function getRandomNumb(): number {
    const randomNumb: number = Math.floor(Math.random() * locations.length);
    return randomNumb;
}

function getJsonEmbed(randomNumb: number): string {
    const randomEmbed: string = locations[randomNumb].embed;
    return randomEmbed;
}

function getJsonCoords(randomNumb: number): {lat: number, lng: number} {
    let jsonLat: number = locations[randomNumb].lat;
    let jsonLong: number = locations[randomNumb].long;
    let jsonCoords = {lat: jsonLat, lng: jsonLong }; 

    return jsonCoords;
}


function changeMapLocation() {
    console.log("Change Location");

    if(Map) {
        Map.src = getJsonEmbed(getRandomNumb());
    }
}


function setGuessMap(): void {
    var map = L.map('GuessMap').setView([51.505, -0.09], 13);
    var popup = L.popup()

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

        function onMapClick(e): object {
            GuessMap?.classList.add("guessPlaced");
            popup
                .setLatLng(e.latlng)
                .setContent("Dein Guess wurde gesetzt!")
                .openOn(map);
                console.log(e.latlng);
                
                // Check the distance between the guess and the random location
                
                // const jsonCoords = getJsonCoords(randomNumb);
                return e.latlng;
        }
        
        map.on('click', onMapClick);

}

const GuessButton = document.getElementById("GuessButton") as HTMLButtonElement;
const resultPanel = document.getElementById("ResultPanel")
GuessButton.addEventListener("click", function() {
    alert("Siz")
    resultPanel?.classList.add("show");
    checkDistance(jsonCoords, e.latlng);
})

function checkDistance(coords1: { lat: number, lng: number }, coords2: L.LatLng): void {
   
    const R = 6371; // Earth's radius in kilometers

    // Convert degrees to radians
    const lat1 = degreesToRadians(coords1.lat);
    const lon1 = degreesToRadians(coords1.lng);
    const lat2 = degreesToRadians(coords2.lat);
    const lon2 = degreesToRadians(coords2.lng);

    const dLat = lat2 - lat1;
    const dLon = lon2 - lon1;

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1) * Math.cos(lat2) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers

    console.log(`Distance between guess and actual location: ${distance.toFixed(2)} km`);
}

// Helper function to convert degrees to radians
function degreesToRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
}