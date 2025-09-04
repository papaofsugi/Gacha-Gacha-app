document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ script.js 2025-9-4-v5 is loaded");
});

const gachaItems = [
  { name: "赤ゼリー", image: "assets/red.png" },
  { name: "緑カプセル", image: "assets/green.png" },
  { name: "黄色エネルギー", image: "assets/yellow.png" },
  { name: "水ドーム", image: "assets/blue.png" },
  { name: "ぷるぷるゼリー", image: "assets/jelly.png" }
];

const gachaButton = document.getElementById("gacha-button");
const capsuleImage = document.getElementById("capsule-image");
const resultDiv = document.getElementById("result");
const itemImage = document.getElementById("item-image");
const itemName = document.getElementById("item-name");
const progressFill = document.querySelector(".progress-fill");

gachaButton.addEventListener("click", () => {
  resultDiv.style.display = "none";
  capsuleImage.classList.add("spin");

  // アニメーションをリセットして再適用
  progressFill.style.width = "0%";
  progressFill.style.animation = "none";
  void progressFill.offsetWidth; // 強制再描画
  progressFill.style.animation = "fillProgress 2s linear forwards";

  setTimeout(() => {
    capsuleImage.classList.remove("spin");

    const selected = gachaItems[Math.floor(Math.random() * gachaItems.length)];
    itemImage.src = selected.image;
    itemName.textContent = selected.name;
    resultDiv.style.display = "block";
  }, 2000);
});
