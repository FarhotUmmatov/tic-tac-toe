function Player(name, marker) {
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
