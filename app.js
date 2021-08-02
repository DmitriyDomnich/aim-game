const startBtn = document.getElementById('start');
const screens = document.querySelectorAll('.screen');
const timeList = document.getElementById('time-list');
const gameBoard = document.querySelector('.board');
const timeEl = document.getElementById('time');
const restartBtn = document.querySelector('.restart');

let time = 0,
    score = 0,
    colors = ['linear-gradient(to right, #ad5389, #3c1053)',
        'linear-gradient(to left, #bc4e9c, #f80759)',
        'linear-gradient(to left, #0f0c29, #302b63, #24243e)',
        'linear-gradient(to left, #56ccf2, #2f80ed)'
    ];

startBtn.addEventListener('click', (e) => {
    e.preventDefault();
    screens[0].classList.add('up');
});
restartBtn.addEventListener('click', restartGame);
timeList.addEventListener('click', (e) => {
    if (!e.target.classList.contains('time-btn'))
        return;
    time = e.target.dataset.time;
    startGame();
});
gameBoard.addEventListener('click', (e) => {
    if (!e.target.classList.contains('circle'))
        return;
    e.target.remove();
    score++;
    createRandomCircle();
})

function startGame() {
    screens[1].classList.add('up');
    setTime();
    createRandomCircle();
    const sub = setInterval(() => {
        if (time > 0) {
            time--;
            timeEl.innerHTML = time > 9 ? `00:${time}` : `00:0${time}`;
        } else {
            clearInterval(sub);
            finishGame();
        }
    }, 1000);
}

function finishGame() {
    timeEl.parentElement.classList.add('hide');
    gameBoard.innerHTML = `<h1>You scored <span class='primary'>${score}</span>!</h1>`;
    restartBtn.style.opacity = '1';
    restartBtn.removeAttribute('disabled');
}

function restartGame(e) {
    restartBtn.style.opacity = '0';
    restartBtn.setAttribute('disabled', 'true');
    screens[2].classList.remove('up');
    screens[1].classList.remove('up');
    setTime();
    score = 0;
    gameBoard.innerHTML = '';
}

function setTime() {
    timeEl.parentElement.classList.remove('hide');
    timeEl.innerHTML = `00:${time}`;
}

function createRandomCircle() {
    const circle = document.createElement('div');

    const size = getRandomNumber(10, 60);
    const coords = gameBoard.getBoundingClientRect();
    const x = getRandomNumber(0, coords.width - size);
    const y = getRandomNumber(0, coords.height - size);
    circle.classList.add('circle');
    circle.style.background = getRandomColor();
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.style.top = `${x}px`;
    circle.style.left = `${y}px`;
    gameBoard.appendChild(circle);
}

function getRandomColor() {
    return colors[Math.floor(Math.random() * colors.length)]
}

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}