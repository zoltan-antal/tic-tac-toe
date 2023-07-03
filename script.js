const createPlayer = (marker) => {
  return {marker};
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
    console.log("checking rows");
    for (let i = 0; i < size; i++) {
      if (grid[i][0] === grid[i][1] && grid[i][0] === grid[i][2]) {
        return grid[i][0];
      }
    }
    
    // check columns
    console.log("checking columns");
    for (let j = 0; j < size; j++) {
      if (grid[0][j] === grid[1][j] && grid[0][j] === grid[2][j]) {
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
        if (grid[i][j]) {
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
  const playerX = createPlayer("╳");
  const playerO = createPlayer("◯");
  let currentPlayer = playerX;
  let gameOver = false;

  const newGame = () => {
    gameBoard.reset();
    gameBoard.drawBoard();
    currentPlayer = playerX;
    gameOver = false;
  };

  const nextMove = (x, y) => {
    console.log("processing next move");

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
    winner = gameBoard.checkWin();
    console.log(winner);
    if (winner) {
      gameOver = true;
    }

    // check for tie
    if (gameBoard.checkTie()) {
      gameOver = true;
    }

    if (currentPlayer === playerX) {
      currentPlayer = playerO;
    } else {
      currentPlayer = playerX;
    }
  }

  return {
    newGame,
    nextMove,
  };
})();

game.newGame();