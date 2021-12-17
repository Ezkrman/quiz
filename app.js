const startButtonContainer = document.querySelector('.start-button-container')
const startButton = document.querySelector('.start-button')
const infoBox = document.querySelector('.info-box')
const quitButton = document.querySelector('.quit')
const continueButton = document.querySelector('.continue')
const questionBox = document.querySelector('.question-box')
const numberOfSeconds = document.querySelector('.timer')
const nextButton = document.querySelector('.next-question')
const questionPrompt = document.querySelector('.question-content')
const optionsContainer = document.querySelector('.options-container')
const questionCounterContainer = document.querySelector('.first')
const questionNumberContainer = document.querySelector('.question-number')
const timeLine = document.querySelector('.time-line')
const finalBox = document.querySelector('.results-container')
const replayButton = document.querySelector('.replay')
const exitButton = document.querySelector('.exit')
const score = document.querySelector('.score')
let questionCounter = 1;
let questionNumber = 1;
let isButtonClicked = false
let correctAnswersCounter = 0;
let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', () => {
    infoBox.classList.remove('hide')
    startButtonContainer.classList.add('hide')
})

quitButton.addEventListener('click', () => {
    infoBox.classList.add('hide')
    startButtonContainer.classList.remove('hide')
})

continueButton.addEventListener('click', () => {
    infoBox.classList.add('hide')
    startQuiz()
})

function startQuiz() {
    infoBox.classList.add('hide')
    questionBox.classList.remove('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    resetOptions()
    showQuestion(shuffledQuestions[currentQuestionIndex])
    startTimer()
    startTimeLine()
}

function showQuestion(receivedQuestion) {
    questionPrompt.innerText = receivedQuestion.question
    receivedQuestion.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('option')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', () => {
            showNextButton()
            isButtonClicked = true;
            currentQuestionIndex++
            const correctAnswer = document.querySelector('[data-correct="true"]')
            if (button.dataset.correct) {
                button.classList.add('correct')
                correctAnswersCounter++
            } else {
                correctAnswer.classList.add('correct')
                button.classList.add('wrong')
            }
        })
        optionsContainer.appendChild(button)
    })
}

function resetOptions() {
    nextButton.classList.add('hide')
    while (optionsContainer.firstChild) {
        optionsContainer.removeChild(optionsContainer.firstChild)
    }
}

function startTimer() {
    let secondsInTimer = 15
    numberOfSeconds.innerText = String(Math.floor(secondsInTimer))
    setTimeout(() => {
        const descending = setInterval(() => {
            if (isButtonClicked) {
                clearInterval(descending)
                showNextButton()
                disableAllButtons()
                const correctAnswer = document.querySelector('[data-correct="true"]')
                correctAnswer.classList.add('correct')
            }
            if (Math.floor(secondsInTimer) == 0) {
                currentQuestionIndex++
                clearInterval(descending)
                showNextButton()
                disableAllButtons()
                const correctAnswer = document.querySelector('[data-correct="true"]')
                correctAnswer.classList.add('missed')
            }
            numberOfSeconds.innerText = String(Math.floor(secondsInTimer));
            secondsInTimer -= 0.01
        }, 10);
    }, 990);
}

function startTimeLine() {
    let timeLineValue = 0
    let colorHue = 130
    const growing = setInterval(() => {
        if (isButtonClicked || Math.floor(timeLineValue) == 100) {
            clearInterval(growing)
        }
        let timeLineWidth = `${timeLineValue}%`
        timeLine.style.width = timeLineWidth
        timeLineValue += 0.0666

    }, 10);
    const colorShift = setInterval(() => {
        if (isButtonClicked || Math.floor(timeLineValue) == 100) {
            clearInterval(colorShift)
        }
        timeLine.style.background = `hsl(${Math.floor(colorHue)}, 100%, 35%)`
        colorHue -= 0.07
    }, 10)
}

function resetTimeLine() {
    timeLine.style.width = '0%'
}

function disableAllButtons() {
    const allButtons = document.querySelectorAll('.option')
    allButtons.forEach(button => {
        button.classList.add('hover-disabled')
    })
}

nextButton.addEventListener('click', () => {
    if (questionCounter == 5) {
        questionBox.classList.add('hide')
        finalBox.classList.remove('hide')
        score.innerText = String(correctAnswersCounter)
    }
    else {
        isButtonClicked = false
        startTimer()
        resetOptions()
        showQuestion(shuffledQuestions[currentQuestionIndex])
        questionCounter++
        questionCounterContainer.innerText = String(questionCounter)
        questionNumber++
        questionNumberContainer.innerText = `${questionNumber}. `
        if (questionCounter == 5) {
            nextButton.innerText = 'Finish Quiz'
        }
        resetTimeLine()
        startTimeLine()
    }
})

function showNextButton() {
    nextButton.classList.remove('hide')
}



exitButton.addEventListener('click', () => {
    finalBox.classList.add('hide')
    questionCounter = 1
    questionCounterContainer.innerText = String(questionCounter)
    questionNumber = 1
    questionNumberContainer.innerText = `${questionNumber}. `
    isButtonClicked = false
    correctAnswersCounter = 0
    nextButton.innerText = 'Next question'
    startButtonContainer.classList.remove('hide')
})

replayButton.addEventListener('click', () => {
    finalBox.classList.add('hide')
    questionBox.classList.remove('hide')
    questionCounter = 1
    questionCounterContainer.innerText = String(questionCounter)
    questionNumber = 1
    questionNumberContainer.innerText = `${questionNumber}. `
    isButtonClicked = false
    correctAnswersCounter = 0
    nextButton.innerText = 'Next question'
    startQuiz()
})

const questions = [
    {
        question: 'What does HTML stand for?',
        answers: [
            { text: 'Hyper Text Preprocessor', correct: false },
            { text: 'Hyper Text Markup Language', correct: true },
            { text: 'Hyper Text Multiple Language', correct: false },
            { text: 'Hyper Tool Multi Language', correct: false }
        ]
    },
    {
        question: 'What does CSS stand for?',
        answers: [
            { text: 'Common Style Sheet', correct: false },
            { text: 'Colorful Style Sheet', correct: false },
            { text: 'Computer Style Sheet', correct: false },
            { text: 'Cascading Style Sheet', correct: true }
        ]
    },
    {
        question: 'What does PHP stand for?',
        answers: [
            { text: 'Hypertext Preprocessor', correct: true },
            { text: 'Hypertext Programming', correct: false },
            { text: 'Hypertext Preprogramming', correct: false },
            { text: 'Hometext Preprocessor', correct: false }
        ]
    },
    {
        question: 'What does SQL stand for?',
        answers: [
            { text: 'Stylish Question Language', correct: false },
            { text: 'Stylesheet Query Language', correct: false },
            { text: 'Statement Question Language', correct: false },
            { text: 'Structured Query Language', correct: true }
        ]
    },
    {
        question: 'What does XML stand for?',
        answers: [
            { text: 'eXtensible Markup Language', correct: true },
            { text: 'eXecutable Multiple Language', correct: false },
            { text: 'eXtra Multi-Program Language', correct: false },
            { text: 'eXamine Multiple Language', correct: false }
        ]
    }
]