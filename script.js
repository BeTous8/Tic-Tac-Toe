function Gameboard() {
    const rows = 3;
    const columns = 3;
    const board = [];

      for (let i = 0; i < rows; i++) {
        board[i] = []; //create rows inside 2D array
        for (let j = 0; j < columns; j++) {
            board[i].push(Cell());
         }
    }
    // console.log(board[0][0].addToken('X'));

    const dropToken = (row, column, player) => {
        // board.map((row) => row.map((cell) => cell.getValue() === 0).map((cell) => cell.addToken(player)));
        const isEmpthySpot = board[row][column];
        isEmpthySpot.getValue() === 0 ? isEmpthySpot.addToken(player) : console.log('not empty');
    }

    const printBoard = () => {
        const boardCellValues = board.map((row) => row.map((cell) => cell.getValue()));
        console.log(boardCellValues);
    };

    return {dropToken, printBoard};
};

function Cell() {
    let value = 0;

    const addToken = (player) => {
        value = player;
    };

    const getValue = () => value;

    return {
        addToken,
        getValue
    };
};









const game = Gameboard();
const row = prompt("select row: ");
const column = prompt("select column: ");
game.dropToken(row,column,"X");
game.dropToken(2,2,"O");
game.dropToken(2,2,"O");
game.printBoard();



