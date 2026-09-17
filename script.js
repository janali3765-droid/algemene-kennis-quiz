const questions = [
  ['Welke planeet staat het dichtst bij de zon?', ['Venus', 'Mercurius', 'Mars', 'Jupiter'], 1],
  ['Hoeveel seconden zitten er in een uur?', ['1200', '2400', '3600', '7200'], 2],
  ['Welk land heeft de meeste inwoners ter wereld?', ['India', 'Verenigde Staten', 'China', 'Brazilië'], 0],
  ['Wat is de hoofdstad van Japan?', ['Kyoto', 'Tokio', 'Osaka', 'Sapporo'], 1],
  ['Welke kleur krijg je als je blauw en geel mengt?', ['Groen', 'Paars', 'Oranje', 'Rood'], 0],
  ['Welke van deze dieren is een amfibie?', ['Krokodil', 'Kikker', 'Pinguïn', 'Hond'], 1],
  ['Wie schreef Romeo en Julia?', ['Charles Dickens', 'William Shakespeare', 'Leo Tolstoj', 'Jane Austen'], 1],
  ['Hoeveel dagen heeft een normaal jaar?', ['364', '365', '366', '367'], 1],
  ['Welke oceaan is het grootst?', ['Atlantische Oceaan', 'Indische Oceaan', 'Grote Oceaan', 'Noordelijke IJszee'], 2],
  ['Wat is het chemische symbool voor goud?', ['Go', 'Gd', 'Au', 'Ag'], 2],
  ['Welke taal wordt door de meeste mensen als moedertaal gesproken?', ['Spaans', 'Mandarijn', 'Engels', 'Arabisch'], 1],
  ['Wie was de eerste mens op de maan?', ['Buzz Aldrin', 'Neil Armstrong', 'Yuri Gagarin', 'John Glenn'], 1],
  ['Welke kleur heeft de hemel meestal overdag?', ['Rood', 'Blauw', 'Groen', 'Zwart'], 1],
  ['Wat is de grootste woestijn op aarde?', ['Gobi', 'Sahara', 'Mojave', 'Antarctica'], 3],
  ['Welk land ligt in Europa?', ['Egypte', 'Canada', 'Italië', 'Japan'], 2],
  ['Hoeveel letters heeft het Nederlandse alfabet?', ['25', '26', '27', '28'], 1],
  ['Welke naam heeft de maan van de aarde?', ['Titan', 'Europa', 'Phobos', 'Luna'], 3],
  ['Wat is de snelste vogel ter wereld?', ['Adelaar', 'Peregrijn', 'Arend', 'Zwaan'], 1],
  ['Wat is 12 x 8?', ['80', '96', '84', '108'], 1],
  ['Welk apparaat wordt gebruikt om te bellen?', ['Televisie', 'Radio', 'Telefoon', 'Printer'], 2],
];

const questionContainer = document.getElementById('questions');
const form = document.getElementById('quiz-form');
const progress = document.getElementById('progress');
const scoreLabel = document.getElementById('score');
const message = document.getElementById('message');

questionContainer.innerHTML = questions.map(([question, options], index) => `
  <article class="question">
    <h2>${index + 1}. ${question}</h2>
    <div class="options">
      ${options.map((option, optionIndex) => `
        <label class="option">
          <input type="radio" name="question-${index}" value="${optionIndex}">
          <span>${option}</span>
        </label>
      `).join('')}
    </div>
  </article>
`).join('');

function getAnswers() {
  return questions.map(([, options], index) => {
    const selected = document.querySelector(`input[name="question-${index}"]:checked`);
    return selected ? { index, selected: Number(selected.value), answer: options[Number(selected.value)] } : null;
  });
}

function updateStatus() {
  const answers = getAnswers();
  const answered = answers.filter(Boolean).length;
  const currentScore = answers.reduce((total, answer) => total + (answer && answer.selected === questions[answer.index][2] ? 1 : 0), 0);
  progress.textContent = `${answered} / ${questions.length} beantwoord`;
  scoreLabel.textContent = `Score: ${currentScore}`;
}

questionContainer.addEventListener('change', updateStatus);

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const answers = getAnswers();

  if (answers.some((answer) => !answer)) {
    message.textContent = 'Beantwoord eerst alle 20 vragen.';
    message.className = 'message error';
    return;
  }

  const score = answers.reduce((total, answer) => total + (answer.selected === questions[answer.index][2] ? 1 : 0), 0);
  const details = answers.map((answer, index) => ({
    question: questions[index][0],
    answer: answer.answer,
    correctAnswer: questions[index][1][questions[index][2]],
    correct: answer.selected === questions[index][2],
  }));

  sessionStorage.setItem('quizResult', JSON.stringify({ score, total: questions.length, details }));
  window.location.href = 'bedankt.html';
});

updateStatus();
