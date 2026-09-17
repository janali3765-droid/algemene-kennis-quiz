const result = JSON.parse(sessionStorage.getItem('quizResult') || 'null');
const finalScore = document.getElementById('final-score');
const sendButton = document.getElementById('send-email');
const emailMessage = document.getElementById('email-message');

if (!result) {
  finalScore.textContent = 'Er is nog geen quizresultaat. Maak eerst de quiz.';
  sendButton.disabled = true;
} else {
  finalScore.textContent = `Je hebt ${result.score} van de ${result.total} vragen goed beantwoord.`;
}

sendButton.addEventListener('click', () => {
  if (!result) return;

  const details = result.details.map((item, index) => {
    const status = item.correct ? 'Goed' : 'Fout';
    return `Vraag ${index + 1}: ${item.question}\nJouw antwoord: ${item.answer}\nStatus: ${status}\nCorrect antwoord: ${item.correctAnswer}`;
  }).join('\n\n');

  const subject = encodeURIComponent('Quizresultaat Algemene Kennis');
  const body = encodeURIComponent(`Quizresultaat Algemene Kennis\n\nScore: ${result.score}/${result.total}\n\n${details}`);
  emailMessage.textContent = 'Je e-mailprogramma wordt geopend. Klik daar nog op Verzenden.';
  window.location.href = `mailto:janali3765@gmail.com?subject=${subject}&body=${body}`;
});
