let cards = [];

function checkPassword() {
  const input = document.getElementById("password").value;
  if (input === "0000") {
    document.getElementById("auth").style.display = "none";
    document.getElementById("editor").style.display = "block";
    loadCards();
  } else {
    alert("Incorrect password");
  }
}

function loadCards() {
  fetch('cards.json')
    .then(res => res.json())
    .then(data => {
      cards = data;
      renderCardList();
    });
}

function renderCardList() {
  const list = document.getElementById("cardList");
  list.innerHTML = '';
  cards.forEach((card, i) => {
    const div = document.createElement("div");
    div.className = "card-row";
    div.innerHTML = `
      <input type="checkbox" data-index="${i}">
      <input value="${card.front}" onchange="cards[${i}].front = this.value">
      <input value="${card.back}" onchange="cards[${i}].back = this.value">
    `;
    list.appendChild(div);
  });
}

function toggleAll(state) {
  document.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = state);
}

function deleteSelected() {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
  const indexes = Array.from(checkboxes).map(cb => parseInt(cb.dataset.index));
  cards = cards.filter((_, i) => !indexes.includes(i));
  renderCardList();
}

function addCard() {
  const front = document.getElementById("newFront").value.trim();
  const back = document.getElementById("newBack").value.trim();
  if (front && back) {
    cards.push({ front, back });
    document.getElementById("newFront").value = "";
    document.getElementById("newBack").value = "";
    renderCardList();
  }
}

function save() {
  const blob = new Blob([JSON.stringify(cards, null, 2)], { type: "application/json" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "cards.json";
  a.click();
}

document.getElementById("csvInput").addEventListener("change", function (e) {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.onload = function () {
    const lines = reader.result.trim().split("\n");
    for (const line of lines) {
      const [front, back] = line.split(",");
      if (front && back) cards.push({ front: front.trim(), back: back.trim() });
    }
    renderCardList();
  };
  reader.readAsText(file);
});
