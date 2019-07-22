import TurnItDown from './game';

const canvas = document.getElementById('tid-game');
document.getElementById("github").addEventListener("click", () => { window.open('https://github.com/sophiacheungshc/turn_it_down')} )

window.TurnItDown = new TurnItDown(canvas);