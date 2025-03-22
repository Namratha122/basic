let questions = [
    { 
        question: "What does HTML stand for?", 
        answer: "HyperText Markup Language", 
        qr: "qr-codes/html.png"
    },
    { 
        question: "Who is the founder of Microsoft?", 
        answer: "Bill Gates", 
        qr: "qr-codes/microsoft.png"
    },
    { 
        question: "Which planet is known as the Red Planet?", 
        answer: "Mars", 
        qr: "qr-codes/mars.png"
    }
];

let currentQuestion = 0;
let lives = 3;
let startTime = new Date();

document.addEventListener("DOMContentLoaded", loadQuestion);

function loadQuestion() {
    if (currentQuestion >= questions.length) {
        let timeTaken = Math.round((new Date() - startTime) / 1000);
        let name = prompt("Congratulations! Enter your name for the leaderboard:");
        let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
        leaderboard.push({ name, time: timeTaken });
        localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
        window.location.href = "leaderboard.html";
        return;
    }

    document.getElementById("question-number").textContent = currentQuestion + 1;
    document.getElementById("question-text").textContent = questions[currentQuestion].question;
    document.getElementById("answer").value = "";
    document.getElementById("qr-code").src = questions[currentQuestion].qr;
}

function checkAnswer() {
    let userAnswer = document.getElementById("answer").value.trim();
    
    if (userAnswer.toLowerCase() === questions[currentQuestion].answer.toLowerCase()) {
        alert("✅ Correct! Moving to the next question.");
        currentQuestion++;
        loadQuestion();
    } else {
        lives--;
        document.getElementById("lives").textContent = lives;
        alert("❌ Wrong Answer! You lost a life.");

        if (lives === 0) {
            alert("💀 Game Over! Try Again.");
            window.location.href = "index.html";
        }
    }
}

function showHint() {
    document.getElementById("qr-code").style.display = "block";
}
