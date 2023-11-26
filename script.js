const container = document.querySelector('.container');
const questionBox = document.querySelector('.question');
const choicesBox = document.querySelector('.choices');
const nextBtn = document.querySelector('.nextBtn');
const scoreCard = document.querySelector('.scoreCard');
const alert = document.querySelector('.alert');
const startBtn = document.querySelector('.startBtn');
const timer = document.querySelector('.timer');


//Make an array of objects that stores question, choices of question and answer

const quiz = [{
        question: "Q. Which type of JavaScript language is ___?",
        choices: ["Object-Oriented",
            "Object-Based",
            "Assembly-language",
            "High-level"
        ],
        answer: "Object-Based"
    },
    {
        question: "Q. Which one of the following also known as Conditional Expression:?",
        choices: [
            "Alternative to if-else",
            "Switch statement",
            "If-then-else statement",
            "immediate if"
        ],
        answer: "immediate if"
    },
    {
        question: "Q. In JavaScript, what is a block of statement?",
        choices: [
            "Conditional block",
            "block that combines a number of statements into a single compound statement",
            "both conditional block and a single statement",
            "block that contains a single statement"
        ],
        answer: "block that combines a number of statements into a single compound statement"
    },
    {
        question: "Q. When interpreter encounters an empty statements, what it will do:",
        choices: [
            "Shows a warning",
            "Prompts to complete the statement",
            "Throws an error",
            "Ignores the statements"
        ],
        answer: "Ignores the statements"
    },
    {
        question: "Q. What is JavaScript?",
        choices: [
            "JavaScript is a scripting language used to make the website interactive",
            "JavaScript is an assembly language used to make the website interactive",
            "avaScript is a compiled language used to make the website interactive",
            "None of the mentioned"
        ],
        answer: "JavaScript is a scripting language used to make the website interactive."
    },
    {
        question: "Q. Which of the following is correct about JavaScript?",
        choices: [
            "JavaScript is an Object-Based language",
            "JavaScript is Assembly-language",
            "JavaScript is an Object-Oriented language",
            "JavaScript is a High-level language"
        ],
        answer: "JavaScript is an Object-Based language"
    },
    {
        question: "Q. When interpreter encounters an empty statements, what it will do:",
        choices: [
            "Shows a warning",
            "Prompts to complete the statement",
            "Throws an error",
            "Ignores the statements"
        ],
        answer: "Ignores the statements"
    },
    {
        question: "Q. Arrays in JavaScript are defined by which of the following statements?",
        choices: [
            "It is an ordered list of values",
            "It is an ordered list of objects",
            "It is an ordered list of stringr",
            " It is an ordered list of functions"

        ],
        answer: "It is an ordered list of values"
    },
    {
        question: "Q. Where is Client-side JavaScript code is embedded within HTML documents?",
        choices: [
            "A URL that uses the special javascript:code",
            "A URL that uses the special javascript:protocol",
            " A URL that uses the special javascript:encoding",
            "A URL that uses the special javascript:stack"
        ],
        answer: "A URL that uses the special javascript:protocol"
    },
    {
        question: "Q. Arrays in JavaScript are defined by which of the following statements?",
        choices: [
            " It is an ordered list of values",
            "It is an ordered list of objects",
            "It is an ordered list of string",
            " It is an ordered list of functions"
        ],
        answer: " It is an ordered list of values."
    }
];

//Making Variable
let currentQuestionsIndex = 0;
let score = 0;
let quizOver = false;
let timeLeft = 15;
let timerID = null;

//Arrow Function to show Questions
const showQuestions = () => {
    const questionDeatails = quiz[currentQuestionsIndex];
    questionBox.textContent = questionDeatails.question;


    choicesBox.textContent = "";
    for (let i = 0; i < questionDeatails.choices.length; i++) {
        const currentChoice = questionDeatails.choices[i];
        const choiceDiv = document.createElement('div');
        choiceDiv.textContent = currentChoice;
        choiceDiv.classList.add('choice');
        choicesBox.appendChild(choiceDiv);

        choiceDiv.addEventListener('click', () => {
            if (choiceDiv.classList.contains('selected')) {
                choiceDiv.classList.remove('selected');
            } else {
                choiceDiv.classList.add('selected');
            }
        });
    }
    if (currentQuestionsIndex < quiz.length) {
        startTimer();
    }
}

//Function to check answer
const checkAnswer = () => {
    const selectedChoice = document.querySelector('.choice.selected');
    if (selectedChoice.textContent === quiz[currentQuestionsIndex].answer) {
        //alert("Correct Answer!");
        displayAlert("Correct Answer");
        score++;
    } else {
        //alert("Wrong Answer!");
        displayAlert(`Wrong Answer! ${quiz[currentQuestionsIndex].answer} is the Correct Answer`);
    }
    timeLeft = 15;
    currentQuestionsIndex++;
    if (currentQuestionsIndex < quiz.length) {
        showQuestions();
    } else {
        stopTimer();
        showScore();
    }
}

//Function to show score 
const showScore = () => {
    questionBox.textContent = "";
    choicesBox.textContent = "";
    scoreCard.textContent = `You Scored ${score} out of ${quiz.lenght}!`;
    displayAlert("You have completed this quiz!");
    nextBtn.textContent = "Play Again";
    quizOver = true;
    timer.style.display = "none";
}

//Function to show alert
const displayAlert = (msg) => {
    alert.style.display = "block";
    alert.textContent = msg;
    setTimeout(() => {
        alert.style.display = "none";
    }, 2000);

}

//Function to Start Timer 
const startTimer = () => {
        clearInterval(timerID); // check  for any exist timers
        timer.textContent = timeLeft;

        const countDown = () => {
            timeLeft--;
            timer.textContent = timeLeft;
            if (timeLeft === 0) {
                const confirmUser = confirm("Timer Up!!! Do You want to play the quiz again");
                if (confirmUser) {
                    timeLeft = 15;
                    startQuiz();
                } else {
                    startBtn.style.display = "block";
                    container.style.display = "none";
                    return;
                }
            }
        }
        timerID = setInterval(countDown, 1000);
    }
    //Function to stop Timer 
const stopTimer = () => {
    clearInterval(timerID);
}

// Function to shuffle question
const shuffleQuestions = () => {
    for (let i = quiz.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [quiz[i], quiz[j]] = [quiz[j], quiz[i]];
    }
    currentQuestionsIndex = 0;
    showQuestions();
}

//Function to start Quiz
const startQuiz = () => {
    timeLeft = 15;
    timer.style.display = "flex";
    shuffleQuestions();
}

//Adding Event Listener to start Button
startBtn.addEventListener('click', () => {
    startBtn.style.display = "none";
    container.style.display = "block";
    startQuiz();
});

nextBtn.addEventListener('click', () => {
    const selectedChoice = document.querySelector('.choice.selected');
    if (!selectedChoice && nextBtn.textContent === "Next") {
        //alert("Select your answer");
        displayAlert("Selected your answer");
        return;
    }
    if (quizOver) {
        nextBtn.textContent = "Next";
        scoreCard.textContent = "";
        currentQuestionsIndex = 0;
        quizOver = false;
        score = 0;
        startQuiz();
    } else {
        checkAnswer();
    }
});