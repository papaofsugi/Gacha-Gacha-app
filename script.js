let items = [];

document.getElementById("csvInput").addEventListener("change", function (e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (event) {
    const text = event.target.result;
    items = parseCSV(text);
    alert(`CSV読み込み完了！アイテム数：${items.length}`);
  };
  reader.readAsText(file);
});

function parseCSV(text) {
  const lines = text.trim().split(/\r?\n/);
  const result = [];
  for (let i = 1; i < lines.length; i++) {
    const [name, rarity] = lines[i].split(",");
    if (name && rarity) {
      result.push({ name: name.trim(), rarity: rarity.trim() });
    }
  }
  return result;
}

function getWeightedItem() {
  const weights = { SSR: 1, SR: 5, R: 20, N: 74 };
  const pool = [];

  items.forEach(item => {
    const count = weights[item.rarity] || 1;
    for (let i = 0; i < count; i++) pool.push(item);
  });

  const index = Math.floor(Math.random() * pool.length);
  return pool[index];
}

function getCapsuleImage(rarity) {
  switch (rarity) {
    case "SSR": return "assets/capsule_ssr_red.png";
    case "SR":  return "assets/capsule_sr_green.png";
    case "R":   return "assets/capsule_r_yellow.png";
    case "N":   return "assets/capsule_n_blue.png";
    default:    return "assets/capsule_n_blue.png";
  }
}

function disableButton(btn) {
  btn.disabled = true;
  btn.style.opacity = "0.5";
  btn.style.pointerEvents = "none";
}

function enableButton(btn) {
  btn.disabled = false;
  btn.style.opacity = "1";
  btn.style.pointerEvents = "auto";
}

function showProgressBar(container) {
  container.innerHTML = '<div id="progress-bar"></div>';
  container.style.visibility = "visible";
}

function hideProgressBar(container) {
  container.innerHTML = "";
  container.style.visibility = "hidden";
}

function revealItem(result, popup, resultContainer) {
  popup.innerHTML = `<span class="rarity ${result.rarity}">${result.rarity}</span>：<span class="name">${result.name}</span>`;
  popup.classList.add("item-reveal");

  const li = document.createElement("li");
  li.innerHTML = popup.innerHTML;
  document.getElementById("history-list")?.prepend(li);

  const history = document.createElement("div");
  history.className = "item";
  history.innerHTML = popup.innerHTML;
  resultContainer.appendChild(history);

  if (result.rarity === "SSR") {
    alert("
