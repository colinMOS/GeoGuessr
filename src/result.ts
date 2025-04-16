import { nextButton, roundPanel, resultPanel } from './index';

export function changeNextButton(): void {
    if (nextButton) {
        nextButton.innerHTML = "Ergebnisse ansehen";
        nextButton.style.background = "#FFA43D";
        nextButton.style.color = "#1A1A2E";
    }
}

export function showResults(): void {
    // hide roundPanel
    roundPanel?.classList.remove("show");
    // show resultPanel
    resultPanel?.classList.add("show");
}