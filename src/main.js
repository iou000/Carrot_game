'use strict';
import MessageBox from './messageBox.js';
import GameBuilder from './game.js';


const gameFinishBanner = new MessageBox();
const game = new GameBuilder()
.gameTimer(10)
.carrotCount(10)
.bugCount(10)
.build();

game.setGameStopListener((text) => {
    gameFinishBanner.showWithText(text);
});

gameFinishBanner.setClickListener(() => {
    game.replay();
});