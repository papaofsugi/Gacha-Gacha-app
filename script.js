body {
  font-family: sans-serif;
  text-align: center;
  background-color: #f0f8ff;
  padding: 50px;
  transition: background 0.5s ease;
}

body.glow {
  background: linear-gradient(135deg, #fffacd, #f0f8ff);
  background-size: 400% 400%;
  animation: glow 2s ease-in-out infinite;
}

@keyframes glow {
  0%   { background-position: 0% 50%; }
  50%  { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

input[type="file"] {
  margin-bottom: 20px;
}

#capsule-container {
  margin: 40px auto;
  position: relative;
  height: 200px;
}

#capsule {
  width: 150px;
  max-width: 300px;
  transition: transform 0.5s ease;
  z-index: 2;
}

#item-popup {
  font-size: 24px;
  font-weight: bold;
  color: #333;
  opacity: 0;
  transform: scale(0.5);
  transition: all 0.5s ease;
  margin-top: 100px;
  z-index: 3;
  position: relative;
}

.item-reveal {
  opacity: 1;
  transform: scale(1.2);
}

#gacha-button {
  margin-top: 20px;
  padding: 15px 30px;
  font-size: 18px;
  background-color: #ff69b4;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: transform 0.2s;
  position: relative;
  z-index: 10;
}

#gacha-button:hover {
  transform: scale(1.05);
}

#result {
  margin-top: 30px;
}

.item {
  margin: 10px 0;
  font-size: 20px;
}

.rarity {
  font-weight: bold;
}

.rarity.SSR { color: red; }
.rarity.SR  { color: green; }
.rarity.R   { color: orange; }
.rarity.N   { color: blue; }

.name {
  color: #333;
}

#progress-bar-container {
  width: 66.6%;
  height: 10px;
  background-color: #ddd;
  margin: 20px auto;
  border-radius: 5px;
  overflow: hidden;
  visibility: hidden;
}

#progress-bar {
  height: 100%;
  width: 0%;
  background-color: #ff69b4;
  animation: progress 5s linear forwards;
}

@keyframes progress {
  from { width: 0%; }
  to   { width: 100%; }
}
