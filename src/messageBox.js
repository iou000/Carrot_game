'use strict';

export default class MessageBox {
    constructor() {
        this.message_box = document.querySelector('.message_box');
        this.replay_button = document.querySelector('.replay_button');
        this.game_message = document.querySelector('.game_message');
        this.replay_button.addEventListener('click', () => {
            this.onClick && this.onClick();
            this.hide();
        });
    }

    setClickListener(onClick) {
        this.onClick = onClick;
    }

    showWithText(text) {
        this.message_box.classList.remove('hide');
        this.game_message.innerText = text;
    }

    hide() {
        this.message_box.classList.add('hide');
    }

}