const winCon = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const board = document.querySelector(".board");
const cells = document.querySelectorAll(".cell");
const restartBtn = document.querySelector(".restart-btn");
const gameMsg = document.querySelector(".game-msg");
let isPlayerXTurn = true;
let winner = "";

const swapTurns = () => {
  isPlayerXTurn = !isPlayerXTurn;
  isPlayerXTurn
    ? (gameMsg.innerHTML = `C'est au tour du joueur X de jouer.`)
    : (gameMsg.innerHTML = `C'est au tour du joueur O de jouer.`);
  cells.forEach((cell) => {
    if (isPlayerXTurn) {
      if (cell.classList.contains("empty")) {
        cell.innerHTML = `X`;
      }
    } else {
      if (cell.classList.contains("empty")) {
        cell.innerHTML = `O`;
      }
    }
  });
};

const playerClick = (cellTarget) => {
  const currentCell = cellTarget.target;
  // Intéressant d'avoir travaillé avec les classList
  // Tu pouvais travailler avec le innerHTML aussi
  if (currentCell.classList.contains("empty")) {
    if (isPlayerXTurn) {
      currentCell.innerHTML = `X`;
      currentCell.classList.add("X-cell");
    } else {
      currentCell.innerHTML = `O`;
      currentCell.classList.add("O-cell");
    }
    currentCell.classList.remove("empty");
    swapTurns();
  }
  if (checkDraw() || checkWin()) {
    endGame();
  }
};

const endGame = () => {
  cells.forEach((cell) => {
    if (cell.classList.contains("empty")) {
      cell.classList.remove("empty");
      cell.classList.add("end-game-cell");
    }
  });
  if (winner === "draw") {
    gameMsg.innerHTML = `Égalité parfaite !`;
  } else if (winner === "xplayer") {
    gameMsg.innerHTML = `Le joueur X a gagné !`;
  } else gameMsg.innerHTML = `Le joueur O a gagné !`;
};

// Pas d'égalité dans ta partie si personne ne gagne alors X gagne !
// Avec la technique que tu as utilisé en passant par les classes tu peux le faire comme ça
// every ne fonctionne pas sur une NodeList qui est une collection. Pour que cela fonctionne, on doit transformer
// notre collection en tableau grave à la destructuration : [...cells]
const checkDraw = () => {
  if ([...cells].every((cell) => !cell.classList.contains("empty"))) {
    winner = "draw";
    return true;
  }
};

const checkWin = () => {
  return winCon.some((combination) => {
    return combination.every((index) => {
      if (isPlayerXTurn) {
        if (cells[index].classList.contains("O-cell")) {
          winner = "oplayer";
          return true;
        }
      } else {
        if (cells[index].classList.contains("X-cell")) {
          winner = "xplayer";
          return true;
        }
      }
    });
  });
};

const startGame = () => {
  isPlayerXTurn = true;
  gameMsg.innerHTML = `C'est au tour du joueur X de jouer.`;
  cells.forEach((cell) => {
    cell.classList.add("empty");
    cell.classList.remove("X-cell");
    cell.classList.remove("O-cell");
    // Retirer la classe "end-game-cell" pour que les carrés noirs disparaissent
    cell.classList.remove("end-game-cell");
    cell.removeEventListener("click", playerClick);
    cell.addEventListener("click", playerClick);
    cell.innerHTML = `X`;
  });
};

restartBtn.onclick = function () {
  startGame();
};

startGame();
