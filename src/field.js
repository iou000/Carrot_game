'use strict';

import * as sound from './sound.js';

export default class Field{
    constructor(carrotCount, bugCount){
        this.carrotCount = carrotCount;
        this.bugCount = bugCount;
        this.field = document.querySelector('.game_field');
        this.field.addEventListener('click', this.onClick); //this 바인딩 해줘야함
    }

    init() {
        this._init_BugOrCarrot('carrot', 'img/carrot.png', this.carrotCount);
        this._init_BugOrCarrot('bug', 'img/bug.png', this.bugCount);
    }

    setClickListener(onItemClick) { 
        this.onItemClick = onItemClick; //클로저
    }

    _init_BugOrCarrot(className, imgPath, count) {
        for (let i = 0; i < count; i++) {
            //x : 0~760, y : 0~176
            const x = Math.random() * 760;
            const y = Math.random() * 176;
    
            const item = document.createElement('img');
            item.setAttribute('src', imgPath);
            item.setAttribute('class', className);
            item.style.left = `${x}px`;
            item.style.top = `${y}px`;
            this.field.appendChild(item);
        }
    }

    onClick = e => {
        //당근 클릭했을 때
        if (e.target.className === 'carrot') {
        sound.playCarrot();
        e.target.remove();
        this.onItemClick && this.onItemClick('carrot');
        }
        //벌레 클릭했을 때
        if (e.target.className === 'bug') {
            sound.playBug();
            this.onItemClick && this.onItemClick('bug');
        }
    }

    removeAllBugCarrot() {
        while (this.field.firstChild){
            this.field.removeChild(this.field.firstChild);
        }
    }
}

