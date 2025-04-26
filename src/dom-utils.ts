export const MAP_STREETVIEW         = document.getElementById("Map") as HTMLIFrameElement | null;
export const NEXT_BUTTON            = document.getElementById("nextRound") as HTMLButtonElement | null;

export const PANEL_ROUND            = document.getElementById("RoundPanel") as HTMLDivElement | null;
export const MAP_GUESS_EL           = document.getElementById("GuessMap") as HTMLIFrameElement | null;
export const BUTTON_GUESS           = document.getElementById("GuessButton") as HTMLButtonElement | null;

export const PANEL_RESULT           = document.getElementById("ResultPanel") as HTMLDivElement | null;

export const BUTTON_TOGGLE_GUESS    = document.querySelector(".guessmap__toggle-button") as HTMLButtonElement | null;
export const MAP_GUESS_WRAPPER      = document.querySelector(".guessmap__wrapper") as HTMLDivElement | null;

export const DISTANCE_EL            = document.querySelector(".distance");
export const POINTS_EL              = document.querySelector(".points");
export const SCORE_EL               = document.querySelectorAll(".score") as NodeListOf<HTMLElement> | null;

export const ROUND_ELEMENTS         = document.querySelectorAll(".round") as NodeListOf<HTMLElement> | null;
export const RELOAD                 = document.querySelector("#reloadGame") as HTMLButtonElement | null;
