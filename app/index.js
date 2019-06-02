// Load application styles
import 'styles/index.css';

// ================================
// START YOUR APP HERE
// ================================

const moles = document.querySelectorAll('.mole-wrap');
const scoreTag = document.querySelector('.score-number');
const startButton = document.querySelector('.start-button');
let autoHide;
let beforeHole;
let opportunity = 10;
let randomIdx = 0;
let score = 0;

function start(){
  startButton.style.display = 'none';
  startButton.innerHTML = '재시작';
  scoreTag.innerHTML = '0';
  score = 0;

  opportunity = 10;
  play();
}

function randomHole() {
  randomIdx = Math.floor(Math.random() * 9);
  if (beforeHole === randomIdx){
    randomHole()
  }
  beforeHole = randomIdx;
}

function play() {
  if (!opportunity) {
    return startButton.style.display = 'block';
  }
  opportunity--;

  setTimeout(() => {
    randomHole()
    moles[randomIdx].classList.add('show');
  }, 1000);

  autoHide = setTimeout(() => {
    moles[randomIdx].classList.add('hide');
  }, 4000);
}

function Catch () {
  score += 10;
  scoreTag.innerHTML = score;
  clearTimeout(autoHide);
  this.classList.add('hide');
}

function downRemoveClass () {
  if (!this.classList.contains('hide')) return;
  this.classList.remove('hide');
  this.classList.remove('show');
  play();
}

startButton.addEventListener('click', start);
moles.forEach(mole => { mole.addEventListener('click', Catch) });
moles.forEach(mole => { mole.addEventListener('animationend', downRemoveClass) });
