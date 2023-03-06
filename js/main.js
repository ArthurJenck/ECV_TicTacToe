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
  checkWin();
  if (checkWin()) {
    endGame();
  }
  if (!checkWin()) {
    console.log("pas encore fini");
    checkDraw();
    if (checkDraw()) {
      endGame();
    }
  }
};

const endGame = () => {
  console.log(checkDraw());

  if (checkDraw()) {
    gameMsg.innerHTML = `Et c'est une égalité !`;
  } else if (winner === "xplayer") {
    gameMsg.innerHTML = `Le joueur X a gagné !`;
  } else gameMsg.innerHTML = `Le joueur O a gagné !`;
  cells.forEach((cell) => {
    if (cell.classList.contains("empty")) {
      cell.classList.remove("empty");
      cell.classList.add("end-game-cell");
    }
  });
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

const checkDraw = () => {
  const cellsArr = Array.from(cells);
  return cellsArr.every((cell) => {
    return !cell.classList.contains("empty");
  });
};

const startGame = () => {
  isPlayerXTurn = true;
  gameMsg.innerHTML = `C'est au tour du joueur X de jouer.`;
  cells.forEach((cell) => {
    cell.classList.remove("end-game-cell");
    cell.classList.remove("X-cell");
    cell.classList.remove("O-cell");
    cell.classList.add("empty");
    cell.removeEventListener("click", playerClick);
    cell.addEventListener("click", playerClick);
    cell.innerHTML = `X`;
  });
};

restartBtn.onclick = function () {
  startGame();
};

startGame();
