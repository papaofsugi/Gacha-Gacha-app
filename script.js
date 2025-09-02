// 100種類のアイテムを生成（例：Item 1〜Item 100）
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
  const resultText = results.map(item => `🎉 ${item.rarity}：${item.name}`).join("<br>");
  document.getElementById("result").innerHTML = resultText;
});
