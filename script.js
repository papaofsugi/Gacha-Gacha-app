// 100種類のアイテムを生成
const items = Array.from({ length: 100 }, (_, i) => ({
  name: `アイテム${i + 1}`,
  rarity: getRarity()
}));

// レア度をランダムに割り当てる関数
function getRarity() {
  const rand = Math.random() * 100;
  if (rand < 5) return "SSR";
  if (rand < 20) return "SR";
  if (rand < 50) return "R";
  return "N";
}

// ランダムに3つのアイテムを選ぶ（重複なし）
function getThreeItems() {
  const shuffled = [...items].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 3);
}

// ボタンのクリックイベント
document.getElementById("gacha-button").addEventListener("click", () => {
  const results = getThreeItems();

  // 表示を毎回クリアして新しく描画
  const resultContainer = document.getElementById("result");
  resultContainer.innerHTML = ""; // ← ここで前の結果を消す

  results.forEach(item => {
    const div = document.createElement("div");
    div.className = "item";
    div.innerHTML = `🎉 <strong>${item.rarity}</strong>：${item.name}`;
    resultContainer.appendChild(div);
  });
});
