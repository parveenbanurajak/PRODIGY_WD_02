const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('reset-button');
const gameStatus = document.getElementById('game-status');
let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

cells.forEach(cell => {
    cell.addEventListener('click', handleClick);
});

resetButton.addEventListener('click', resetGame);

function handleClick(e) {
    const index = e.target.dataset.index;

    if (board[index] === '' && !gameStatus.textContent.includes('wins')) {
        board[index] = currentPlayer;
        e.target.textContent = currentPlayer;

        if (checkWin(currentPlayer)) {
            gameStatus.innerHTML = `<span>${currentPlayer} wins! 🎉</span>`;
            animateWin();
        } else if (board.every(cell => cell !== '')) {
            gameStatus.textContent = 'Draw! 😐';
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }
}

function checkWin(player) {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return board[index] === player;
        });
    });
}

function resetGame() {
    resetBoard();
    gameStatus.textContent = '';
}

function resetBoard() {
    board = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => {
        cell.textContent = '';
    });
    currentPlayer = 'X';
}

function animateWin() {
    const span = gameStatus.querySelector('span');
    span.style.display = 'inline-block';
    span.style.animation = 'pop 0.3s ease-in-out forwards';
}

