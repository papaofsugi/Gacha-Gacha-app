// ...（前半はそのまま）

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
    alert("🎉超激レアSSRが出た！");
    document.body.classList.add("glow");
    setTimeout(() => document.body.classList.remove("glow"), 1000);
  }
}

document.getElementById("gacha-button").addEventListener("click", () => {
  if (items.length === 0) {
    alert("CSVを読み込んでください！");
    return;
  }

  const result = getWeightedItem();
  const capsuleImg = document.getElementById("capsule");
  const itemPopup = document.getElementById("item-popup");
  const resultContainer = document.getElementById("result");
  const progressContainer = document.getElementById("progress-bar-container");
  const gachaButton = document.getElementById("gacha-button");

  disableButton(gachaButton);
  capsuleImg.classList.add("spin-animation");
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
  }, 50);

  const gachaSound = document.getElementById("gacha-sound");
  gachaSound?.play();

  setTimeout(() => {
    clearInterval(interval);
    capsuleImg.classList.remove("spin-animation");
    hideProgressBar(progressContainer);
    capsuleImg.src = getCapsuleImage(result.rarity);
    revealItem(result, itemPopup, resultContainer);
    enableButton(gachaButton);
  }, 5000);
});
