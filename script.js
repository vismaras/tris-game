document.addEventListener('DOMContentLoaded', () => {
    const statusDisplay = document.getElementById('status');
    const boardElement = document.getElementById('board');
    const restartButton = document.getElementById('restartBtn');
    const cells = document.querySelectorAll('.cell');
    
    let gameActive = true;
    let currentPlayer = 'X';
    let gameState = ['', '', '', '', '', '', '', '', ''];
    
    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    
    const messages = {
        playerTurn: () => `Turno di ${currentPlayer}`,
        gameWin: () => `Giocatore ${currentPlayer} ha vinto!`,
        gameDraw: () => `Pareggio!`,
    };
    
    function handleCellClick(clickedCellEvent) {
        const clickedCell = clickedCellEvent.target;
        const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));
        
        if (gameState[clickedCellIndex] !== '' || !gameActive) {
            return;
        }
        
        handleCellPlayed(clickedCell, clickedCellIndex);
        handleResultValidation();
    }
    
    function handleCellPlayed(clickedCell, clickedCellIndex) {
        gameState[clickedCellIndex] = currentPlayer;
        clickedCell.textContent = currentPlayer;
        clickedCell.classList.add(currentPlayer.toLowerCase());
    }
    
    function handleResultValidation() {
        let roundWon = false;
        for (let i = 0; i < winningConditions.length; i++) {
            const [a, b, c] = winningConditions[i];
            const condition = gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c];
            if (condition) {
                roundWon = true;
                break;
            }
        }
        
        if (roundWon) {
            statusDisplay.textContent = messages.gameWin();
            gameActive = false;
            return;
        }
        
        const roundDraw = !gameState.includes('');
        if (roundDraw) {
            statusDisplay.textContent = messages.gameDraw();
            gameActive = false;
            return;
        }
        
        handlePlayerChange();
    }
    
    function handlePlayerChange() {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusDisplay.textContent = messages.playerTurn();
    }
    
    function handleRestartGame() {
        gameActive = true;
        currentPlayer = 'X';
        gameState = ['', '', '', '', '', '', '', '', ''];
        statusDisplay.textContent = messages.playerTurn();
        
        cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('x', 'o');
        });
    }
    
    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    restartButton.addEventListener('click', handleRestartGame);
    
    statusDisplay.textContent = messages.playerTurn();
});