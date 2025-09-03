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

function getOneItem() {
  const index = Math.floor(Math.random() * items.length);
  return items[index];
}

document.getElementById("gacha-button").addEventListener("click", () => {
  if (items.length === 0) {
    alert("CSVを読み込んでください！");
    return;
  }

  const result = getOneItem();
  const body = document.body;
  const progressContainer = document.getElementById("progress-bar-container");
  const capsuleTop = document.getElementById("capsule-top");
  const capsuleBottom = document.getElementById("capsule-bottom");
  const itemPopup = document.getElementById("item-popup");
  const resultContainer = document.getElementById("result");

  // 光演出スタート
  body.classList.add("glow");

  // 進行バー表示
  progressContainer.innerHTML = '<div id="progress-bar"></div>';
  progressContainer.style.visibility = "visible";

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

    // カプセル開く
    capsuleTop.classList.add("open-top");
    capsuleBottom.classList.add("open-bottom");

    // アイテム飛び出す
    itemPopup.innerHTML = `<span class="rarity ${result.rarity}">${result.rarity}</span>：<span class="name">${result.name}</span>`;
    itemPopup.classList.add("item-reveal");

    // 結果テキスト表示（任意）
    resultContainer.innerHTML = "";

    if (result.rarity === "SSR") {
      alert("🎉超激レアSSRが出た！");
    }
  }, 5000);
});
