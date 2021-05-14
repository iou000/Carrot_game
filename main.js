const gameField = document.querySelector('.game_field');
const play_button = document.querySelector('.play_button');
const message_box = document.querySelector('.message_box');
const replay_button = document.querySelector('.replay_button');
const game_message = document.querySelector('.game_message');

let BUG_COUNT = 10;
let CARROT_COUNT = 10;
let TIMER_COUNT = 10;
let score = 0;
let minute = 0;
let second = 0;

const icon = document.querySelector('.fas');
const game_timer = document.querySelector('.game_timer');
const game_score = document.querySelector('.game_score');

const bgSound = new Audio('sound/bg.mp3');
const carrotSound = new Audio('sound/carrot_pull.mp3');
const bugSound = new Audio('sound/bug_pull.mp3');
const gameWinSound = new Audio('sound/game_win.mp3');
const alertSound = new Audio('sound/alert.wav');



//당근, 벌레 랜덤배치 함수
function init_BugOrCarrot(className, imgPath, count) {
    for (let i = 0; i < count; i++) {
        //x : 0~760, y : 0~176
        const x = Math.random() * 760;
        const y = Math.random() * 176;

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
    init_BugOrCarrot('carrot', 'img/carrot.png', BUG_COUNT);
    init_BugOrCarrot('bug', 'img/bug.png', CARROT_COUNT);
}



function start_game() {
    playSound(bgSound);
    score = 0;
    init_game();
    start_timer(TIMER_COUNT);
    show_score(CARROT_COUNT);
}

function showStopButton() {
    icon.classList.remove('fa-play');
    icon.classList.add('fa-stop');
}

function start_timer(count) {
     minute = Math.floor(count / 60);
     second = count % 60;

    game_timer.textContent = `${minute}:${second}`;

    timer = setInterval(() => {
        game_timer.textContent = `${minute}:${second - 1}`;
        second--;
        if (minute > 0 && second === 0) {
            minute--;
            second = 60;
        }
        if (second < 4) {
            game_timer.style.background = '#ff0000';
        }
        if (minute === 0 && second < 1) {
            playSound(bugSound);
            stopSound(bgSound);
            clearInterval(timer);
            game_timer.style.background = '#ffffff';
            show_message_box('YOU LOSE');
        }
    }, 1000);
}

function show_score(count) {
    game_score.textContent = `${count}`; 
}

function show_message_box(text) {
    message_box.classList.remove('hide');
    game_message.innerText = text;
    play_button.style.visibility = 'hidden';
    
}

function removeAllBugCarrot() {
    while (gameField.firstChild){
        gameField.removeChild(gameField.firstChild);
    }
}

function replayGame() {
    message_box.classList.add('hide');
    play_button.style.visibility = 'visible';
    game_timer.style.background = '#ffffff';
    removeAllBugCarrot();
    start_game();
}

//사운드 관련
function playSound(sound) {
    sound.currentTime = 0;
    sound.play();
}
function stopSound(sound) {
    sound.pause();
}

gameField.addEventListener('click', (e) => {
    //당근 클릭했을 때
    if (e.target.className === 'carrot') {
        playSound(carrotSound);
        e.target.remove();
        score++;
        show_score(CARROT_COUNT - score);
        if(CARROT_COUNT - score === 0){
            playSound(gameWinSound);
            clearInterval(timer);
            show_message_box('CHICKEN🍗');
            stopSound(bgSound);
        }
    }
    //벌레 클릭했을 때
    if (e.target.className === 'bug') {
        playSound(bugSound);
        clearInterval(timer);
        show_message_box('YOU LOSE');
        stopSound(bgSound);
    }
});

play_button.addEventListener('click', () => {
    if (icon.className === 'fas fa-play') {
        start_game();
        showStopButton();
    }
    else if (icon.className === 'fas fa-stop') {
        playSound(alertSound);
        stopSound(bgSound);
        clearInterval(timer);
        show_message_box('REPLAY❓');
    }
});

replay_button.addEventListener('click', () => {
    replayGame();
});