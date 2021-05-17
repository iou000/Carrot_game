'use strict';
import MessageBox from './messageBox.js';
import Field from './field.js';

const play_button = document.querySelector('.play_button');


let BUG_COUNT = 10;
let CARROT_COUNT = 10;
let TIMER_COUNT = 10;
let score = 0;
let minute = 0;
let second = 0;
let timer = undefined;

const icon = document.querySelector('.fas');
const game_timer = document.querySelector('.game_timer');
const game_score = document.querySelector('.game_score');

const bgSound = new Audio('sound/bg.mp3');
const gameWinSound = new Audio('sound/game_win.mp3');
const alertSound = new Audio('sound/alert.wav');



const gameFinishBanner = new MessageBox();
gameFinishBanner.setClickListener(replayGame);

const gameField = new Field(CARROT_COUNT, BUG_COUNT);
gameField.setClickListener(onItemClick);


function onItemClick(item) {
    if (item === 'carrot'){
        score++;
        show_score(CARROT_COUNT-score);
    }
    if(CARROT_COUNT - score === 0){
        playSound(gameWinSound);
        stopGame('CHICKEN🍗');
    }
    if (item === 'bug') {
        stopGame('YOU LOSE');
    }
}

function start_game() {
    playSound(bgSound);
    score = 0;
    gameField.init();
    showStopButton();
    start_timer(TIMER_COUNT);
    show_score(CARROT_COUNT);
}

function showStopButton() {
    icon.classList.remove('fa-play');
    icon.classList.add('fa-stop');
}

function start_timer(count) {
     minute = Math.floor(count / 60);
     second = count % 60;

    game_timer.textContent = `${minute}:${second}`;

    timer = setInterval(() => {
        game_timer.textContent = `${minute}:${second - 1}`;
        second--;
        if (minute > 0 && second === 0) {
            minute--;
            second = 60;
        }
        if (second < 4) {
            game_timer.style.background = '#ff0000';
        }
        if (minute === 0 && second < 1) {
            stopGame('YOU LOSE');
            game_timer.style.background = '#ffffff';
        }
    }, 1000);
}

function stopGame(text) {
    stopSound(bgSound);
    clearInterval(timer);
    gameFinishBanner.showWithText(text);
    play_button.style.visibility = 'hidden';
}

function show_score(count) {
    game_score.textContent = `${count}`; 
}

function replayGame() {
    gameField.removeAllBugCarrot();
    play_button.style.visibility = 'visible';
    game_timer.style.background = '#ffffff';
    start_game();
}

//사운드 관련
function playSound(sound) {
    sound.currentTime = 0;
    sound.play();
}
function stopSound(sound) {
    sound.pause();
}

play_button.addEventListener('click', () => {
    if (icon.className === 'fas fa-play') {
        start_game();
    }
    else if (icon.className === 'fas fa-stop') {
        playSound(alertSound);
        stopGame('REPLAY❓');
    }
});