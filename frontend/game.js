const boardSize = 8;
const boardEl = document.getElementById('board');
const statusEl = document.getElementById('status');
const resetBtn = document.getElementById('resetBtn');

let selected = null;
let board = [];
let currentTurn = 'player';

function createInitialBoard() {
  const grid = Array.from({ length: boardSize }, () => Array(boardSize).fill(null));

  for (let col = 1; col < boardSize; col += 2) {
    grid[0][col] = 'enemy';
    grid[1][(col + 1) % boardSize] = 'enemy';
  }

  for (let col = 0; col < boardSize; col += 2) {
    grid[boardSize - 1][col] = 'player';
    grid[boardSize - 2][(col + 1) % boardSize] = 'player';
  }

  return grid;
}

function inBounds(row, col) {
  return row >= 0 && col >= 0 && row < boardSize && col < boardSize;
}

function setStatus(message) {
  statusEl.textContent = message;
}

function countPieces(type) {
  return board.flat().filter((cell) => cell === type).length;
}

function checkWin() {
  const playerCount = countPieces('player');
  const enemyCount = countPieces('enemy');

  if (enemyCount === 0) {
    setStatus('You win! All enemy units captured.');
    currentTurn = 'done';
    return true;
  }

  if (playerCount === 0) {
    setStatus('Enemy wins! Try again.');
    currentTurn = 'done';
    return true;
  }

  return false;
}

function enemyMove() {
  const enemies = [];
  for (let row = 0; row < boardSize; row += 1) {
    for (let col = 0; col < boardSize; col += 1) {
      if (board[row][col] === 'enemy') {
        enemies.push({ row, col });
      }
    }
  }

  const directions = [
    { r: 1, c: 0 },
    { r: 0, c: -1 },
    { r: 0, c: 1 },
    { r: -1, c: 0 }
  ];

  for (const enemy of enemies) {
    const shuffled = directions.slice().sort(() => Math.random() - 0.5);
    for (const dir of shuffled) {
      const nextRow = enemy.row + dir.r;
      const nextCol = enemy.col + dir.c;
      if (!inBounds(nextRow, nextCol) || board[nextRow][nextCol] === 'enemy') {
        continue;
      }

      board[nextRow][nextCol] = 'enemy';
      board[enemy.row][enemy.col] = null;
      renderBoard();
      checkWin();
      currentTurn = currentTurn === 'done' ? 'done' : 'player';
      if (currentTurn === 'player') {
        setStatus('Your turn. Select a blue unit.');
      }
      return;
    }
  }

  currentTurn = 'player';
  setStatus('Enemy has no moves. Your turn.');
}

function onTileClick(row, col) {
  if (currentTurn !== 'player') {
    return;
  }

  const cell = board[row][col];

  if (!selected) {
    if (cell === 'player') {
      selected = { row, col };
      renderBoard();
      setStatus('Unit selected. Click an adjacent tile.');
    }
    return;
  }

  const isAdjacent = Math.abs(selected.row - row) + Math.abs(selected.col - col) === 1;
  if (!isAdjacent || board[row][col] === 'player') {
    selected = null;
    renderBoard();
    setStatus('Invalid move. Select a unit and try again.');
    return;
  }

  board[row][col] = 'player';
  board[selected.row][selected.col] = null;
  selected = null;
  renderBoard();

  if (checkWin()) {
    return;
  }

  currentTurn = 'enemy';
  setStatus('Enemy is moving...');
  setTimeout(enemyMove, 500);
}

function renderBoard() {
  boardEl.innerHTML = '';

  for (let row = 0; row < boardSize; row += 1) {
    for (let col = 0; col < boardSize; col += 1) {
      const tile = document.createElement('button');
      tile.className = `tile ${(row + col) % 2 === 0 ? 'light' : 'dark'}`;

      if (selected && selected.row === row && selected.col === col) {
        tile.classList.add('selected');
      }

      const pieceType = board[row][col];
      if (pieceType) {
        const piece = document.createElement('div');
        piece.className = `piece ${pieceType}`;
        tile.appendChild(piece);
      }

      tile.addEventListener('click', () => onTileClick(row, col));
      boardEl.appendChild(tile);
    }
  }
}

function resetGame() {
  board = createInitialBoard();
  selected = null;
  currentTurn = 'player';
  renderBoard();
  setStatus('Your turn. Select a blue unit.');
}

resetBtn.addEventListener('click', resetGame);
resetGame();
