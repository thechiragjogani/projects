function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

let num1 = randomNumber(0,100)
let num2 = randomNumber(0,100)

const operator = randomNumber(0, 3)
const operators = ["*", "+", "-"]
const currentOperator = operators[operator]

const livesEl = document.getElementById("lives")
const scoreEl = document.getElementById("score")
const question = document.getElementById("question")
const stats = document.getElementById("stats")
const input = document.getElementById("input")
const start = document.getElementById("start")
const submit = document.getElementById("submit")
const form = document.getElementById("form")
const restart = document.getElementById("restart")

var lives = JSON.parse(localStorage.getItem("lives"));
var score = JSON.parse(localStorage.getItem("score"));
var startGame = JSON.parse(localStorage.getItem("start"));

function currentQuestion(){
    if (num1 < num2) {
        num1 += num2;
        num2 = num1 - num2;
        num1 -= num2;
        question.innerText = `What is ${num1} ${currentOperator} ${num2}?`
    }
    else{
        question.innerText = `What is ${num1} ${currentOperator} ${num2}?`
    }
}

function checkAnswer(num1, num2, currentOperator, answer){
    let correctAnswer = 0;
    switch(currentOperator){
        case "*":
            correctAnswer = num1 * num2;
            break;
        case "+":
            correctAnswer = num1 + num2;
            break;
        case "-":
            correctAnswer = num1 - num2;
            break;
    }
    if (answer == correctAnswer) {localStorage.setItem("score", JSON.stringify(++score));}
    else {localStorage.setItem("lives", JSON.stringify(--lives));}
}

function show(){
    stats.style.visibility='visible';
    input.style.visibility='visible';
    submit.style.visibility='visible';
}

function hide(){
    stats.style.visibility='hidden';
    input.style.visibility='hidden';
    submit.style.visibility='hidden';
}

function play() {
    if (lives > 0) {
        livesEl.innerText = `LIVES: ${lives}`;
        scoreEl.innerText = `SCORE: ${score}`;
        currentQuestion();
    }
    else if (lives == 0){
        localStorage.setItem("start", "0");
        hide()
        question.innerHTML = `Your score: ${score}.<br>Press Restart to play again.`;
    }
}

form.addEventListener("submit", ()=>{
    const answer = +input.value;
    console.log(answer)
    checkAnswer(num1, num2, currentOperator, answer)
})

function initializeGame() {
    localStorage.setItem("start", "1");
    localStorage.setItem("score", "0");
    localStorage.setItem("lives", "3");
    score = 0;
    lives = 3;
    show();
    play();
}

function exitGame(){
    localStorage.setItem("start", "0");
    localStorage.setItem("score", "0");
    localStorage.setItem("lives", "3");
    score = 0;
    lives = 3;
    question.innerHTML = "Thank you for playing! ❤️<br>Please restart to play again!";
    hide()
}

if(startGame==1){
    show();
    play();
}