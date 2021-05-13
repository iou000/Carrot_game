const gameField = document.querySelector('.game_field');
const play_button = document.querySelector('.play_button');

let BUG_COUNT = 10;
let CARROT_COUNT = 10;
let TIMER_COUNT = 10;

//당근, 벌레 랜덤배치 함수
function init_BugOrCarrot(className, imgPath, count) {
    for(let i=0;i<count;i++){
        //x : 0~760, y : 0~176
        const x = Math.random()*760;
        const y = Math.random()*176;

        const item = document.createElement('img');
        item.setAttribute('src', imgPath);
        item.setAttribute('class', className);
        item.style.left = `${x}px`;
        item.style.top = `${y}px`;
        gameField.appendChild(item);
    }
}

//Field에 당근,벌레 램덤위치에 생성
function init_game() {
    init_BugOrCarrot('carrot', 'img/carrot.png',BUG_COUNT);
    init_BugOrCarrot('bug', 'img/bug.png',CARROT_COUNT);
}

const icon = document.querySelector('.fas');
const game_timer = document.querySelector('.game_timer');
const game_score = document.querySelector('.game_score');


function start_game() {
    init_game();
    showStopButton();
    start_timer(TIMER_COUNT);
    show_score(CARROT_COUNT);
}

function showStopButton() {
    icon.classList.remove('fa-play');
    icon.classList.add('fa-stop');
}

function start_timer(count) {
    let minute = Math.floor(count / 60);
    let second = count % 60;
        
        timer = setInterval(() => {
            game_timer.textContent=``;
            game_timer.innerHTML = `${minute}:${second}`;
            second--;
            if(second < 3){
                game_timer.style.background = '#FF0000';
            }
            if(minute <= 0 && second < 0){
            clearInterval(timer);
            }
        }, 1000);

}

function show_score(CARROT_COUNT) {
    game_score.innerHTML = `${CARROT_COUNT}`;
}



play_button.addEventListener('click', () => {
    if (icon.className === 'fas fa-play'){
    start_game();
    }
    else if(icon.className === 'fas fa-stop') {
        clearInterval(timer);
    }
})