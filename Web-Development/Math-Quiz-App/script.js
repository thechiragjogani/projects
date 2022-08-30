function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

let num1 = randomNumber(0, 100)
let num2 = randomNumber(0, 100)

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

var lives = JSON.parse(sessionStorage.getItem("lives"));
var score = JSON.parse(sessionStorage.getItem("score"));
var startGame = JSON.parse(sessionStorage.getItem("start"));

function currentQuestion(){
    if (num1 < num2) {
        num1 += num2;
        num2 = num1 - num2;
        num1 -= num2;
    }

    if (currentOperator == "*"){
        if (num1.toString().length > 1) {
            num1 = randomNumber(2, 25);
        }
        if (num2.toString().length > 1) {
            num2 = randomNumber(2, 25);
        }
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
    if (answer == correctAnswer) {sessionStorage.setItem("score", JSON.stringify(++score));}
    else {sessionStorage.setItem("lives", JSON.stringify(--lives));}
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
        sessionStorage.setItem("start", "0");
        sessionStorage.setItem("score", "0");
        sessionStorage.setItem("lives", "3");
        startGame = 0;
        question.innerHTML = `Your score: ${score}<br>Press Restart to play again.`;
        hide();
    }
}

form.addEventListener("submit", ()=>{
    const answer = +input.value;
    checkAnswer(num1, num2, currentOperator, answer);
})

function initializeGame() {
    sessionStorage.setItem("start", "1");
    sessionStorage.setItem("score", "0");
    sessionStorage.setItem("lives", "3");
    score = 0;
    lives = 3;
    startGame = 1;
    show();
    play();
}

function exitGame(){
    sessionStorage.setItem("start", "0");
    sessionStorage.setItem("score", "0");
    sessionStorage.setItem("lives", "3");
    score = 0;
    lives = 3;
    question.innerHTML = "Thank you for playing! ❤️<br>Please restart to play again!";
    hide()
}

if(startGame != 0){
    show();
    play();
}