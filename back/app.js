let flashcards = [];
let current = 0;
let showingFront = true;

const card = document.getElementById("flashcard");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

function speakText(text) {
  if (!window.speechSynthesis) return;
  speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);

  if (/^[\u0000-\u007F]*$/.test(text)) {
    utterance.lang = "en-US";
  } else {
    utterance.lang = "ja-JP";
  }

  speechSynthesis.speak(utterance);
}

function showCard(index) {
  if (!flashcards.length) return;
  current = (index + flashcards.length) % flashcards.length; // ループ対応
  showingFront = true;
  card.textContent = flashcards[current].front;
  speakText(card.textContent);
}

fetch('/flashcard-app/cards.json')
  .then(res => res.json())
  .then(data => {
    flashcards = data;
    showCard(current);
  });

card.addEventListener("click", () => {
  if (!flashcards.length) return;
  showingFront = !showingFront;
  card.textContent = showingFront ? flashcards[current].front : flashcards[current].back;
  speakText(card.textContent);
});

prevBtn.addEventListener("click", () => {
  showCard(current - 1);
});

nextBtn.addEventListener("click", () => {
  showCard(current + 1);
});
