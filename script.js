const createPlayer = (marker) => {
  return {marker};
}

const gameBoard = (() => {
  const size = 3;
  const grid = [...Array(size)].map(e => Array(size));

  const checkMove = (x, y) => {
    return grid[x][y] === undefined;
  };

  const addMove = (x, y, marker) => {
    grid[x][y] = marker;
  };

  const checkWin = () => {
    // check rows
    for (let i = 0; i < size; i++) {
      if (grid[i, 0] === grid[i, 1] && grid[i, 0] === grid[i, 2]) {
        return grid[i, 0];
      }
    }

    // check columns
    for (let j = 0; j < size; j++) {
      if (grid[0, j] === grid[1, j] && grid[0, j] === grid[2, j]) {
        return grid[0, j];
      }
    }

    // check diagonals
    if (grid[0,0] === grid[1, 1] && grid[0,0] === grid[2,2]) {
      return grid[0, 0];
    }
    if (grid[0,2] === grid[1, 1] && grid[0,2] === grid[2,0]) {
      return grid[0, 2];
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
        grid[i, j] = undefined;
      }
    }
  };

  return {
    checkMove,
    addMove,
    checkWin,
    checkTie,
    reset,
  };
})();

const game = (() => {
  const playerX = createPlayer("X");
  const playerO = createPlayer("O");
  let currentPlayer = playerX;
  let gameOver = false;

  const newGame = () => {
    gameBoard.reset();
    currentPlayer = playerX;
    gameOver = false;
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

    // check for winner
    winner = gameBoard.checkWin();
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
})();