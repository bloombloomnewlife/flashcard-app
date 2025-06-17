let flashcards = [];
let current = 0;
let showingFront = true;

const card = document.getElementById("flashcard");

fetch('cards.json')
  .then(res => res.json())
  .then(data => {
    flashcards = data;
    card.textContent = flashcards[current].front;
  });

card.addEventListener("click", () => {
  if (!flashcards.length) return;
  showingFront = !showingFront;
  card.textContent = showingFront ? flashcards[current].front : flashcards[current].back;
});

setInterval(() => {
  if (!flashcards.length) return;
  current = (current + 1) % flashcards.length;
  showingFront = true;
  card.textContent = flashcards[current].front;
}, 5000);
