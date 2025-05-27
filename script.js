let currentQuestion = 0;
let quizData = [];

fetch('quiz-data.json')
  .then(response => response.json())
  .then(data => {
    quizData = data;
    loadQuestion();
  });

function loadQuestion() {
  const container = document.getElementById('quiz-container');
  container.innerHTML = ''; // Clear previous question

  if (currentQuestion >= quizData.length) {
    container.innerHTML = `<h2>🎉 You finished the quiz! 🎉</h2>`;
    return;
  }

  const qData = quizData[currentQuestion];

  const questionDiv = document.createElement('div');
  questionDiv.className = 'question-block';

  questionDiv.innerHTML = `
    <div class="question"><strong>Q${currentQuestion + 1}:</strong> ${qData.question}</div>
    <div class="options">
      ${qData.options.map((opt, i) => `
        <label>
          <input type="radio" name="option" value="${opt}">
          ${opt}
        </label>
      `).join('')}
    </div>
    <button onclick="submitAnswer()">Submit</button>
  `;

  container.appendChild(questionDiv);
}

function submitAnswer() {
  const selected = document.querySelector('input[name="option"]:checked');
  if (!selected) {
    alert('Please choose an option!');
    return;
  }

  // Optionally check correctness here if needed
  currentQuestion++;
  loadQuestion();
  startReminder();
}

// Reminder system: prompts user every 10 seconds if no action
let reminderTimeout;
function startReminder() {
  clearTimeout(reminderTimeout);
  reminderTimeout = setTimeout(() => {
    alert('⏰ Time for the next question!');
  }, 10000);
}
