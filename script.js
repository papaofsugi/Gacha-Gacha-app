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
    result.push({ name: name.trim(), rarity: rarity.trim() });
  }
  return result;
}

function getThreeItems() {
  const shuffled = [...items].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 3);
}

document.getElementById("gacha-button").addEventListener("click", () => {
  if (items.length === 0) {
    alert("CSVを読み込んでください！");
    return;
  }

  const results = getThreeItems();
  const resultHTML = results.map(item => {
    return `<div class="item">
              <span class="rarity">${item.rarity}</span>：<span class="name">${item.name}</span>
            </div>`;
  }).join("");
  document.getElementById("result").innerHTML = resultHTML;
});
