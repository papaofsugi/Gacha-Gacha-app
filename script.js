document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ script.js 2025-9-4-v14 is loaded");
});

const csvUpload = document.getElementById("csv-upload");
const gachaButton = document.getElementById("gacha-button");
const capsuleImage = document.getElementById("capsule-image");
const itemName = document.getElementById("item-name");
const resultArea = document.getElementById("result-area");
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
    const lines = text.trim().split(/\r?\n/);
    gachaItems = [];

    for (let i = 1; i < lines.length; i++) {
      const [name, image] = lines[i].split(",").map(s => s.trim());
      if (name && image) {
        gachaItems.push({ name, image });
      }
    }

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
  if (gachaItems.length === 0) {
    alert("CSVが読み込まれていません！");
    return;
  }

  resultArea.style.display = "none";
  itemName.textContent = "";
  progressBar.style.display = "block";

  // 即座にカプセル画像に切り替え
  capsuleImage.src = gachaItems[0].image;

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
  }, 100); // 高速切り替え

  setTimeout(() => {
    clearInterval(loopInterval);
    const selected = gachaItems[Math.floor(Math.random() * gachaItems.length)];
    capsuleImage.src = selected.image;
    itemName.textContent = selected.name;
    resultArea.style.display = "block";
    progressBar.style.display = "none";
  }, 5000);
});
