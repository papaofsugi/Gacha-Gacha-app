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
    case "SSR": return "assets/capsule_ssr_red.png";
    case "SR":  return "assets/capsule_sr_green.png";
    case "R":   return "assets/capsule_r_yellow.png";
    case "N":   return "assets/capsule_n_blue.png";
    default:    return "assets/capsule_n_blue.png";
  }
}

document.getElementById("gacha-button").addEventListener("click", () => {
  if (items.length === 0) {
    alert("CSVを読み込んでください！");
    return;
  }

  const result = getOneItem();
  const capsuleImg = document.getElementById("capsule");
  const itemPopup = document.getElementById("item-popup");
  const resultContainer = document.getElementById("result");
  const progressContainer = document.getElementById("progress-bar-container");
  const gachaButton = document.getElementById("gacha-button");

  // ボタン無効化
  gachaButton.disabled = true;
  gachaButton.style.opacity = "0.5";
  gachaButton.style.pointerEvents = "none";

  // 初期状態リセット
  capsuleImg.style.display = "block";
  itemPopup.classList.remove("item-reveal");
  itemPopup.innerHTML = "";
  progressContainer.innerHTML = "";
  progressContainer.style.visibility = "visible";

  // 光演出スタート
  document.body.classList.add("glow");

  // 進行バー表示
  progressContainer.innerHTML = '<div id="progress-bar"></div>';

  // カプセル画像高速切り替え（0.02秒）
  const capsuleImages = [
    "assets/capsule_ssr_red.png",
    "assets/capsule_sr_green.png",
    "assets/capsule_r_yellow.png",
    "assets/capsule_n_blue.png"
  ];
  let imgIndex = 0;
  const interval = setInterval(() => {
    capsuleImg.src = capsuleImages[imgIndex];
    imgIndex = (imgIndex + 1) % capsuleImages.length;
  }, 20);

  // 5秒後に結果確定
  setTimeout(() => {
    clearInterval(interval);
    document.body.classList.remove("glow");
    progressContainer.style.visibility = "hidden";

    // 抽選結果に応じた画像を表示
    capsuleImg.src = getCapsuleImage(result.rarity);

    // アイテム表示
    itemPopup.innerHTML = `<span class="rarity ${result.rarity}">${result.rarity}</span>：<span class="name">${result.name}</span>`;
    itemPopup.classList.add("item-reveal");

    // 抽選履歴追加
    const history = document.createElement("div");
    history.className = "item";
    history.innerHTML = itemPopup.innerHTML;
    resultContainer.appendChild(history);

    // SSR演出
    if (result.rarity === "SSR") {
      alert("🎉超激レアSSRが出た！");
    }

    // ボタン再表示
    gachaButton.disabled = false;
    gachaButton.style.opacity = "1";
    gachaButton.style.pointerEvents = "auto";
  }, 5000);
});
