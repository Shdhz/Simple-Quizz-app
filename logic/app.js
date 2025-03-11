import { QUESTION } from "./soal.js";

const question_element = document.getElementById("question");
const answer_btn = document.getElementById("answer-button");
const next_btn = document.getElementById("next-btn");
const explanation_element = document.getElementById("explanation");

let currentQuestionIndex = 0;
let questionNo = 1;
let score = 0;
let shuffledQuestions = [];

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    questionNo = 1;
    shuffledQuestions = [...QUESTION];
    shuffleArray(shuffledQuestions);
    next_btn.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = shuffledQuestions[currentQuestionIndex];

    question_element.innerHTML = questionNo++ + ". " + currentQuestion.question;
    shuffleArray(currentQuestion.answer);

    currentQuestion.answer.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answer_btn.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    next_btn.style.display = "none";
    explanation_element.innerHTML = "";
    while (answer_btn.firstChild) {
        answer_btn.removeChild(answer_btn.firstChild);
    }
}

function selectAnswer(e) {
    const selected_btn = e.target;
    const benar = selected_btn.dataset.correct === "true";
    let currentQuestion = shuffledQuestions[currentQuestionIndex];

    if (benar) {
        selected_btn.classList.add("benar");
        score++;
    } else {
        selected_btn.classList.add("salah");
    }

    Array.from(answer_btn.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("benar");
        }
        button.disabled = true;
    });

    explanation_element.innerHTML = `<strong>Penjelasan:</strong> ${currentQuestion.explanation}`;

    next_btn.style.display = "block";
}

function showScore() {
    resetState();
    question_element.innerHTML = `Your Score: ${score} out of ${shuffledQuestions.length}!`;
    next_btn.innerHTML = "Play Again";
    next_btn.style.display = "block";
}

function tanganiBtn() {
    currentQuestionIndex++;
    if (currentQuestionIndex < shuffledQuestions.length) {
        showQuestion();
    } else {
        questionNo = 1;
        showScore();
    }
}

next_btn.addEventListener("click", () => {
    if (currentQuestionIndex < shuffledQuestions.length) {
        tanganiBtn();
    } else {
        startQuiz();
    }
});


function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; 
    }
}

startQuiz();
