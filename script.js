document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ script.js 2025-9-4-v6 is loaded");
});

const gachaItems = [
  { name: "SSR 赤ゼリー", image: "assets/capsule_ssr_red.png" },
  { name: "SR 緑カプセル", image: "assets/capsule_sr_green.png" },
  { name: "R 黄色エネルギー", image: "assets/capsule_r_yellow.png" },
  { name: "N 水ドーム", image: "assets/capsule_n_blue.png" }
];

const gachaButton = document.getElementById("gacha-button");
const capsuleImage = document.getElementById("capsule-image");
const resultDiv = document.getElementById("result");
const itemImage = document.getElementById("item-image");
const itemName = document.getElementById("item-name");
const progressFill = document.querySelector(".progress-fill");

let loopInterval;

gachaButton.addEventListener("click", () => {
  resultDiv.style.display = "none";
  capsuleImage.src = gachaItems[0].image;

  // プログレスバーのアニメーション再適用
  progressFill.style.width = "0%";
  progressFill.style.animation = "none";
  void progressFill.offsetWidth;
  progressFill.style.animation = "fillProgress 5s linear forwards";

  // カプセル画像を高速ループ
  let index = 0;
  loopInterval = setInterval(() => {
    capsuleImage.src = gachaItems[index % gachaItems.length].image;
    index++;
  }, 20); // 0.02秒間隔

  // 5秒後に抽選結果を表示
  setTimeout(() => {
    clearInterval(loopInterval);
    const selected = gachaItems[Math.floor(Math.random() * gachaItems.length)];
    capsuleImage.src = selected.image;
    itemImage.src = selected.image;
    itemName.textContent = selected.name;
    resultDiv.style.display = "block";
  }, 5000);
});
