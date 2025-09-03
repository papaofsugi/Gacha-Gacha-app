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

  const hasHeader = lines[0].includes("name") || lines[0].includes("rarity");
  const startIndex = hasHeader ? 1 : 0;

  for (let i = startIndex; i < lines.length; i++) {
    const [name, rarity] = lines[i].split(",");
    if (name && rarity) {
      result.push({ name: name.trim(), rarity: rarity.trim() });
    }
  }
  return result;
}

function getOneItem() {
  const index = Math.floor(Math.random() * items.length);
  return items[index];
}

function getCapsuleColor(rarity) {
  switch (rarity) {
    case "SSR": return "#ff6666";
    case "SR":  return "#66cc66";
    case "R":   return "#ffcc00";
    case "N":   return "#6699ff";
    default:    return "#cccccc";
  }
}

document.getElementById("gacha-button").addEventListener("click", () => {
  if (items.length === 0) {
    alert("CSVを読み込んでください！");
    return;
  }

  const result = getOneItem();
  const body = document.body;
  const capsuleImg = document.getElementById("capsule");
  const capsuleTop = document.getElementById("capsule-top");
  const capsuleBottom = document.getElementById("capsule-bottom");
  const itemPopup = document.getElementById("item-popup");
  const resultContainer = document.getElementById("result");
  const progressContainer = document.getElementById("progress-bar-container");

  // 状態リセット
  capsuleImg.style.display = "none";
  capsuleTop.classList.remove("hidden", "open-top");
  capsuleBottom.classList.remove("hidden", "open-bottom");
  itemPopup.classList.remove("item-reveal");
  itemPopup.innerHTML = "";
  progressContainer.innerHTML = "";
  progressContainer.style.visibility = "visible";

  // 光演出スタート
  body.classList.add("glow");

  // 進行バー表示
  progressContainer.innerHTML = '<div id="progress-bar"></div>';

  // カプセル高速切り替え（0.05秒）
  const capsuleColors = ["#ff6666", "#66cc66", "#ffcc00", "#6699ff"];
  let index = 0;
  const interval = setInterval(() => {
    capsuleTop.style.backgroundColor = capsuleColors[index];
    capsuleBottom.style.backgroundColor = capsuleColors[index];
    index = (index + 1) % capsuleColors.length;
  }, 50);

  // 5秒後に演出終了＆結果表示
  setTimeout(() => {
    clearInterval(interval);
    body.classList.remove("glow");
    progressContainer.style.visibility = "hidden";

    const finalColor = getCapsuleColor(result.rarity);
    capsuleTop.style.backgroundColor = finalColor;
    capsuleBottom.style.backgroundColor = finalColor;

    capsuleTop.classList.add("open-top");
    capsuleBottom.classList.add("open-bottom");

    itemPopup.innerHTML = `<span class="rarity ${result.rarity}">${result.rarity}</span>：<span class="name">${result.name}</span>`;
    itemPopup.classList.add("item-reveal");

    // 抽選履歴を追加
    const history = document.createElement("div");
    history.className = "item";
    history.innerHTML = `<span class="rarity ${result.rarity}">${result.rarity}</span>：<span class="name">${result.name}</span>`;
    resultContainer.appendChild(history);

    if (result.rarity === "SSR") {
      alert("🎉超激レアSSRが出た！");
    }
  }, 5000);
});
