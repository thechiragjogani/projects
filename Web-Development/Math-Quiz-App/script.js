let num1 = randomNumber(0,100)
let num2 = randomNumber(0,100)

const livesEl = document.getElementById("lives")
let lives = JSON.parse(localStorage.getItem("lives")) || 3;

let scoreEl = document.getElementById("score")
let score = JSON.parse(localStorage.getItem("score"));

const operators = ["*", "+", "-"]
const operator = randomNumber(0, 3)
const currentOperator = operators[operator]

const question = document.getElementById("question")
const input = document.getElementById("input")
const form = document.getElementById("form")

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function currentLives() {
    lives = JSON.parse(localStorage.getItem("lives"));
    livesEl.innerText = `LIVES: ${lives}`
}

function currentScore(){
    score = JSON.parse(localStorage.getItem("score"));
    scoreEl.innerText = `SCORE: ${score}`
}

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

    setTimeout(() => {
        currentLives();
        currentScore();
    }, 1);
}


function checkAnswer(num1, num2, currentOperator, answer){
    let correctAnswer = 0
    switch(currentOperator){
        case "*":
            correctAnswer = Number(num1) * Number(num2);
            break;
        case "+":
            correctAnswer = Number(num1) + Number(num2);
            break;
        case "-":
            correctAnswer = Number(num1) - Number(num2);
            break;
    }
    if (answer == correctAnswer) {
        localStorage.setItem("score", JSON.stringify(++score))
    }
    else{
        localStorage.setItem("lives", JSON.stringify(--lives))
    }
}

form.addEventListener("submit", ()=>{
    const answer = +input.value;
    checkAnswer(num1, num2, currentOperator, answer);
})

form.addEventListener("reset", ()=>{
    localStorage.setItem("score", "0")
    localStorage.setItem("lives", "3")
    document.getElementById('input').style.visibility='';
    document.getElementById('submit').style.visibility='';
    currentQuestion()
})

function play() {
    currentLives();
    currentScore();
    if (lives > 0) {
        currentQuestion();
    }
    else if (lives == 0){
        question.innerText = `Your score: ${score}. Please reset to play again.`
        document.getElementById('input').style.visibility='hidden';
        document.getElementById('submit').style.visibility='hidden';
    }
}

play()