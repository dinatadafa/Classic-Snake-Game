// Ahmad Alvin Griffin (24060121140106)
// Arya Dheffan Shevchenko (24060121140160)
// Dafa Kurnia Dinata (24060121120003)
// Dhiya Mazaya (24060121140151)
// Rafif Abbrar Maheswara (24060121140163)

const playBoard = document.querySelector(".play-board");
const scoreElement = document.querySelector(".score");
const highScoreElement = document.querySelector(".high-score");
const controls = document.querySelectorAll(".controls i");

let gameOver = false;
let foodX, foodY;
let snakeX = 5, snakeY = 5;
let velocityX = 0, velocityY = 0;
let snakeBody = [];
let setIntervalId;
let score = 0;
let gameStarted = false;

// Mendapat Skor Tertinggi dari Penyimpanan Lokal
let highScore = localStorage.getItem("high-score") || 0;
highScoreElement.innerText = `High Score: ${highScore}`;

const updateFoodPosition = () => {
    // Melewati Value 1 - 30 Secara Acak Sebagai Posisi Makanan
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
}

const handleGameOver = () => {
    clearInterval(setIntervalId);
    const popupContainer = document.getElementById("popupContainer");
    popupContainer.style.display = "flex";
    gameplayMusic.pause();
    deathSound.pause();
    gameoverMusic.play();
}

const startButton = document.getElementById("startButton");

startButton.addEventListener("click", () => {
  const startPopup = document.getElementById("startPopup");
  startPopup.style.display = "none";
  gameStarted = true;
  // Start game 
});

// Menggunakan If-Else Statement
const changeDirection = e => {
    // Mengubah Arah Gerak Berdasarkan Tombol
    if(e.key === "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    } else if(e.key === "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    } else if(e.key === "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    } else if(e.key === "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
}

// Memanggil Pengubah Arah pada setiap klik tombol dan meneruskan nilai kumpulan data kunci sebagai objek
controls.forEach(button => button.addEventListener("click", () => changeDirection({ key: button.dataset.key })));

const initGame = () => {
    if (gameOver) return handleGameOver();
    let html = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;
  
    // Memeriksa apakah ular menyentuh makanan
    if (snakeX === foodX && snakeY === foodY) {
      updateFoodPosition();
      snakeBody.push([foodY, foodX]); // Mendorong posisi makanan ke susunan tubuh ular
      score++; // increment score by 1
      highScore = score >= highScore ? score : highScore;
      localStorage.setItem("high-score", highScore);
      scoreElement.innerText = `Score: ${score}`;
      highScoreElement.innerText = `High Score: ${highScore}`;
      foodEatSound.play();
    }
    // Memperbarui posisi kepala ular berdasarkan kecepatan saat ini
    snakeX += velocityX;
    snakeY += velocityY;
  
    // Tentukan arah dan terapkan kelas CSS yang sesuai
    // Menggunakan If-Else Statement
    let directionClass = "";
    if (velocityX === -1) {
      directionClass = "pacman-left";
    } else if (velocityX === 1) {
      directionClass = "pacman-right";
    } else if (velocityY === -1) {
      directionClass = "pacman-up";
    } else if (velocityY === 1) {
      directionClass = "pacman-down";
    }
  
    // Menggeser elemen dalam tubuh ular satu per satu
    for (let i = snakeBody.length - 1; i > 0; i--) {
      snakeBody[i] = snakeBody[i - 1];
    }
    snakeBody[0] = [snakeX, snakeY]; // Mengatur elemen pertama tubuh ular ke posisi ular saat ini
  
    // Memeriksa apakah kepala ular keluar dari dinding, jika keluar, setting game over ke permainan
    if (snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
      deathSound.play();
      return (gameOver = true);
    }
  
    for (let i = 0; i < snakeBody.length; i++) {
      // Menambahkan div untuk setiap bagian tubuh ular dengan arahnya
      html += `<div class="head ${directionClass}" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;
      // Memeriksa apakah kepala ular mengenai badan, jika mengenai, atur game over ke permainan
      if (i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]) {
        gameOver = true;
      }
    }
    playBoard.innerHTML = html;
};

// Tambahkan code ini di bagian atas kode JavaScript Anda untuk mendapatkan referensi ke elemen audio
const startMusic = document.getElementById("startMusic");
const gameplayMusic = document.getElementById("gameplayMusic");
const gameoverMusic = document.getElementById("gameoverMusic");
const foodEatSound = document.getElementById("foodEatSound");
const deathSound = document.getElementById("deathSound");

startMusic.volume = 0.3;
gameplayMusic.volume = 0.6;
gameoverMusic.volume = 0.3;
deathSound.volume = 0.7;


// Tambahkan code ini di dalam bagian klik "startButton" Anda untuk memulai permainan
startButton.addEventListener("click", () => {
  const startPopup = document.getElementById("startPopup");
  startPopup.style.display = "none";
  gameStarted = true;

  // Mulai musik gameplay dan jeda musik awal
  startMusic.pause();
  gameplayMusic.play();

  // Start the game here 
});

// Tambahkan kode ini di akhir kode JavaScript 
window.addEventListener("load", () => {
    const startPopup = document.getElementById("startPopup");
    startPopup.style.display = "flex";
    if (!gameStarted) {
        startPopup.style.display = "flex";
    }

    startMusic.play();
  });


const closePopupButton = document.getElementById("closePopup");

closePopupButton.addEventListener("click", () => {
    const popupContainer = document.getElementById("popupContainer");
    popupContainer.style.display = "none";
    location.reload();
    startPopup.style.display = "none";

    gameoverMusic.pause();
});

updateFoodPosition();
setIntervalId = setInterval(initGame, 100);
document.addEventListener("keyup", changeDirection);
