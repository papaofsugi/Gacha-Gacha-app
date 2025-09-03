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

function getCapsuleImage(rarity) {
  switch (rarity) {
    case "SSR": return "capsule_ssr_red.png";
    case "SR":  return "capsule_sr_green.png";
    case "R":   return "capsule_r_yellow.png";
    case "N":   return "capsule_n_blue.png";
    default:    return "capsule_n_blue.png";
  }
}

document.getElementById("gacha-button").addEventListener("click", () => {
  if (items.length === 0) {
    alert("CSVを読み込んでください！");
    return;
  }

  const capsule = document.getElementById("capsule");
  const resultContainer = document.getElementById("result");
  const body = document.body;

  const result = getOneItem(); // 抽選は先に決定

  // 光の演出スタート
  body.classList.add("glow");

  // カプセル交互表示（1秒ごとに切り替え）
  const capsuleImages = [
    "capsule_ssr_red.png",
    "capsule_sr_green.png",
    "capsule_r_yellow.png",
    "capsule_n_blue.png"
  ];
  let index = 0;
  const interval = setInterval(() => {
    capsule.src = capsuleImages[index];
    index = (index + 1) % capsuleImages.length;
  }, 1000);

  // 10秒後に演出終了＆結果表示
  setTimeout(() => {
    clearInterval(interval);
    body.classList.remove("glow");

    capsule.src = getCapsuleImage(result.rarity);

    const resultHTML = `<div class="item">
                          <span class="rarity ${result.rarity}">${result.rarity}</span>：<span class="name">${result.name}</span>
                        </div>`;
    resultContainer.innerHTML = resultHTML;

    if (result.rarity === "SSR") {
      alert("🎉超激レアSSRが出た！");
    }
  }, 10000);
});
