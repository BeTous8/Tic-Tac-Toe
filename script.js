const Gameboard = function () {
    const rows = 3;
    const columns = 3;
    const board = [];

      for (let i = 0; i < rows; i++) {
        board[i] = []; //create rows inside 2D array
        for (let j = 0; j < columns; j++) {
            board[i].push(Cell());
         }
    }

    // give the board array to UI to render it on the webpage
    const getBoard = () => board;

    const dropToken = (row, column, player) => {
        // board.map((row) => row.map((cell) => cell.getValue() === 0).map((cell) => cell.addToken(player)));
        const isEmpthySpot = board[row][column];
        isEmpthySpot.getValue() === 0 ? isEmpthySpot.addToken(player) : console.log('not empty');
    }

    const printBoard = () => {
        const boardCellValues = board.map((row) => row.map((cell) => cell.getValue()));
        console.log(boardCellValues);
    };

    const checkEmptyCells = () => {
        const emptyCells = board.flatMap((row) => row.filter((cell) => cell.getValue() === 0));
        console.log(emptyCells.length); // Number of empty cells
        return emptyCells.length > 0;
      };
      

    return {getBoard, dropToken, printBoard, checkEmptyCells};
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



function gameController(
    playerOneName = 'player 1',
    playerTwoName = 'player 2',
) {

    const board = Gameboard();
    const player = [
        {
            name : playerOneName,
            token : "X"
        },
        {
            name : playerTwoName,
            token : "O"
        }
    ]

    let currentPlayer = player[0];

    const switchPlayer = () => {
        currentPlayer = currentPlayer === player[0] ? player[1] : player[0];
    }

    const getActivePlayer = () => currentPlayer;

    const printNewRound = () => {
        board.printBoard();
        console.log(`${getActivePlayer().name}'s turn.`);
      };

    const playRound = (row, column) => {
        board.dropToken(row,column, getActivePlayer().token);
        // check for the winner or it there is no cell remains
        // gameIsOver();

        switchPlayer();
        printNewRound();
    }

    
    // we are going to remove while and put addevent listener later
    const gameIsOver = () => {
        if (board.checkEmptyCells()) {
            }
        }  
        
        //checking for all winning 3-in-a-rows

    return {playRound, switchPlayer, getActivePlayer};

};


const game = gameController();
const instance1 = game.playRound(0, 0);
const instance2 = game.playRound(1, 1);
const instance3 = game.playRound(1, 0);
const instance4 = game.playRound(1, 2);
const instance5 = game.playRound(2, 0);


// console.log(instance1)

// const displayGameboard = (function() {
//     // Code to be executed
//   })(); 




// const game = Gameboard();
// const row = prompt("select row: ");
// const column = prompt("select column: ");
// game.dropToken(row,column,"X");
// game.dropToken(2,2,"O");
// game.dropToken(2,2,"O");
// game.printBoard();





