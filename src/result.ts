import { checkDistance } from './calculation';
import { roundPanel } from './guessMap';
import L, { LatLng } from 'leaflet';
const resultPanel = document.getElementById("resultPanel")

export function setRoundMap(coords1: { lat: number, lng: number }, coords2: L.LatLng): void {
    var roundMap = L.map('RoundMap').setView([coords1.lat, coords1.lng], 15);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(roundMap);

    // Popup jsonCoords
    var jsonPopup = L.marker([coords1.lat, coords1.lng],
        {   title: 'Ziel'
        }
        ).addTo(roundMap);
    // Popup guessedCoords
    var guessPopup = L.marker([coords2.lat, coords2.lng],
        {   title: 'Dein Guess'
        }
    ).addTo(roundMap);

    checkDistance(coords1, coords2);

}

export function showResults() {
    const resultButton: HTMLButtonElement | null = document.querySelector("#nextRound");
    const memeIframe = document.querySelector("#Meme") as HTMLIFrameElement | null;;
    if (resultButton) {
       resultButton.innerHTML = "Ergebnisse ansehen"
    }

    resultButton?.addEventListener("click", function() {
        // hide roundPanel
        roundPanel?.classList.remove("show");
        // show resultPanel
        resultPanel?.classList.remove("show");
        // show vitory meme
        fetchMemeUrl().then((url) => {
            if (url && memeIframe) {
                memeIframe.src = url;
            }
          });
    })
}

async function fetchMemeUrl(): Promise<string | null> {
    try {
      const response = await fetch('https://meme-api.com/gimme');  
      const data = await response.json();

      return data.url as string;
    } catch (error) {
      console.error('Failed to fetch meme URL:', error);
      return null;
    }
}