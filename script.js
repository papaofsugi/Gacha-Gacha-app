document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ script.js 2025-9-4-v7 is loaded");
});

const gachaButton = document.getElementById("gacha-button");
const capsuleImage = document.getElementById("capsule-image");
const resultDiv = document.getElementById("result");
const itemImage = document.getElementById("item-image");
const itemName = document.getElementById("item-name");
const progressBar = document.querySelector(".progress-bar");
const progressFill = document.querySelector(".progress-fill");

let gachaItems = [];
let loopInterval;

// CSVを読み込んでパースする関数
async function loadCSV() {
  const response = await fetch("item.csv");
  const text = await response.text();
  const lines = text.trim().split("\n");
  const headers = lines[0].split(",");

  gachaItems = lines.slice(1).map(line => {
    const values = line.split(",");
    const item = {};
    headers.forEach((header, index) => {
      item[header.trim()] = values[index].trim();
    });
    return {
      name: item["name"],
      image: item["image"]
    };
  });
}

// ガチャ処理
gachaButton.addEventListener("click", async () => {
  if (gachaItems.length === 0) {
    await loadCSV();
  }

  resultDiv.style.display = "none";
  progressBar.style.display = "block";

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
  }, 20);

  // 5秒後に抽選結果を表示
  setTimeout(() => {
    clearInterval(loopInterval);
    const selected = gachaItems[Math.floor(Math.random() * gachaItems.length)];
    capsuleImage.src = selected.image;
    itemImage.src = selected.image;
    itemName.textContent = selected.name;
    resultDiv.style.display = "block";
    progressBar.style.display = "none";
  }, 5000);
});
