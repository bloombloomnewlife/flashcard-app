let flashcards = [];
let current = 0;
let showingFront = true;
const card = document.getElementById("flashcard");

function speakText(text) {
  speechSynthesis.cancel(); // 音声を止める
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = /[ぁ-んァ-ン一-龥]/.test(text) ? "ja-JP" : "en-US";
  speechSynthesis.speak(utterance);
}

function displayCard() {
  if (!flashcards.length) return;
  const text = showingFront ? flashcards[current].front : flashcards[current].back;
  card.textContent = text;
  speakText(text);
}

fetch('cards.json')
  .then(res => res.json())
  .then(data => {
    flashcards = data;
    displayCard();
  });

card.addEventListener("click", () => {
  if (!flashcards.length) return;
  showingFront = !showingFront;
  displayCard();
});

document.getElementById("prev").addEventListener("click", () => {
  if (!flashcards.length) return;
  current = (current - 1 + flashcards.length) % flashcards.length;
  showingFront = true;
  displayCard();
});

document.getElementById("next").addEventListener("click", () => {
  if (!flashcards.length) return;
  current = (current + 1) % flashcards.length;
  showingFront = true;
  displayCard();
});
