import { roundPanel } from './guess';
import { nextButton } from './dom-utils';

const resultPanel = document.getElementById("ResultPanel");

export function changeNextButton() {
    if (nextButton) {
        nextButton.innerHTML = "Ergebnisse ansehen";
        nextButton.style.background = "#FFA43D";
        nextButton.style.color = "#1A1A2E";
    }
}

export function showResults() {
    // hide roundPanel
    roundPanel?.classList.remove("show");
    // show resultPanel
    resultPanel?.classList.add("show");
}