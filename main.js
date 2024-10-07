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

// Beispiel der Nutzung
Gameboard.setMove(0, 'X'); // Platziert 'X' an Position 0
Gameboard.setMove(5, 'O'); // Platziert 'O' an Position 4
console.log(Gameboard.getBoard()); // Gibt den aktuellen Zustand des Spielbretts aus
Gameboard.resetBoard(); // Setzt das Spielbrett zurück
console.log(Gameboard.getBoard()); // Gibt das zurückgesetzte Spielbrett aus



/* function Player(name, marker) {
        this.name = name;
        this.marker = marker    
}
function setNames() {
    const input1 = document.getElementById('player1').value;
    const input2 = document.getElementById('player2').value;

    const player1 = new Player(input1, 'x');
    const player2 = new Player(input2, 'o');

    document.getElementById('players').innerHTML = `${player1.name} (${player1.marker}) 
    vs ${player2.name} (${player2.marker})`;
}

let gameBoard = [{},{},{},{},{},{},{},{},{}];
let currentPlayer ='x';
let gameActive = 'true';

const cellIndex = document.querySelectorAll('.cell');
        
        // Schleife durch die divs und Index zuweisen
        cellIndex.forEach((cellIndex, index) => {
            cellIndex.dataset.index = index; // Datenattribut 'index' setzen
            console.log(`Index: ${index}`); // Optional: Index im div anzeigen
        });

function makeMove(cell) {
    console.log("test")
    
}

function newStart() {
    // Logic to start a new game
}
 */