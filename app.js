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

function speakCard() {
  if (!flashcards.length) return;
  const text = showingFront ? flashcards[current].front : flashcards[current].back;
  const utterance = new SpeechSynthesisUtterance(text);

  // 日本語か英語か簡易判定
  const isJapanese = /[ぁ-んァ-ン一-龯]/.test(text);
  utterance.lang = isJapanese ? "ja-JP" : "en-US";

  speechSynthesis.cancel(); // 前の発話をキャンセル
  speechSynthesis.speak(
