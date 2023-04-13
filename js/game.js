const ENEMIES = [
  "bear.png",
  "buffalo.png",
  "chick.png",
  "chicken.png",
  "cow.png",
  "dog.png",
  "elephant.png",
  "duck.png",
];

const TYPES = {
  BOSS: "Square",
  REGULAR: "Round",
};

function updateEnemyImage(type, enemy) {
  document.getElementById("enemy").src = `./assets/animals/${type}/${enemy}`;
}

document.addEventListener("DOMContentLoaded", () => {
  const welcomeMessage = document.getElementById("welcomeMessage");
  const attackButton = document.getElementById("attackButton");
  const enemyHealthProgress = document.getElementById("enemyHealthProgress");
  const levelProgress = document.getElementById("levelProgress");
  //   const enemyHPDisplay = document.getElementById("enemyHP");
  const enemy = document.getElementById("enemy");
  const playerUsername = document.getElementById("playerUsername");
  const playerScore = document.getElementById("playerScore");
  const playerLevel = document.getElementById("playerLevel");
  const playerMoney = document.getElementById("playerMoney");
  const currentDamage = document.getElementById("currentDamage");
  const upgradeCost = document.getElementById("upgradeCost");
  const upgradeButton = document.getElementById("upgradeButton");

  const username = localStorage.getItem("username");

  if (!username) {
    alert("Please register first.");
    window.location.href = "index.html";
  } else {
    welcomeMessage.textContent = `Welcome, ${username}!`;
  }

  let score = parseInt(localStorage.getItem("score") || "0");
  playerScore.textContent = score;
  let level = parseInt(localStorage.getItem("level") || "1");
  playerLevel.textContent = level;
  let money = parseInt(localStorage.getItem("money") || "0");
  playerMoney.textContent = money;
  let damage = parseInt(localStorage.getItem("damage") || "10");
  currentDamage.textContent = damage;
  let cost = parseInt(localStorage.getItem("cost") || "50");
  upgradeCost.textContent = cost;
  let playerxp = parseInt(localStorage.getItem("playerxp") || "0");
  let enemyxp = parseInt(localStorage.getItem("enemyxp") || "10");
  let neededXP = parseInt(localStorage.getItem("neededXP") || "100");
  levelProgress.style.width = `${(playerxp / neededXP) * 100}%`;

  updateEnemyImage(
    localStorage.getItem("enemyType") || TYPES.REGULAR,
    localStorage.getItem("enemyImage") || ENEMIES[0]
  );

  let enemyHP = parseInt(localStorage.getItem("enemyHP") || "100");
  let enemyHPInitial = parseInt(
    localStorage.getItem("enemyHPInitial") || "100"
  );
  enemyHealthProgress.style.width = `${(enemyHP / enemyHPInitial) * 100}%`;

  if (!username) {
    alert("Please register first.");
    window.location.href = "index.html";
  } else {
    welcomeMessage.textContent = `Welcome, ${username}!`;
    playerUsername.textContent = username;
  }

  attackButton.addEventListener("click", () => {
    enemyHP -= damage;
    localStorage.setItem("enemyHP", enemyHP.toString());
    const enemyHealthPercentage = (enemyHP / enemyHPInitial) * 100;
    enemyHealthProgress.style.width = `${enemyHealthPercentage}%`;

    if (enemyHP <= 0) {
      enemyHP = 0;
      money += score += 1;
      playerScore.textContent = score;
      localStorage.setItem("score", score.toString());
      attackButton.disabled = true;
      //   alert("Congratulations! You defeated the enemy.");

      const type = score % 10 ? TYPES.REGULAR : TYPES.BOSS;
      const image = ENEMIES[Math.floor(Math.random() * ENEMIES.length)];
      enemyHP = 100 + Math.floor(Math.random() * 100) * score;
      enemyHPInitial = enemyHP;
      enemyHealthProgress.style.width = `100%`;

      localStorage.setItem("enemyHPInitial", enemyHPInitial.toString());
      localStorage.setItem("enemyHP", enemyHP.toString());
      localStorage.setItem("enemyImage", image);
      localStorage.setItem("enemyType", type);
      updateEnemyImage(
        score % 10 ? TYPES.REGULAR : TYPES.BOSS,
        ENEMIES[Math.floor(Math.random() * ENEMIES.length)]
      );

      playerxp += enemyxp;
      enemyxp = 10 + Math.floor(Math.random() * 10) * score;
      localStorage.setItem("playerxp", playerxp.toString());
      localStorage.setItem("enemyxp", enemyxp.toString());

      if (playerxp >= neededXP) {
        level += 1;
        playerLevel.textContent = level;
        neededXP = 100 * level + Math.floor(Math.random() * 100);
        localStorage.setItem("neededXP", neededXP.toString());
        playerxp = 0;
      }
      levelProgress.style.width = `${(playerxp / neededXP) * 100}%`;
    }
    // enemyHPDisplay.textContent = enemyHP;
  });

  upgradeButton.addEventListener("click", () => {
    if (money >= cost) {
      money -= cost;
      playerScore.textContent = money;
      damage += 1;

      currentDamage.textContent = damage;
      cost = Math.ceil(cost * 1.1);
      localStorage.setItem("money", money);
      upgradeCost.textContent = cost;
    } else {
      alert("You do not have enough points to upgrade your weapon.");
    }
  });
});
