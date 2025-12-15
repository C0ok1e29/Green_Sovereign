// ===================== Quiz Data =====================
const questions = [
    {
        question: "What does the Smart Suggestions feature mainly help visitors with?",
        options: [
            { text: "Choosing the best picnic spots", value: "A" },
            { text: "Finding nearby shopping malls", value: "B" },
            { text: "Recommending eco-friendly routes and activities", value: "C" },
            { text: "Suggesting fast food restaurants", value: "D" }
        ],
        answer: "C",
    },
    {
        question: "Which of the following is the most eco-friendly way to travel inside the park?",
        options: [
            { text: "Gas-powered car", value: "A" },
            { text: "Motorbike", value: "B" },
            { text: "Bicycle or walking", value: "C" },
            { text: "Private helicopter", value: "D" }
        ],
        answer: "C",
    },
    {
        question: "What should visitors do with recyclable waste in the park?",
        options: [
            { text: "Leave it on the ground", value: "A" },
            { text: "Throw it into any bin", value: "B" },
            { text: "Take it home only", value: "C" },
            { text: "Use the park's labeled recycle bins", value: "D" }
        ],
        answer: "D",
    },
    {
        question: "How does the park's smart system reduce energy consumption?",
        options: [
            { text: "By keeping all lights on at all times", value: "A" },
            { text: "By adjusting lighting based on time and movement", value: "B" },
            { text: "By using regular bulbs", value: "C" },
            { text: "By turning off lights only during weekends", value: "D" }
        ],
        answer: "B",
    },
    {
        question: "What type of water systems are commonly used in eco-friendly parks?",
        options: [
            { text: "Water waste systems", value: "A" },
            { text: "Artificial chemical streams", value: "B" },
            { text: "Rainwater harvesting systems", value: "C" },
            { text: "Unlimited water pumps", value: "D" }
        ],
        answer: "C",
    },
    {
        question: "What is the primary benefit of using solar-powered lighting in parks?",
        options: [
            { text: "It makes lights brighter", value: "A" },
            { text: "Reduces dependency on fossil fuels", value: "B" },
            { text: "Makes lights colorful", value: "C" },
            { text: "Increases monthly electricity bills", value: "D" }
        ],
        answer: "B",
    },
    {
        question: "What does the website's Smart Suggestions tool consider when recommending walking routes?",
        options: [
            { text: "Visitor's shopping history", value: "A" },
            { text: "Weather, crowd density, and trail difficulty", value: "B" },
            { text: "Favorite TV shows", value: "C" },
            { text: "The visitor's social media likes", value: "D" }
        ],
        answer: "B",
    },
    {
        question: "Which activity is most environmentally friendly inside the park?",
        options: [
            { text: "Feeding wildlife", value: "A" },
            { text: "Leaving food scraps", value: "B" },
            { text: "Participating in guided nature walks", value: "C" },
            { text: "Playing loud music", value: "D" }
        ],
        answer: "C",
    },
    {
        question: "What is the best way to conserve water while using park facilities?",
        options: [
            { text: "Keeping taps running", value: "A" },
            { text: "Using refillable water bottles", value: "B" },
            { text: "Washing bikes in the park", value: "C" },
            { text: "Filling large buckets from public fountains", value: "D" }
        ],
        answer: "B",
    },
    {
        question: "Why does the park encourage digital maps instead of printed maps?",
        options: [
            { text: "They reduce paper waste", value: "A" },
            { text: "They look cooler", value: "B" },
            { text: "They cost more money", value: "C" },
            { text: "They are harder to use", value: "D" }
        ],
        answer: "A",
    }
];

// ===================== Variables =====================
let currentIndex = 0;
let userAnswers = new Array(questions.length).fill(null);

// ===================== Load Quiz =====================
function loadQuiz() {
    const container = document.getElementById("quizContainer");
    container.innerHTML = "";

    for (let i = 0; i < questions.length; i++) {
        const q = questions[i];
        const card = document.createElement("div");
        card.className = "card";
        card.id = `card${i}`;
        card.innerHTML = `
            <h3>${i + 1}. ${q.question}</h3>
            <div class="options">
                ${q.options.map(opt => `
                    <label class="option" onclick="selectAnswer(${i}, '${opt.value}')">
                        <input type="radio" name="q${i}" value="${opt.value}">
                        ${opt.text}
                    </label>
                `).join('')}
            </div>
        `;
        container.appendChild(card);
    }

    showCard(currentIndex);
    updateProgress();
}

// ===================== Show Card =====================
function showCard(index) {
    const cards = document.querySelectorAll(".card");
    for (let i = 0; i < cards.length; i++) {
        cards[i].classList.toggle("active", i === index);
    }
    document.getElementById("prevBtn").style.display = index === 0 ? "none" : "inline-block";
    document.getElementById("nextBtn").style.display = index === questions.length - 1 ? "none" : "inline-block";
    document.getElementById("submitBtn").style.display = index === questions.length - 1 ? "inline-block" : "none";
}

// ===================== Select Answer =====================
function selectAnswer(qIndex, value) {
    userAnswers[qIndex] = value;
    const options = document.querySelectorAll(`#card${qIndex} .option`);
    for (let opt of options) {
        opt.classList.remove("selected");
    }
    document.querySelector(`#card${qIndex} input[value="${value}"]`).parentElement.classList.add("selected");
}

// ===================== Navigation =====================
function nextCard() {
    if (!userAnswers[currentIndex]) {
        alert("Please select an answer!");
        return;
    }
    currentIndex++;
    showCard(currentIndex);
    updateProgress();
}

