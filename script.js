document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ script.js 2025-9-4-v9 is loaded");
});

const csvUpload = document.getElementById("csv-upload");
const gachaButton = document.getElementById("gacha-button");
const capsuleImage = document.getElementById("capsule-image");
const resultDiv = document.getElementById("result");
const itemImage = document.getElementById("item-image");
const itemName = document.getElementById("item-name");
const progressBar = document.querySelector(".progress-bar");
const progressFill = document.querySelector(".progress-fill");

let gachaItems = [];
let loopInterval;

// CSVファイルを読み込んで配列に変換
csvUpload.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    const text = reader.result;
    const lines = text.trim().split("\n");
    const headers = lines[0].split(",");

    gachaItems = lines.slice(1).map(line => {
      const values = line.split(",");
      const item = {};
      headers.forEach((header, index) => {
        item[header.trim()] = values[index]?.trim() || "";
      });
      return {
        name: item["name"],
        image: item["image"]
      };
    }).filter(item => item.name && item.image);

    if (gachaItems.length > 0) {
      gachaButton.disabled = false;
      console.log("✅ CSV読み込み完了:", gachaItems);
    } else {
      alert("CSVに有効なデータがありません！");
    }
  };
  reader.readAsText(file);
});

// ガチャ処理
gachaButton.addEventListener("click", () => {
  resultDiv.style.display = "none";
  progressBar.style.display = "block";

  progressFill.style.width = "0%";
  progressFill.style.animation = "none";
  void progressFill.offsetWidth;
  progressFill.style.animation = "fillProgress 5s linear forwards";

  let index = 0;
  loopInterval = setInterval(() => {
    const current = gachaItems[index % gachaItems.length];
    if (current && current.image) {
      capsuleImage.src = current.image;
    }
    index++;
  }, 20);

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
