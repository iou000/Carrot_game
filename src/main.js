'use strict';
import MessageBox from './messageBox.js';
import GameBuilder from './game.js';


const gameFinishBanner = new MessageBox();
const game = new GameBuilder()
.gameTimer(10)
.carrotCount(3)
.bugCount(3)
.build();

game.setGameStopListener((text) => {
    gameFinishBanner.showWithText(text);
});

gameFinishBanner.setGameStartListener(() => {
    game.start();
});

gameFinishBanner.setLevelUpListener(() => {
    game.level_up();
})
