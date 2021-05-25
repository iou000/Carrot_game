'use strict';

export default class MessageBox {
    constructor() {
        this.message_box = document.querySelector('.message_box');
        this.replay_button = document.querySelector('.replay_button');
        this.replay_icon = document.querySelector('.replay_button .fas');
        this.game_message = document.querySelector('.game_message');
        this.replay_button.addEventListener('click', () => {
            if(this.replay_icon.className === 'fas fa-arrow-up'){
                this.levelup && this.levelup();
                this.replay_icon.classList.remove('fa-arrow-up');
                this.replay_icon.classList.add('fa-redo-alt');
                this.hide();
            }
            else {
            this.onClick && this.onClick();
            this.hide();
            }
            
        });
    }

    setClickListener(onClick) {
        this.onClick = onClick;
    }

    setLevel_up(levelup){
        this.levelup = levelup;
    }

    showWithText(text) {
        if(text === 'LEVEL UP!'){
            this.replay_icon.classList.remove('fa-redo-alt');
            this.replay_icon.classList.add('fa-arrow-up');
        }
        this.message_box.classList.remove('hide');
        this.game_message.innerText = text;
    }

    hide() {
        this.message_box.classList.add('hide');
    }

    

}