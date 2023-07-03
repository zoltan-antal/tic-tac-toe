const createPlayer = (name, marker) => {
  return {name, marker};
}

const gameBoard = (() => {
  const size = 3;
  const grid = [...Array(size)].map(e => Array(size));
  const gridElement = document.querySelector(".grid");

  const checkMove = (x, y) => {
    return grid[x][y] === undefined;
  };

  const addMove = (x, y, marker) => {
    grid[x][y] = marker;
  };

  const checkWin = () => {
    // check rows
    for (let i = 0; i < size; i++) {
      if (grid[i][0] &&
          grid[i][0] === grid[i][1] &&
          grid[i][0] === grid[i][2]) {
        return grid[i][0];
      }
    }
    
    // check columns
    for (let j = 0; j < size; j++) {
      if (grid[0][j] &&
          grid[0][j] === grid[1][j] &&
          grid[0][j] === grid[2][j]) {
        return grid[0][j];
      }
    }

    // check diagonals
    if (grid[0][0] === grid[1][1] && grid[0][0] === grid[2][2]) {
      return grid[0][0];
    }
    if (grid[0][2] === grid[1][1] && grid[0][2] === grid[2][0]) {
      return grid[0][2];
    }

    return false;
  };

  const checkTie = () => {
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        if (!grid[i][j]) {
          return false;
        }
      }
    }
    return true;
  };

  const reset = () => {
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        grid[i][j] = undefined;
      }
    }
  };

  const drawBoard = () => {
    // Clear grid element's contents
    while (gridElement.firstChild) {
      gridElement.removeChild(gridElement.lastChild);
    }

    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        const p = document.createElement("p");
        if (grid[i][j]) {
          p.textContent = grid[i][j];
        }

        const div = document.createElement("div")
        div.classList.add("square");
        div.appendChild(p);
        div.addEventListener("click", () => game.nextMove(i, j));

        gridElement.appendChild(div);
      }
    }
  }

  return {
    checkMove,
    addMove,
    checkWin,
    checkTie,
    reset,
    drawBoard,
  };
})();

const game = (() => {
  const playerX = createPlayer("X", "╳");
  const playerO = createPlayer("O", "◯");
  let currentPlayer = playerX;
  let gameOver = false;
  const restartButton = document.querySelector(".button#restart");
  const infoText = document.querySelector(".info");

  restartButton.addEventListener("click", () => newGame());

  const newGame = () => {
    gameBoard.reset();
    gameBoard.drawBoard();
    currentPlayer = playerX;
    gameOver = false;
    infoText.textContent = `${currentPlayer.name}'s turn`;
  };

  const nextMove = (x, y) => {
    // check if somebody has already won
    if (gameOver) {
      return
    }

    // check if move is allowed
    if (!gameBoard.checkMove(x, y)) {
      return;
    }

    gameBoard.addMove(x, y, currentPlayer.marker);
    gameBoard.drawBoard();

    // check for winner
    let winnerMarker = gameBoard.checkWin();
    if (winnerMarker) {
      const winnerPlayer = (winnerMarker === playerO.marker ? playerO : playerX);
      infoText.textContent = `${winnerPlayer.name} wins!`
      gameOver = true;
      return;
    }

    // check for tie
    if (gameBoard.checkTie()) {
      infoText.textContent = "It's a tie!"
      gameOver = true;
      return;
    }

    // switch current player
    if (currentPlayer === playerX) {
      currentPlayer = playerO;
    } else {
      currentPlayer = playerX;
    }

    // display next (new current) player
    infoText.textContent = `${currentPlayer.name}'s turn`;
  }

  return {
    newGame,
    nextMove,
  };
})();

game.newGame();