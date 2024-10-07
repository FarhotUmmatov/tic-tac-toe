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
