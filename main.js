const gameField = document.querySelector('.game_field');

//당근, 벌레 랜덤배치 함수
function init_BugOrCarrot(className, imgPath, count) {

    for(let i=0;i<count;i++){
        //x : 0~760, y : 0~176
        const x = Math.random()*760;
        const y = Math.random()*176;

        const item = document.createElement('img');
        item.setAttribute('src', imgPath);
        item.setAttribute('class', className);
        gameField.appendChild(item);

        item.style.transform = `translate(${x}px, ${y}px)`;
    }

}
function init_game() {
    //Field에 당근,벌레 생성
    init_BugOrCarrot('carrot', 'img/carrot.png',10);
    init_BugOrCarrot('bug', 'img/bug.png',20);
}

init_game();
