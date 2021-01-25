const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: 'What is the highest honour a Canadian can receive?',
        choice1: 'The Canadian Crown',
        choice2: 'The Order of Peace',
        choice3: 'The Victoria Cross',
        choice4: 'The Canadian Crown',
        answer: 3,
    },
    {
        question:"Of the following, what is a non-Canadian NOT allowed to do",
        choice1: "Own a farm or a house",
        choice2: "Vote in federal and provincials elections",
        choice3: "Get health insurance",
        choice4: "Get Higher Education",
        answer: 2,
    },
    {
        question: "Which animal is the national symbol of Canada",
        choice1: "Cougar",
        choice2: "Beaver",
        choice3: "Bear",
        choice4: "Deer",
        answer: 2,
    },
    {
        question: "What did the Suffrage Moment achieve ",
        choice1: "Women obtained the right to vote.",
        choice2: "Employment insurance was established.",
        choice3: "Slavery was abolished Canada.",
        choice4: "Quebec experienced an era of rapid change.",
        answer: 1,
    },

    {
        question: "Under Canadian law, why is every person presumed to be innocent until proven guilty?",
        choice1: "To establish that no person or group is above the law.",
        choice2: "To provide freedom of thought, belief, opinion, and expression.",
        choice3: "To ensure that men and women are equal under the law.",
        choice4: "To ensure that men and women are equal under the law.",
        answer: 4,
    },

    {
        question: "What is Canada's system of governance?",
        choice1: "Police state, parliamentary democracy, and constitutional monarchy",
        choice2: "Federal state, provincial state, and constitutional monarchy",
        choice3: "Federal state, parliamentary democracy, and constitutional monarchy",
        choice4: "Federal state, parliamentary democracy, and dictatorship",
        answer: 3,
    },

    {
        question: "What is the primary role of the police in Canada?",
        choice1: "Police state, parliamentary democracy, and constitutional monarchy",
        choice2: "To keep people safe and to enforce the law",
        choice3: "To provide national security intelligence to the government",
        choice4: "To resolve disputes and interpret law",
        answer: 2,
    }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 6

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()