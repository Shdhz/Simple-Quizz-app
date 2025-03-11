import { QUESTION } from "./soal.js";

const question_element = document.getElementById("question");
const answer_btn = document.getElementById("answer-button");
const next_btn = document.getElementById("next-btn");
const explanation_element = document.getElementById("explanation"); // Tambahkan elemen untuk penjelasan

let currentQuestionIndex = 0;
let questionNo = 1;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    next_btn.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = QUESTION[currentQuestionIndex];
    question_element.innerHTML = questionNo++ + ". " + currentQuestion.question;

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
    explanation_element.innerHTML = ""; // Hapus penjelasan sebelumnya
    while (answer_btn.firstChild) {
        answer_btn.removeChild(answer_btn.firstChild);
    }
}

function selectAnswer(e) {
    const selected_btn = e.target;
    const benar = selected_btn.dataset.correct === "true";
    let currentQuestion = QUESTION[currentQuestionIndex];

    if (benar) {
        selected_btn.classList.add("benar");
        score++;
    } else {
        selected_btn.classList.add("salah");
    }

    // Tampilkan semua jawaban yang benar
    Array.from(answer_btn.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("benar");
        }
        button.disabled = true;
    });

    // Tampilkan penjelasan
    explanation_element.innerHTML = `<strong>Penjelasan:</strong> ${currentQuestion.explanation}`;

    next_btn.style.display = "block";
}

function showScore() {
    resetState();
    question_element.innerHTML = `Your Score: ${score} out of ${QUESTION.length}!`;
    next_btn.innerHTML = "Play Again";
    next_btn.style.display = "block";
}

function tanganiBtn() {
    currentQuestionIndex++;
    if (currentQuestionIndex < QUESTION.length) {
        showQuestion();
    } else {
        questionNo = 1;
        showScore();
    }
}

next_btn.addEventListener("click", () => {
    if (currentQuestionIndex < QUESTION.length) {
        tanganiBtn();
    } else {
        startQuiz();
    }
});

startQuiz();