function prevCard() {
    currentIndex--;
    showCard(currentIndex);
    updateProgress();
}

// ===================== Progress =====================
function updateProgress() {
    const progressPercent = ((currentIndex + 1) / questions.length) * 100;
    document.getElementById("progressBar").style.width = `${progressPercent}%`;
}

// ===================== Submit Quiz =====================
function submitQuiz() {
    let finalScore = 0;
    for (let i = 0; i < questions.length; i++) {
        if (userAnswers[i] === questions[i].answer) {
            finalScore++;
        }
    }
    document.getElementById("finalScore").textContent = `${finalScore}/${questions.length}`;

    let message;
    if (finalScore === questions.length) {
        message = "Perfect! You're an eco-expert!";
    } else if (finalScore >= questions.length * 0.7) {
        message = "Great job! You know a lot about sustainable parks!";
    } else if (finalScore >= questions.length * 0.5) {
        message = "Good effort! You have some eco-knowledge!";
    } else {
        message = "Keep learning! Every bit of eco-knowledge helps!";
    }

    document.getElementById("scoreMessage").textContent = message;

    // Hide quiz, show results
    document.getElementById("quizContainer").style.display = "none";
    document.querySelector(".buttons").style.display = "none";
    document.querySelector(".progress-container").style.display = "none";
    document.querySelector(".progress-text").style.display = "none";
    document.getElementById("results").style.display = "block";

    // Show Canva after quiz completion
    document.getElementById("canvaContainer").style.display = "block";
}

// ===================== Restart Quiz =====================
function restartQuiz() {
    currentIndex = 0;
    userAnswers.fill(null);
    const options = document.querySelectorAll(".option");
    for (let opt of options) {
        opt.classList.remove("selected");
    }
    document.getElementById("quizContainer").style.display = "block";
    document.querySelector(".buttons").style.display = "flex";
    document.querySelector(".progress-container").style.display = "block";
    document.querySelector(".progress-text").style.display = "flex";
    document.getElementById("results").style.display = "none";
    document.getElementById("canvaContainer").style.display = "none";
    showCard(currentIndex);
    updateProgress();
}

// ===================== Initialize =====================
document.addEventListener("DOMContentLoaded", () => {
    loadQuiz();
});

// ===================== New Timer Variables =====================
// Add these with your other variables at the top
let timerInterval;
const timeLimit = 300; // 5 minutes in seconds
let timeLeft = timeLimit;


// ===================== New Timer Functions =====================
// Add these new functions to your file

function startTimer() {
    // Clear any existing timer just in case
    stopTimer();
    timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
    timeLeft--;

    // Calculate minutes and seconds
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    // Format the display with leading zeros
    const display = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    
    // Update the HTML element with the new time
    const timerElement = document.getElementById("timerDisplay");
    if (timerElement) {
        timerElement.textContent = display;
    }

    // If time is up, submit the quiz automatically
    if (timeLeft <= 0) {
        stopTimer();
        alert("Time's up! Submitting your quiz now.");
        submitQuiz();
    }
}

function stopTimer() {
    clearInterval(timerInterval);
}

function resetTimer() {
    stopTimer();
    timeLeft = timeLimit;
    const timerElement = document.getElementById("timerDisplay");
    if (timerElement) {
        timerElement.textContent = `${String(Math.floor(timeLimit / 60)).padStart(2, '0')}:${String(timeLimit % 60).padStart(2, '0')}`;
    }
}


// ===================== MODIFIED Existing Functions =====================
// Replace your existing functions with these modified versions

// --- MODIFIED: Initialize ---
document.addEventListener("DOMContentLoaded", () => {
    loadQuiz();
    resetTimer(); // Set the timer to 05:00
    startTimer(); // Start the countdown
});

// --- MODIFIED: Submit Quiz ---
function submitQuiz() {
    stopTimer(); // Stop the timer immediately when submitted

    let finalScore = 0;
    for (let i = 0; i < questions.length; i++) {
        if (userAnswers[i] === questions[i].answer) {
            finalScore++;
        }
    }
    document.getElementById("finalScore").textContent = `${finalScore}/${questions.length}`;

    let message;
    if (finalScore === questions.length) {
        message = "Perfect! You're an eco-expert!";
    } else if (finalScore >= questions.length * 0.7) {
        message = "Great job! You know a lot about sustainable parks!";
    } else if (finalScore >= questions.length * 0.5) {
        message = "Good effort! You have some eco-knowledge!";
    } else {
        message = "Keep learning! Every bit of eco-knowledge helps!";
    }

    document.getElementById("scoreMessage").textContent = message;

    // Hide quiz, show results
    document.getElementById("quizContainer").style.display = "none";
    document.querySelector(".buttons").style.display = "none";
    document.querySelector(".progress-container").style.display = "none";
    document.querySelector(".progress-text").style.display = "none";
    document.getElementById("results").style.display = "block";
    document.getElementById("canvaContainer").style.display = "block";
}

// --- MODIFIED: Restart Quiz ---
function restartQuiz() {
    currentIndex = 0;
    userAnswers.fill(null);
    const options = document.querySelectorAll(".option");
    for (let opt of options) {
        opt.classList.remove("selected");
    }
    document.getElementById("quizContainer").style.display = "block";
    document.querySelector(".buttons").style.display = "flex";
    document.querySelector(".progress-container").style.display = "block";
    document.querySelector(".progress-text").style.display = "flex";
    document.getElementById("results").style.display = "none";
    document.getElementById("canvaContainer").style.display = "none";
    showCard(currentIndex);
    updateProgress();
    
    // Reset and start the timer for the new quiz attempt
    resetTimer();
    startTimer();
}