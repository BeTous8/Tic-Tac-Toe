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

    // give the board array to UI to render it on the webpage
    const getBoard = () => board;

    const dropToken = (row, column, player) => {
        if (board[row][column].getValue() === 0) {
            board[row][column].addToken(player); // Updating the board directly
        } else {
            console.log('Cell is not empty');
        }
    };

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

    const gameboard = Gameboard();
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
        gameboard.printBoard();
        // console.log(`${getActivePlayer().name}'s turn.`);
      };

    const playRound = (row, column) => {
        // console.log(`the token is: ${getActivePlayer().token}`)
        gameboard.dropToken(row,column, getActivePlayer().token);
        // check for the winner or it there is no cell remains
        // gameIsOver();

        switchPlayer();
        printNewRound();
    }

    const checkWinner = () => {
        const board = gameboard.getBoard();
        for (let i = 0; i < board.length; i++) {
            if (
                board[i][0].getValue() !== 0 &&
                board[i][0].getValue() === board[i][1].getValue() &&
                board[i][1].getValue() === board[i][2].getValue()
            ) {
                console.log('Row match found!');
                return true;
            }

            if (
                board[0][i].getValue() !== 0 &&
                board[0][i].getValue() === board[1][i].getValue() &&
                board[1][i].getValue() === board[2][i].getValue()
            ) {
                console.log('Row match found!');
                return true;
            }


            if (
                board[0][0].getValue() !== 0 &&
                board[0][0].getValue() === board[1][1].getValue() &&
                board[1][1].getValue() === board[2][2].getValue()
            ) {
                console.log('Row match found!');
                return true;
            }

            if (
                board[0][2].getValue() !== 0 &&
                board[0][2].getValue() === board[1][1].getValue() &&
                board[1][1].getValue() === board[2][0].getValue()
            ) {
                console.log('Row match found!');
                return true;
            }
        }
        return false;
    };
    

    
    // we are going to remove while and put addevent listener later
    const gameIsOver = () => {
        // use for loop to loop through and find the x or o in a row, column, or diagnol



        // if (board.checkEmptyCells()) {
        //     }
        }  
        
        //checking for all winning 3-in-a-rows

    return {playRound, switchPlayer, getActivePlayer, checkWinner};

};

// console.log(instance1)

const displayGameboard = (() => {
    // Code to be executed
    const container = document.querySelector('.container')
    const cells = document.querySelectorAll('.cell')
    
    const controlRoom = gameController();

    cells.forEach((cell, index) => {
        cell.addEventListener('click', ()=> {
            const token = controlRoom.getActivePlayer().token;
            const row = Math.floor(index / 3) ;
            const column = index % 3;
            // console.log(`row is ${row}`);
            // console.log(`column is ${column}`)
            
            cell.textContent = controlRoom.getActivePlayer().token;
            controlRoom.playRound(row,column);

            // cell.textContent = token;
            

            
            controlRoom.checkWinner();
        });
    });
  })(); 








