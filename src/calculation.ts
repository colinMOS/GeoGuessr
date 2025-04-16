let totalScore = 0;
const R = 6371; // Earth's radius in km

export function checkDistance(
    coords1: { lat: number, lng: number }, 
    coords2: L.LatLng
): string {   
    
    // Convert degrees to radians
    const lat1 : number = degreesToRadians(coords1.lat);
    const lon1 : number = degreesToRadians(coords1.lng);
    const lat2 : number = degreesToRadians(coords2.lat);
    const lon2 : number = degreesToRadians(coords2.lng);

    const diffLat : number = lat2 - lat1;
    const diffLon : number = lon2 - lon1;

    const a =
        Math.sin(diffLat / 2) * Math.sin(diffLat / 2) +
        Math.cos(lat1) * Math.cos(lat2) *
        Math.sin(diffLon / 2) * Math.sin(diffLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in km
    const distanceRound = distance.toFixed(2);
    
    showDistance(distanceRound);
    calcPoints(distance);
    
    return distanceRound;
}

function showDistance(distance: string) : void {
    const distanceText : HTMLElement | null = document.querySelector(".distance");

    if (distanceText) {
        distanceText.innerHTML = distance;
    }
}

// Helper function to convert degrees to radians
function degreesToRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
}

export function calcPoints(distance: number): void {
    let points: number = 0;
    let pointText = document.querySelector(".points") as HTMLElement | null;
    let ScoreTexts = document.querySelectorAll(".score") as NodeListOf<HTMLElement>;

    if (distance > 10000) {
        points += 50;
    } else if (distance > 5000) {
        points += 200;
    } else if (distance > 3000) {
        points += 300;
    } else if (distance > 2000) {
        points += 400;
    } else if (distance >= 1000) {
        points += 500;
    } else if (distance >= 100) {
        points += 900;
    } else if (distance >= 50) {
        points += 1000;
    }
    totalScore += points;
    
    if (ScoreTexts)
        ScoreTexts.forEach(scoreText => {
            scoreText.innerHTML = totalScore.toString();
        })
            
    if (pointText) 
        pointText.innerHTML = points.toString();
}