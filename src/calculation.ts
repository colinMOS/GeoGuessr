export function checkDistance(coords1: { lat: number, lng: number }, coords2: L.LatLng): string {   
    const R = 6371; // Earth's radius in kilometers

    // Convert degrees to radians
    const lat1 = degreesToRadians(coords1.lat);
    const lon1 = degreesToRadians(coords1.lng);
    const lat2 = degreesToRadians(coords2.lat);
    const lon2 = degreesToRadians(coords2.lng);

    const diffLat = lat2 - lat1;
    const diffLon = lon2 - lon1;

    const a =
        Math.sin(diffLat / 2) * Math.sin(diffLat / 2) +
        Math.cos(lat1) * Math.cos(lat2) *
        Math.sin(diffLon / 2) * Math.sin(diffLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers
    const distRound = distance.toFixed(2);
    showDistance(distRound)
    calcPoints(distance);
    

    return distRound;
}

function showDistance(distance: string) {
    const distText = document.querySelector(".distance");
    if (distText) {
        distText.innerHTML = distance;
    }

    console.log(`Distance between guess and actual location: ${distance} km`);
}

// Helper function to convert degrees to radians
function degreesToRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
}

export function calcPoints(distance: number): number {
    let points: number = 0;
    let Scores = document.querySelectorAll(".score")

    if (distance > 10000) {
        points = 50;
    } else if (distance > 5000) {
        points = 200;
    } else if (distance > 3000) {
        points = 300;
    } else if (distance > 2000) {
        points = 400;
    } else if (distance >= 1000) {
        points = 500;
    } else if (distance >= 100) {
        points = 900;
    } else if (distance >= 50) {
        points = 1000;
    }

    if (Scores) {
        Scores.forEach(score => {
            score.innerHTML = points.toString();
        })
    }
    return points;
}