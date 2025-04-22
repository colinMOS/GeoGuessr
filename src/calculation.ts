import { DISTANCE_EL, POINTS_EL, SCORE_EL } from "./dom-utils";

const R = 6371; // Earth's radius in km

const POINTS_OVER_10000: number =   50;
const POINTS_OVER_5000: number  =  200;
const POINTS_OVER_3000: number  =  300;
const POINTS_OVER_2000: number  =  400;
const POINTS_OVER_1000: number  =  500;
const POINTS_OVER_100: number   =  900;
const POINTS_OVER_50: number    = 1000;

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
    
    window.dispatchEvent(new Event('resize')); 
    return distanceRound;
}

function showDistance(distance: string) : void {
    if (DISTANCE_EL) {
        DISTANCE_EL.innerHTML = distance;
    }
}

// Helper function to convert degrees to radians
function degreesToRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
}

export function calcPoints(distance: number): void {
    let totalScore = 0;
    let points: number = 0;

    if (distance > 10000) {
        points += POINTS_OVER_10000;
    } else if (distance > 5000) {
        points += POINTS_OVER_5000;
    } else if (distance > 3000) {
        points += POINTS_OVER_3000;
    } else if (distance > 2000) {
        points += POINTS_OVER_2000;
    } else if (distance >= 1000) {
        points += POINTS_OVER_1000;
    } else if (distance >= 100) {
        points += POINTS_OVER_100;
    } else if (distance >= 50) {
        points += POINTS_OVER_50;
    }
    totalScore += points;
    
    if (SCORE_EL)
        SCORE_EL.forEach(scoreText => {
            scoreText.innerHTML = totalScore.toString();
        })
            
    if (POINTS_EL) 
        POINTS_EL.innerHTML = points.toString();
}