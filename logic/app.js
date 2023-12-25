const QUESTION = [
    {
        question: "The judge had _____ in allowing the lawsuit to proceed.",
        answer: [
            {text: "astrayed", correct: false},
            {text: "erred", correct: true},
            {text: "biased", correct: false},
            {text: "drifted", correct: false}
        ]
    },
    {
        question: "The bathroom floor is all wet. Who ______ a shower?",
            answer: [
                {text: "had", correct: false},
                {text: "has been having", correct: true},
                {text: "had had", correct: false},
                {text: "had been having", correct: false}
            ]
    },
    {
        question: "If you _____ mind waiting, I'll call and check if Mr Owen is in.",
        answer: [
            {text: "wouldn't", correct: true},
            {text: "do", correct: false},
            {text: "will", correct: false},
            {text: "could", correct: false}
        ]
    },
    {
        question: "______ the people I interviewed, one in ten said they had already lied to someone that day.",
        answer: [
            {text: "around", correct: false},
            {text: "between", correct: false},
            {text: "among", correct: true},
            {text: "along", correct: false}
        ]
    },
];


const question_element = document.getElementById("question");
const answer_btn = document.getElementById("answer-button");
const next_btn = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let questionNo =  1;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    next_btn.innerHTML = "Next"
    showQuestion();

}
function showQuestion(){
    resetState();
    let currentQuestion = QUESTION[currentQuestionIndex];
    question_element.innerHTML = questionNo++ +". " + currentQuestion.question;

    currentQuestion.answer.forEach(answer =>{
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answer_btn.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer)
    });
}
function resetState(){
    next_btn.style.display = "none";
    while (answer_btn.firstChild) {
        answer_btn.removeChild(answer_btn.firstChild);
    }
}
function selectAnswer(e){
    const selected_btn = e.target;
    const benar = selected_btn.dataset.correct === "true";
    if (benar) {
        selected_btn.classList.add("benar");
        score++;
    }else{
        selected_btn.classList.add("salah");
    }
    Array.from(answer_btn.children).forEach(button =>{
        if (button.dataset.correct === "true") {
            button.classList.add("benar");
        }
        button.disabled = true;
    });
    next_btn.style.display = "block";
}
function showScore(){
    resetState();
    question_element.innerHTML = `Your Score ${score} out of ${QUESTION.length}!`;
    next_btn.innerHTML = "Play Again";
    next_btn.style.display = "block";
}

function tanganiBtn(){
    currentQuestionIndex++;
    if (currentQuestionIndex < QUESTION.length) {
        showQuestion();
    }else{
        questionNo = 1;
        showScore();
    }
}
next_btn.addEventListener("click", ()=>{
    if (currentQuestionIndex < QUESTION.length) {
        tanganiBtn();
    }else{
        startQuiz();
    }
});
startQuiz();