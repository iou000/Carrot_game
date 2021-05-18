'use strict';

const carrotSound = new Audio('sound/carrot_pull.mp3');
const bugSound = new Audio('sound/bug_pull.mp3');
const bgSound = new Audio('sound/bg.mp3');
const gameWinSound = new Audio('sound/game_win.mp3');
const alertSound = new Audio('sound/alert.wav');


export function playCarrot() {
    playSound(carrotSound);
}

export function playBug() {
    playSound(bugSound);
}

export function playWin() {
    playSound(gameWinSound);
}

export function playAlert() {
    playSound(alertSound);
}

export function playBackground() {
    playSound(bgSound);
}

export function stopBackground() {
    stopSound(bgSound);
}


function playSound(sound) {
    sound.currentTime = 0;
    sound.play();
}
function stopSound(sound) {
    sound.pause();
}