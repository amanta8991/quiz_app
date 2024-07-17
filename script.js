const questions = [
    {
        question: "Which of these video game consoles was released in 1994?",
        answers: [
            {text: "Atari 2600", correct: "false"},
            {text: "Xbox", correct: "false"},
            {text: "PlayStation", correct: "true"},
            {text: "Nintendo Entertainment System", correct: "false"}
        ]
    },
    {
        question: "Which of these was the world's first business computer?",
        answers: [
            {text: "LEO", correct: "true"},
            {text: "Apple II", correct: "false"},
            {text: "IBM 1401", correct: "false"},
            {text: "HP-85", correct: "false"}
        ]
    },
    {
        question: "What type of electromagnetic waves does Wi-Fi use?",
        answers: [
            {text: "Infrared waves", correct: "false"},
            {text: "Gamma rays", correct: "false"},
            {text: "Microwaves", correct: "false"},
            {text: "Radio waves", correct: "true"}
        ]
    },
    {
        question: "What device converts digital signals to analog signals?",
        answers: [
            {text: "Transistor", correct: "false"},
            {text: "Modem", correct: "true"},
            {text: "Central processing unit (CPU)", correct: "false"},
            {text: "Motherboard", correct: "false"}
        ]
    },
    {
        question: "Who coined the term artificial intelligence ?",
        answers: [
            {text: "John McCarthy", correct: "true"},
            {text: "Donald Ervin Knuth", correct: "false"},
            {text: "Charles Bachman", correct: "false"},
            {text: "Herbert A. Simon", correct: "false"}
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}



function showQuestion(){
    resetState()
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer =>{
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer)    
    })
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++
    }
    else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    })
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `Your score is ${score} out of ${questions.length}!`;
    nextButton. innerHTML = "Try Again";
    nextButton.style.display = "block";
    if(score == questions.length){
        questionElement.innerHTML = `Congratulations for successfully completing the Quiz!`;
        nextButton. innerHTML = "Play Again";
        nextButton.style.display = "block";
    }
}

function handleNextBtn(){
    currentQuestionIndex++
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextBtn();
    }
    else{
        startQuiz();
    }
})

startQuiz();