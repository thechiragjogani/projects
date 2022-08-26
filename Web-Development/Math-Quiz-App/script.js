const num1 = randomNumber(0,100)
const num2 = randomNumber(0,100)

const livesEl = document.getElementById("lives")
const scoreEl = document.getElementById("score")

const operators = ["*", "+", "-"]
const operator = randomNumber(0, 3)
const currentOperator = operators[operator]

const question = document.getElementById("question")
const input = document.getElementById("input")
const start = document.getElementById("start")
const submit = document.getElementById("form")
const restart = document.getElementById("restart")

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
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

function show(){
    document.getElementById('stats').style.visibility='visible';
    document.getElementById('input').style.visibility='visible';
    document.getElementById('submit').style.visibility='visible';
}

function hide(){
    document.getElementById('stats').style.visibility='hidden';
    document.getElementById('input').style.visibility='hidden';
    document.getElementById('submit').style.visibility='hidden';
}

function getCurrentScore(){
    const lives = JSON.parse(localStorage.getItem("lives"));
    const score = JSON.parse(localStorage.getItem("score"));
}

function play() {
    getCurrentScore();
    if (lives > 0) {
        livesEl.innerText = `LIVES: ${lives}`
        scoreEl.innerText = `SCORE: ${score}`
        currentQuestion();
    }
    else if (lives == 0){
        hide();
        question.innerText = `Your score: ${score}. Please reset to play again.`;
    }
}

submit.addEventListener("submit", ()=>{
    const answer = +input.value;
    checkAnswer(num1, num2, currentOperator, answer)
})

start.addEventListener("click", ()=>{
    localStorage.setItem("score", "0")
    localStorage.setItem("lives", "3")
    show()
    play()
})

restart.addEventListener("click", ()=>{
    localStorage.setItem("score", "0")
    localStorage.setItem("lives", "3")
    show()
    play()
})

if(!lives && !score){hide();}
