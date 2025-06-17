let flashcards = [];
let current = 0;
let showingFront = true;

const card = document.getElementById("flashcard");

function speakText(text) {
  if (!window.speechSynthesis) return;
  speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);

  // 言語判定（簡易的に英語のアルファベットなら英語、それ以外は日本語に設定）
  if (/^[\u0000-\u007F]*$/.test(text)) {
    utterance.lang = "en-US";
  } else {
    utterance.lang = "ja-JP";
  }

  speechSynthesis.speak(utterance);
}

fetch('/flashcard-app/cards.json')
  .then(res => res.json())
  .then(data => {
    flashcards = data;
    card.textContent = flashcards[current].front;
    speakText(card.textContent);
  });

card.addEventListener("click", () => {
  if (!flashcards.length) return;
  showingFront = !showingFront;
  card.textContent = showingFront ? flashcards[current].front : flashcards[current].back;
  speakText(card.textContent);
});

// 自動切り替えの代わりに、後でボタン設置もできます。
// もし自動切り替えを残すなら下記のsetIntervalは削除してください。
