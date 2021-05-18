'use strict';
import MessageBox from './messageBox.js';
import Game from './game.js';


let BUG_COUNT = 10;
let CARROT_COUNT = 10;
let TIMER_COUNT = 10;


const gameFinishBanner = new MessageBox();
const game = new Game(TIMER_COUNT, CARROT_COUNT, BUG_COUNT);

game.setGameStopListener((text) => {
    gameFinishBanner.showWithText(text);
});

gameFinishBanner.setClickListener(() => {
    game.replay();
});