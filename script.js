let items = [];

document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ script.js 2025-9-4-v3 is loaded");
});

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

function revealItem(result, popup) {
  popup.innerHTML = `<span class="rarity ${result.rarity}">${result.rarity}</span>：<span class="name">${result.name}</span>`;
  popup.classList.remove("hidden");
  popup.classList.add("item-reveal";

  if (result.rarity === "SSR") {
    alert("🎉超激レアSSRが出た！");
    document.body.classList.add("glow");
    setTimeout(() => document.body.classList.remove("glow"), 1000);
  }
}

document.getElementById("gacha-button").addEventListener("click", () => {
  console.log("🎯 ガチャボタンがクリックされました");

  if (items.length === 0) {
    alert("CSVを読み込んでください！");
    return;
  }

  const result = getWeightedItem();
  const capsuleImg = document.getElementById("capsule");
  const itemPopup = document.getElementById("item-popup");
  const progressContainer = document.getElementById("progress-bar-container");
  const gachaButton = document.getElementById("gacha-button");

  disableButton(gachaButton);
  capsuleImg.classList.add("spin-loop");
  capsuleImg.src = "assets/capsule_n_blue.png";
  itemPopup.classList.remove("item-reveal");
  itemPopup.innerHTML = "";
  showProgressBar(progressContainer);

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
  }, 100);

  const gachaSound = document.getElementById("gacha-sound");
  gachaSound?.play();

  setTimeout(() => {
    clearInterval(interval);
    capsuleImg.classList.remove("spin-loop");
    hideProgressBar(progressContainer);
    capsuleImg.src = getCapsuleImage(result.rarity);
    revealItem(result, itemPopup);
    enableButton(gachaButton);
  }, 5000);
});
