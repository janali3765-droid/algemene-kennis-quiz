const questions = [
  {
    id: 1,
    question: 'Welke planeet staat het dichtst bij de zon?',
    options: ['Venus', 'Mercurius', 'Mars', 'Jupiter'],
    correct: 1,
  },
  {
    id: 2,
    question: 'Hoeveel seconden zitten er in een uur?',
    options: ['1200', '2400', '3600', '7200'],
    correct: 2,
  },
  {
    id: 3,
    question: 'Welk land heeft de meeste inwoners ter wereld?',
    options: ['India', 'Verenigde Staten', 'China', 'Brazilië'],
    correct: 0,
  },
  {
    id: 4,
    question: 'Wat is de hoofdstad van Japan?',
    options: ['Kyoto', 'Tokio', 'Osaka', 'Sapporo'],
    correct: 1,
  },
  {
    id: 5,
    question: 'Welke kleur krijg je als je blauw en geel mengt?',
    options: ['Groen', 'Paars', 'Oranje', 'Rood'],
    correct: 0,
  },
  {
    id: 6,
    question: 'Welke van deze dieren is een amfibie?',
    options: ['Krokodil', 'Kikker', 'Pinguïn', 'Hond'],
    correct: 1,
  },
  {
    id: 7,
    question: 'Wie schreef “Romeo en Julia”?',
    options: ['Charles Dickens', 'William Shakespeare', 'Leo Tolstoj', 'Jane Austen'],
    correct: 1,
  },
  {
    id: 8,
    question: 'Hoeveel dagen heeft een normale jaar?',
    options: ['364', '365', '366', '367'],
    correct: 1,
  },
  {
    id: 9,
    question: 'Welke ocean is het grootst?',
    options: ['Atlantische Oceaan', 'Indische Oceaan', 'Grote Oceaan', 'Noordelijke IJszee'],
    correct: 2,
  },
  {
    id: 10,
    question: 'Wat is het chemische symbool voor goud?',
    options: ['Go', 'Gd', 'Au', 'Ag'],
    correct: 2,
  },
  {
    id: 11,
    question: 'Welke taal wordt het meest gesproken ter wereld?',
    options: ['Spaans', 'Mandarijn', 'Engels', 'Arabisch'],
    correct: 1,
  },
  {
    id: 12,
    question: 'Wie was de eerste mens op de maan?',
    options: ['Buzz Aldrin', 'Neil Armstrong', 'Yuri Gagarin', 'John Glenn'],
    correct: 1,
  },
  {
    id: 13,
    question: 'Welke kleur heeft de hemel normaal gesproken overdag?',
    options: ['Rood', 'Blauw', 'Groen', 'Zwart'],
    correct: 1,
  },
  {
    id: 14,
    question: 'Hoe heet de grootste woestijn op aarde?',
    options: ['Gobi', 'Sahara', 'Mojave', 'Antarctica'],
    correct: 3,
  },
  {
    id: 15,
    question: 'Welke van deze landen ligt in Europa?',
    options: ['Egypte', 'Canada', 'Italië', 'Japan'],
    correct: 2,
  },
  {
    id: 16,
    question: 'Hoeveel letters heeft het Nederlandse alfabet?',
    options: ['25', '26', '27', '28'],
    correct: 1,
  },
  {
    id: 17,
    question: 'Welke maan draait om de aarde?',
    options: ['Titan', 'Europa', 'Phobos', 'Luna'],
    correct: 3,
  },
  {
    id: 18,
    question: 'Wat is de snelste vogel ter wereld?',
    options: ['Adelaar', 'Peregrijn', 'Arend', 'Zwaan'],
    correct: 1,
  },
  {
    id: 19,
    question: 'Wat is 12 x 8?',
    options: ['80', '96', '84', '108'],
    correct: 1,
  },
  {
    id: 20,
    question: 'Welke van deze apparaten wordt gebruikt om te bellen?',
    options: ['Televisie', 'Radio', 'Telefoon', 'Printer'],
    correct: 2,
  },
];

const questionContainer = document.getElementById('questions');
const quizForm = document.getElementById('quiz-form');
const resultBox = document.getElementById('result');
const progressIndicator = document.getElementById('progress-indicator');
const scoreIndicator = document.getElementById('score-indicator');

function renderQuestions() {
  questionContainer.innerHTML = questions
    .map(
      (question, index) => `
        <div class="question" data-question-id="${question.id}">
          <h2>${index + 1}. ${question.question}</h2>
          <div class="options">
            ${question.options
              .map(
                (option, optionIndex) => `
                  <label class="option">
                    <input type="radio" name="q${question.id}" value="${optionIndex}" />
                    <span>${option}</span>
                  </label>
                `
              )
              .join('')}
          </div>
        </div>
      `
    )
    .join('');

  updateProgress();
}

function updateProgress() {
  const answered = Array.from(document.querySelectorAll('input[type="radio"]:checked')).length;
  progressIndicator.textContent = `${answered} / ${questions.length} beantwoord`;

  let score = 0;
  questions.forEach((question) => {
    const selected = document.querySelector(`input[name="q${question.id}"]:checked`);
    if (selected && Number(selected.value) === question.correct) {
      score += 1;
    }
  });
  scoreIndicator.textContent = `Score: ${score}`;
}

questionContainer.addEventListener('change', updateProgress);

function getSelectedAnswers() {
  const selected = [];

  for (const question of questions) {
    const value = document.querySelector(`input[name="q${question.id}"]:checked`);
    if (!value) {
      return null;
    }

    selected.push({
      id: question.id,
      selected: Number(value.value),
      correct: question.correct,
      question: question.question,
      answer: question.options[Number(value.value)],
      correctAnswer: question.options[question.correct],
    });
  }

  return selected;
}

function calculateScore(selected) {
  return selected.reduce((total, item) => total + (item.selected === item.correct ? 1 : 0), 0);
}

quizForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const selected = getSelectedAnswers();

  if (!selected) {
    resultBox.textContent = 'Beantwoord alle vragen voordat je de quiz verstuurt.';
    resultBox.classList.add('error');
    return;
  }

  const score = calculateScore(selected);
  const total = questions.length;

  const emailBody = [
    'Quizresultaat: Algemene Kennis',
    '',
    `Score: ${score}/${total}`,
    '',
    ...selected.map((item) => {
      const status = item.selected === item.correct ? 'Goed' : 'Fout';
      return `Vraag ${item.id}: ${item.question}\nJouw antwoord: ${item.answer}\nStatus: ${status}\nCorrect antwoord: ${item.correctAnswer}`;
    }),
  ].join('\n\n');

  const subject = encodeURIComponent('Quizresultaat Algemene Kennis');
  const body = encodeURIComponent(emailBody);

  resultBox.classList.remove('error');
  resultBox.textContent = `Je score: ${score}/${total}. Je e-mailprogramma wordt nu geopend om je uitslag te verzenden.`;

  window.location.href = `mailto:janali3765@gmail.com?subject=${subject}&body=${body}`;
});

renderQuestions();
