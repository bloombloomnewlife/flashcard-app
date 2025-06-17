let flashcards = [];
let current = 0;
let showingFront = true;

const card = document.getElementById("flashcard");

fetch('cards.json')
  .then(res => res.json())
  .then(data => {
    flashcards = data;
    showCard();
  });

function showCard() {
  if (!flashcards.length) return;
  const content = showingFront ? flashcards[current].front : flashcards[current].back;
  card.textContent = content;
  speak(content); // 表示後に自動読み上げ
}

function nextCard() {
  if (!flashcards.length) return;
  if (current < flashcards.length - 1) current++;
  showingFront = true;
  showCard();
}

function prevCard() {
  if (!flashcards.length) return;
  if (current > 0) current--;
  showingFront = true;
  showCard();
}

function flipCard() {
  if (!flashcards.length) return;
  showingFront = !showingFront;
  showCard();
}

function speak(text) {
  if (!text) return;
  const utterance = new SpeechSynthesisUtterance(text);
  const isJapanese = /[ぁ-んァ-ン一-龯]/.test(text);
  utterance.lang = isJapanese ? "ja-JP" : "en-US";
  speechSynthesis.cancel(); // 前の発話をキャンセル
  speechSynthesis.speak(utterance);
}
