import { NEXT_BUTTON, PANEL_RESULT, PANEL_ROUND } from './dom-utils';

export function changeNextButton(): void {
    if (NEXT_BUTTON) {
        NEXT_BUTTON.innerHTML = "Ergebnisse ansehen";
        NEXT_BUTTON.style.background = "#FFA43D";
        NEXT_BUTTON.style.color = "#1A1A2E";
    }
}

export function showResults(): void {
    // hide PANEL_ROUND
    PANEL_ROUND?.classList.remove("show");
    // show resultPanel
    PANEL_RESULT?.classList.add("show");
}