'use strict'

const carrotSound = new Audio('sound/carrot_pull.mp3');
const bugSound = new Audio('sound/bug_pull.mp3');
export default class Field{
    constructor(carrotCount, bugCount){
        this.carrotCount = carrotCount;
        this.bugCount = bugCount;
        this.field = document.querySelector('.game_field');
        this.field.addEventListener('click', this.onClick);
    }

    init() {
        this._init_BugOrCarrot('carrot', 'img/carrot.png', this.carrotCount);
        this._init_BugOrCarrot('bug', 'img/bug.png', this.bugCount);
    }

    setClickListener(onItemClick) {
        this.onItemClick = onItemClick;
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
        playSound(carrotSound);
        e.target.remove();
        this.onItemClick && this.onItemClick('carrot');
        }
        //벌레 클릭했을 때
        if (e.target.className === 'bug') {
            playSound(bugSound);
            this.onItemClick && this.onItemClick('bug');
        }
    }

    removeAllBugCarrot() {
        while (this.field.firstChild){
            this.field.removeChild(this.field.firstChild);
        }
    }
}
function playSound(sound) {
    sound.currentTime = 0;
    sound.play();
}

