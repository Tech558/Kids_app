class Quiz {
    constructor(quizData) {
        this.quizData = quizData;
        this.currentQuestion = 0;
        this.score = 0;
        this.totalQuestions = quizData.questions.length;
    }

    showQuestion() {
        const question = this.quizData.questions[this.currentQuestion];
        document.querySelector('.question').textContent = question.question;
        const optionsHtml = question.options.map((opt, index) => `
            <div class="option">
                <label>
                    <input type="radio" name="answer" value="${index}">
                    ${opt}
                </label>
            </div>
        `).join('');
        document.querySelector('.options').innerHTML = optionsHtml;
        this.updateProgress();
    }

    updateProgress() {
        const progress = (this.currentQuestion / this.totalQuestions) * 100;
        document.querySelector('.progress').style.width = `${progress}%`;
    }

    showFeedback(isCorrect) {
        const feedback = document.querySelector('.feedback');
        feedback.textContent = isCorrect ? "Correct! 🎉" : "Try Again! 💪";
        feedback.className = `feedback ${isCorrect ? 'correct' : 'incorrect'}`;
        feedback.style.display = 'block';
    }

    showResults() {
        document.querySelector('.question-container').style.display = 'none';
        const results = document.querySelector('.results');
        const percentage = Math.round((this.score / this.totalQuestions) * 100);
        results.innerHTML = `
            <h2>Quiz Complete! 🎉</h2>
            <p>Total Questions: ${this.totalQuestions}</p>
            <p>Correct Answers: ${this.score}</p>
            <p>Your Score: ${percentage}%</p>
            <p>${percentage >= 80 ? 'Awesome Job! 🌟' : 'Keep Practicing! 👍'}</p>
        `;
        results.style.display = 'block';
    }
}

let quiz;

// Wait for the quiz data to load
document.addEventListener('DOMContentLoaded', () => {
    fetch('quiz-data.json')
        .then(response => response.json())
        .then(data => {
            quiz = new Quiz(data);
            quiz.showQuestion();
        })
        .catch(error => console.error('Error loading quiz data:', error));
});

function submitAnswer() {
    if (!quiz) return;
    
    const selected = document.querySelector('input[name="answer"]:checked');
    if (!selected) {
        alert('Please choose an answer!');
        return;
    }

    const answer = parseInt(selected.value);
    const isCorrect = answer === quiz.quizData.questions[quiz.currentQuestion].correct;
    
    quiz.showFeedback(isCorrect);
    if (isCorrect) quiz.score++;

    setTimeout(() => {
        quiz.currentQuestion++;
        if (quiz.currentQuestion < quiz.totalQuestions) {
            quiz.showQuestion();
        } else {
            quiz.showResults();
        }
    }, 1500);
}
