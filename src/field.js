'use strict'

export default class Field{
    constructor(carrotCount, bugCount){
        this.carrotCount = carrotCount;
        this.bugCount = bugCount;
        this.field = document.querySelector('.game_field');
        this.field.addEventListener('click', this.onClick);
    }

    init() {
       
    }
    
    onClick(e) {

    }
    



}