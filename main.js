const Gameboard = (function() {
    let board = ["", "", "", "", "", "", "", "", ""];

    return {
        getBoard: function() {
            return board;
        },
        setMove: function(position, marker) {
            if (position >= 0 && position < 9 && (marker === "X" || marker === "O") && board[position] === "") {
                board[position] = marker;
            }
        },
        resetBoard: function() {
            board = ["", "", "", "", "", "", "", "", ""];
        }
    };
})();

// example usecase
Gameboard.setMove(0, 'X'); 
Gameboard.setMove(5, 'O'); 
console.log(Gameboard.getBoard()); 
Gameboard.resetBoard(); 
console.log(Gameboard.getBoard()); 

//Player Factory
function Player(name, marker) {
    this.name = name;
    this.marker = marker;
    return {
        getName: () => {
            return name;
        },
        getMarker: () => {
            return marker;
        }
    };
}
const player1 = Player("Alice", "X");
console.log(player1.getName());
console.log(player1.getMarker());

const player2 = Player("Bob", "O");
console.log(player2.getName());
console.log(player2.getMarker());

//Game Controller Module (IIFE)
const GameController = (function() {
    // State variables
    let currentPlayer;
    let isGameOver;
    const players = [];

    // Methods
    function startGame() {
        // Initialize or reset the game
        isGameOver = false;
        // Switch between players
        currentPlayer = players[0];
        board = ['', '', '', '', '', '', '', '', ''];

        console.log("Das Spiel hat begonnen. Es ist " + currentPlayer.name + "s Zug.");
    }

    function switchTurn() {
        // Alternate between players
        currentPlayer = (currentPlayer === players[0]) ? players[1] : players[0];
    }

    function makeMove(position) {
        // Check if move is valid
        if (board[position] !== "") {
            console.log("Invalid move. The position is already taken.");
            return;
        }
        // Update the gameboard
        board[position] = currentPlayer.marker; 
        console.log(`Position ${position} marked with ${currentPlayer.marker}`);
        // Check for win/tie
        if (checkWin()) {
            declareWinner();
            isGameOver = true;
            return;
        }
        if (checkTie()) {
            declareWinner();
            isGameOver = true;
            return;
        }
        switchTurn();
    }

    function checkWin() {
        // Check the gameboard for a winning combination
        const winningCombi = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ]

        let hasWon = false;
        winningCombi.forEach(function (combination) {
            if (
                board[combination[0]] == currentPlayer.marker &&
                board[combination[1]] == currentPlayer.marker &&
                board[combination[2]] == currentPlayer.marker 
             ) {
                hasWon = true;
            } else {
                return hasWon = false;
            }
        });
        return hasWon;
    }

    function checkTie() {
        // Check if all positions on the board are filled
        for (let i = 0; i < board.length; i++) {
            if (board[i] === "") {
                return false; // Not a tie if any position is still empty
            }
        }
        // If all positions are filled and no one has won, it's a tie
        return !checkWin(); // Ensure that no one has won before declaring a tie
    }
    

    function declareWinner() {
        // Announce the winner or a tie
        if (checkWin) {
            console.log(`Player ${currentPlayer} wins`)
        } else if (checkTie()) {
            console.log("It's tie")
        }
    }

    function resetGame() {
        // Restart the game by resetting the board and player turns
        board = ['', '', '', '', '', '', '', '', ''];
        isGameOver = false;
        currentPlayer = players[0];
        console.log("Game has been reset. It's " + currentPlayer.name + "'s turn.");
    }

    // Public API
    return {
        startGame,
        switchTurn,
        makeMove,
        checkWin,
        checkTie,
        declareWinner,
        resetGame
    };
})();

//Display Controller Module (IIFE)
const DisplayController = (function() {
    function renderBoard() {
        const cells = document.querySelectorAll('.cell');
        cells.forEach(cell => {
            if (cell.textContent === "X") {
                cell.textContent = 'X';
            } else if(cell.textContent === "O") {
                cell.textContent = 'O';
            } else {
                cell.textContent = '';
            }
        });
    }

    function updateMessage() {
        const message = document.getElementById('message');
        if (isGameOver) {
            if (checkWin()) {
                message.textContent = `Player ${currentPlayer} wins!`;
            } else if(checkTie()) {
                message.textContent = "It's a tie!";
            }
        } else {
            message.textContent = `Player ${currentPlayer}'s turn!`;
        }
    }

    function bindEvents() {
        const cells = document.querySelectorAll('.cell');
        cells.forEach((cell, index) => {
            cell.addEventListener('click', () => {
                const cellPosition = index;
                if (!isGameOver && board[cellPosition] === '') {
                    GameController.makeMove(cellPosition);
                    renderBoard();
                    updateMessage();
                }
            })
        });
    }

    function getPlayerNames() {
        const playerName1 = document.getElementById('player1').value;
        const playerName2 = document.getElementById('player2').value;
        return {playerName1, playerName2};
    }

    function displayWinner() {
        const message = document.getElementById('message');
        
        if (checkWin()) {
            message.textContent = `Player ${currentPlayer} wins!`;
            message.classList.add('winner-message');  // Fügt Styling für Gewinner hinzu
        } else if(checkTie()) {
            message.textContent = "It's a tie!";
            message.classList.add('tie-message');     // Fügt Styling für Unentschieden hinzu
        }
        
        // Optional: Animationsklasse hinzufügen
        message.classList.add('highlight-message');
    }

    return {
        renderBoard,
        updateMessage,
        bindEvents,
        getPlayerNames,
        displayWinner,
    };
})();


