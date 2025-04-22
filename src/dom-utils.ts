export const MAP_STREETVIEW         = document.getElementById("Map") as HTMLIFrameElement;
export const NEXT_BUTTON            = document.getElementById("nextRound") as HTMLButtonElement;

export const PANEL_ROUND            = document.getElementById("RoundPanel") as HTMLDivElement;
export const MAP_GUESS_EL           = document.getElementById("GuessMap") as HTMLIFrameElement;
export const BUTTON_GUESS           = document.getElementById("GuessButton") as HTMLButtonElement;

export const PANEL_RESULT           = document.getElementById("ResultPanel") as HTMLDivElement;

export const BUTTON_TOGGLE_GUESS    = document.querySelector(".guessmap__toggle") as HTMLButtonElement;
export const MAP_GUESS_WRAPPER      = document.querySelector(".guessmap__wrapper") as HTMLDivElement;

export const DISTANCE_EL            = document.querySelector(".distance");
export let POINTS_EL                = document.querySelector(".points");
export let SCORE_EL                 = document.querySelectorAll(".score") as NodeListOf<HTMLElement>;

export const ROUND_ELEMENTS         = document.querySelectorAll(".round") as NodeListOf<HTMLElement>;
export const RELOAD                 = document.querySelector("#reloadGame") as HTMLButtonElement ;
