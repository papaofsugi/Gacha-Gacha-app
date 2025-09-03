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

function getThreeItems() {
  const shuffled = [...items].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 3);
}

function getCapsuleImage(rarity) {
  switch (rarity) {
    case "SSR": return "capsule_gold.png";
    case "SR":  return "capsule_purple.png";
    case "R":   return "capsule_blue.png";
    default:    return "capsule_red.png";
  }
}

document.getElementById("gacha-button").addEventListener("click", () => {
  if (items.length === 0) {
    alert("CSVを読み込んでください！");
    return;
  }

  const capsule = document.getElementById("capsule");
  const resultContainer = document.getElementById("result");

  const results = getThreeItems();

  const highest = results.find(item => item.rarity === "SSR")
              || results.find(item => item.rarity === "SR")
              || results.find(item => item.rarity === "R")
              || results.find(item => item.rarity === "N");

  capsule.src = getCapsuleImage(highest.rarity);
  capsule.classList.add("spin");
  resultContainer.innerHTML = "";

  setTimeout(() => {
    capsule.classList.remove("spin");

    const resultHTML = results.map(item => {
      return `<div class="item">
                <span class="rarity ${item.rarity}">${item.rarity}</span>：<span class="name">${item.name}</span>
              </div>`;
    }).join("");
    resultContainer.innerHTML = resultHTML;

    if (results.some(item => item.rarity === "SSR")) {
      alert("🎉超激レアSSRが出た！");
    }
  }, 2000);
});
