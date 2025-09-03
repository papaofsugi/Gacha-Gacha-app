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

  gachaButton.disabled = true;
  gachaButton.style.opacity = "0.5";
  gachaButton.style.pointerEvents = "none";

  capsuleImg.style.display = "block";
  capsuleImg.src = "assets/capsule_n_blue.png";
  itemPopup.classList.remove("item-reveal");
  itemPopup.innerHTML = "";
  progressContainer.innerHTML = "";
  progressContainer.style.visibility = "visible";

  document.body.classList.add("glow");
  progressContainer.innerHTML = '<div id="progress-bar"></div>';

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
  }, 50); // 少しゆっくりに調整

  setTimeout(() => {
    clearInterval(interval);
    document.body.classList.remove("glow");
    progressContainer.style.visibility = "hidden";

    capsuleImg.src = getCapsuleImage(result.rarity);

    itemPopup.innerHTML = `<span class="rarity ${result.rarity}">${result.rarity}</span>：<span class="name">${result.name}</span>`;
    itemPopup.classList.add("item-reveal");

    const history = document.createElement("div");
    history.className = "item";
    history.innerHTML = itemPopup.innerHTML;
    resultContainer.appendChild(history);

    if (result.rarity === "SSR") {
      alert("🎉超激レアSSRが出た！");
    }

    gachaButton.disabled = false;
    gachaButton.style.opacity = "1";
    gachaButton.style.pointerEvents = "auto";
  }, 5000);
});
