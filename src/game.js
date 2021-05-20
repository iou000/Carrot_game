'use strict';

import Field from './field.js';
import * as sound from './sound.js';


export default class GameBuilder {
    gameTimer(timer) {
        this.gameTimer = timer;
        return this;
    }

    carrotCount(num) {
        this.carrotCount = num;
        return this;
    }

    bugCount(num) {
        this.bugCount = num;
        return this;
    }

    build() {
        return new Game(
            this.gameTimer,
            this.carrotCount,
            this.bugCount
        );
    }
}


class Game {
    constructor(gameTimer, carrotCount, bugCount) {
        this.gameTimer = gameTimer;
        this.carrotCount = carrotCount;
        this.bugCount = bugCount;
        
        this.game_timer = document.querySelector('.game_timer');
        this.game_score = document.querySelector('.game_score');
        this.icon = document.querySelector('.fas');
        this.play_button = document.querySelector('.play_button');
        this.level = document.querySelector('.level');
        this.scorePoint = document.querySelector('.scorePoint');

        this.play_button.addEventListener('click', () => {
            if (this.icon.className === 'fas fa-play') {
                this.start();
            }
            else if (this.icon.className === 'fas fa-stop') {
                sound.playAlert();
                this.stop('REPLAY❓');
            }
        });
    
        this.gameField = new Field(this.carrotCount, this.bugCount);
        this.gameField.setClickListener(this.onItemClick); //this 바인딩 해줘야함

        this.score = 0;
        this.minute = 0;
        this.second = 0;
        this.timer = undefined;
        this.level_score = 1;
        this.scorePointNum = 0;
    }

        setGameStopListener(onGameStop) {
            this.onGameStop = onGameStop; //클로저
        }

        start() {
            this.setInitialize();
            this.gameField.init();
            this.showStopButton();
        }

        level_up() {
            this.setLevelUp();
            this.gameField.init();
        }

        scoreUp() {
            this.scorePointNum++;
            this.scorePoint.innerHTML = `SCORE : ${this.scorePointNum}`;
        }

        stop(text) {
            sound.stopBackground();
            clearInterval(this.timer);
            this.play_button.style.visibility = 'hidden';
            this.onGameStop && this.onGameStop(text);
        }

        onItemClick = (item) => {
            if (item === 'carrot'){
                this.score++;
                this.scoreUp();
                this.show_score(this.gameField.fieldcarrotCount-this.score);
            }
            if(this.gameField.fieldcarrotCount === this.score){
                sound.playWin();
                this.stop('LEVEL UP!');
            }
            if (item === 'bug') {
                this.stop(`YOU LOSE ${this.scorePointNum}점..`);
            }
        }

        showStopButton() {
            this.icon.classList.remove('fa-play');
            this.icon.classList.add('fa-stop');
        }

        show_score(count) {
            this.game_score.textContent = `${count}`; 
        }

        start_timer(count) {
            this.minute = Math.floor(count / 60);
            this.second = count % 60;

            this.game_timer.textContent = `${this.minute}:${this.second}`;

            this.timer = setInterval(() => {
                this.game_timer.textContent = `${this.minute}:${this.second - 1}`;
                this.second--;
                if (this.minute > 0 && his.second === 0) {
                    this.minute--;
                    this.second = 60;
                }
                if (this.second < 4) {
                    this.game_timer.style.background = '#ff0000';
                }
                if (this.minute === 0 && this.second < 1) {
                    this.stop(`TIME OUT ${this.scorePointNum}점..`);
                    this.game_timer.style.background = '#ffffff';
                    sound.playBug();
                }
            }, 1000);
        }

        setButtonAndTimer() {
            this.play_button.style.visibility = 'visible';
            this.game_timer.style.background = '#ffffff';
        }

        setInitialize() {
            this.setButtonAndTimer();
            sound.playBackground();
            this.score = 0;
            this.level_score = 1;
            this.scorePointNum = 0;
            this.gameField.fieldbugCount = this.bugCount;
            this.gameField.fieldcarrotCount = this.carrotCount;
            this.i = 2;
            this.level.innerHTML= `LEVEL : ${this.level_score}`;
            this.scorePoint.innerHTML = `SCORE : ${this.scorePointNum}`;
            this.start_timer(this.gameTimer);
            this.show_score(this.carrotCount);
        }

        setLevelUp() {
            this.setButtonAndTimer();
            this.showStopButton();
            sound.playBackground();
            this.score = 0;
            this.gameField.fieldbugCount += 3;
            this.gameField.fieldcarrotCount += 2;
            this.level_score++;
            this.start_timer(this.gameTimer);
            this.show_score(this.gameField.fieldcarrotCount);
            this.level.innerHTML= `LEVEL : ${this.level_score}`;
        }


    }