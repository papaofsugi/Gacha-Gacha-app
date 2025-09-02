const items = [
  { name: "レアなぬいぐるみ", rarity: "SSR" },
  { name: "かわいいキーホルダー", rarity: "SR" },
  { name: "ステッカー", rarity: "R" },
  { name: "お菓子", rarity: "N" }
];

const probabilities = {
  SSR: 5,
  SR: 15,
  R: 30,
  N: 50
};

function getRandomItem() {
  const rand = Math.random() * 100;
  let cumulative = 0;
  for (const rarity in probabilities) {
    cumulative += probabilities[rarity];
    if (rand < cumulative) {
      const filtered = items.filter(item => item.rarity === rarity);
      return filtered[Math.floor(Math.random() * filtered.length)];
    }
  }
}

document.getElementById("gacha-button").addEventListener("click", () => {
  const item = getRandomItem();
  document.getElementById("result").textContent = `🎉 ${item.rarity}：${item.name} が当たった！`;
});
