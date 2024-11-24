const Gameboard = (function() {
    let board = ["", "", "", "", "", "", "", "", ""];

    return {
        getBoard: function() {
            return board;
        },
        setMove: function(position, marker) {
            if (position >= 0 && position < 9 && (marker === "X" || marker === "O") && board[position] === "") {
                board[position] = marker;
                return true;
            }
            return false;
        },
        resetBoard: function() {
            board = ["", "", "", "", "", "", "", "", ""];
        }
    };
})();

function Player(name, marker) {
    return {
        getName: () => name,
        getMarker: () => marker
    };
}

const GameController = (function() {
    let currentPlayer;
    let isGameOver = false;
    const players = [];
    
    function startGame(playerName1, playerName2) {
        players[0] = Player(playerName1 || "Player 1", "X");
        players[1] = Player(playerName2 || "Player 2", "O");
        
        isGameOver = false;
        currentPlayer = players[0];
        Gameboard.resetBoard();
        DisplayController.renderBoard();
        DisplayController.updateMessage(`${currentPlayer.getName()}'s turn`);
    }

    function makeMove(position) {
        if (isGameOver || !Gameboard.setMove(position, currentPlayer.getMarker())) {
            return false;
        }

        if (checkWin()) {
            isGameOver = true;
            DisplayController.updateMessage(`${currentPlayer.getName()} wins!`);
            return true;
        }

        if (checkTie()) {
            isGameOver = true;
            DisplayController.updateMessage("It's a tie!");
            return true;
        }

        switchTurn();
        return true;
    }

    function switchTurn() {
        currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
        DisplayController.updateMessage(`${currentPlayer.getName()}'s turn`);
    }

    function checkWin() {
        const board = Gameboard.getBoard();
        const winningCombos = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6] // Diagonals
        ];

        return winningCombos.some(combo => {
            return board[combo[0]] !== "" &&
                board[combo[0]] === board[combo[1]] &&
                board[combo[1]] === board[combo[2]];
        });
    }

    function checkTie() {
        return Gameboard.getBoard().every(cell => cell !== "");
    }

    function getCurrentPlayer() {
        return currentPlayer;
    }

    return {
        startGame,
        makeMove,
        getCurrentPlayer,
        checkWin,
        checkTie
    };
})();

const DisplayController = (function() {
    function renderBoard() {
        const board = Gameboard.getBoard();
        const cells = document.querySelectorAll('.cell');
        cells.forEach((cell, index) => {
            cell.textContent = board[index];
        });
    }

    function updateMessage(message) {
        const messageElement = document.getElementById('message');
        if (messageElement) {
            messageElement.textContent = message;
        }
    }

    function init() {
        // Bind cell click events
        const cells = document.querySelectorAll('.cell');
        cells.forEach((cell, index) => {
            cell.addEventListener('click', () => {
                if (GameController.makeMove(index)) {
                    renderBoard();
                }
            });
        });

        // Bind button events
        const startBtn = document.getElementById('start-btn');
        const restartBtn = document.getElementById('restart-btn');

        if (startBtn) {
            startBtn.addEventListener('click', () => {
                const player1Name = document.getElementById('player1').value;
                const player2Name = document.getElementById('player2').value;
                GameController.startGame(player1Name, player2Name);
            });
        }

        if (restartBtn) {
            restartBtn.addEventListener('click', () => {
                GameController.startGame(
                    document.getElementById('player1').value,
                    document.getElementById('player2').value
                );
            });
        }
    }

    return {
        renderBoard,
        updateMessage,
        init
    };
})();

// Initialize the game when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    DisplayController.init();
});