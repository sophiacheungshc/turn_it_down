import TurnItDown from './game';

const canvas = document.getElementById('tid-game');
document.getElementById("github").addEventListener("click", () => { window.open('https://github.com/sophiacheungshc/turn_it_down')} )

window.TurnItDown = new TurnItDown(canvas);

// const AudioContext = window.AudioContext || window.webkitAudioContext;
// const audioCtx = new AudioContext();
// const audioElement = document.querySelector('audio');
// const track = audioCtx.createMediaElementSource(audioElement);