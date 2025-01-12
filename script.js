function Gameboard() {
    const rows = 3;
    const columns = 3;
    const board = [];
    
    // Create 2D Array
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
            board[row][column].addToken(player); 
        }
    };

    const printBoard = () => {
        const boardCellValues = board.map((row) => row.map((cell) => cell.getValue()));
        console.log(boardCellValues);
    };

    const checkAllCellsFull = () => {
        const emptyCells = board.flatMap((row) => row.filter((cell) => cell.getValue() === 0));
        return emptyCells.length === 0;
      };

    
    const clearBoard = () => {
        //recreate the board with brand new cells
        for (let i = 0; i < rows; i++) {
            board[i] = []; 
            for (let j = 0; j < columns; j++) {
                board[i].push(Cell());
             }
        }
    
    }

    return {getBoard, dropToken, printBoard, checkAllCellsFull, clearBoard};
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



function gameController() {

    const form = document.querySelector('#playerForm');
    const start = document.querySelector('.start');
    const cells = document.querySelectorAll('.cell');
    const billboard = document.querySelector('.topic');
    const reset = document.querySelector('.reset');
    const newGame = document.querySelector('.newGame');

    let player = [];
    let currentPlayer;

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        start.style.animation = 'none';
        cells.forEach(cell => {
            cell.style.pointerEvents = 'auto'; 
        })

        const playerOneName = document.querySelector('#player1').value;
        const playerTwoName = document.querySelector('#player2').value;

    player = [
        {
            name : playerOneName,
            token : "X"
        },
        {
            name : playerTwoName,
            token : "O"
        }
    ]

        currentPlayer = player[0];
        printScoreBoard();
        // disabling the input field after the game is started
        document.querySelector('#player1').setAttribute('disabled', true);
        document.querySelector('#player2').setAttribute('disabled', true);

    });

    const gameboard = Gameboard();
    const board = gameboard.getBoard();

    const switchPlayer = () => {
        currentPlayer = currentPlayer === player[0] ? player[1] : player[0];
    }

    const getActivePlayer = () => currentPlayer;

    const printNewRound = () => {
        gameboard.printBoard();
        // console.log(`${getActivePlayer().name}'s turn.`);
      };
    
    const printScoreBoard = () => {
        const billboard = document.querySelector('.topic');
        billboard.textContent = `${currentPlayer.name}'s turn`;
        if (gameboard.checkAllCellsFull()) {
            billboard.textContent = "The Game is Draw..";
        }
    }

    const playRound = (row, column) => {
        // console.log(`the token is: ${getActivePlayer().token}`)
        gameboard.dropToken(row,column, getActivePlayer().token);
        

        
        printNewRound();
    }

    const checkWinner = () => {
        
        const result = document.querySelector('.result');
        for (let i = 0; i < board.length; i++) {
            if (
                board[i][0].getValue() !== 0 &&
                board[i][0].getValue() === board[i][1].getValue() &&
                board[i][1].getValue() === board[i][2].getValue()
            ) {
                console.log('Row match found!');
                
                
                billboard.textContent = '';
                billboard.textContent = `${currentPlayer.name} has won!`;
                return true;
            }

            if (
                board[0][i].getValue() !== 0 &&
                board[0][i].getValue() === board[1][i].getValue() &&
                board[1][i].getValue() === board[2][i].getValue()
            ) {
                console.log('Row match found!');
                billboard.textContent = '';
                billboard.textContent = `${currentPlayer.name} has won!`;
                return true;
            }


            if (
                board[0][0].getValue() !== 0 &&
                board[0][0].getValue() === board[1][1].getValue() &&
                board[1][1].getValue() === board[2][2].getValue()
            ) {
                console.log('Row match found!');
                billboard.textContent = '';
                billboard.textContent = `${currentPlayer.name} has won!`;
                return true;
            }

            if (
                board[0][2].getValue() !== 0 &&
                board[0][2].getValue() === board[1][1].getValue() &&
                board[1][1].getValue() === board[2][0].getValue()
            ) {
                console.log('Row match found!');
                billboard.textContent = '';
                billboard.textContent = `${currentPlayer.name} has won!`;
                return true;
            }
        }

        switchPlayer();
        return false;
    };

    const winnerAnimation = () => {        
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
        });
        billboard.classList.add('winning-effect');
    }
    
    reset.addEventListener('click', () => {
        gameboard.clearBoard();
        

        cells.forEach(cell => {
            cell.textContent = '';
            cell.style.pointerEvents = 'auto';
        })

        switchPlayer();
        const billboard = document.querySelector('.topic');
        billboard.classList.remove('winning-effect');
        billboard.textContent = `${currentPlayer.name}'s turn`;
        
    });    
    


    newGame.addEventListener('click', () => {
        
        gameboard.clearBoard();

        cells.forEach(cell => {
            cell.textContent = '';
            cell.style.pointerEvents = 'none'; 
        })
        
        start.style.animation = '';
        start.style.pointerEvents = 'auto';

        const input1= document.querySelector('#player1');
        const input2= document.querySelector('#player2');
        input1.value = '';
        input1.removeAttribute('disabled');
        input2.value = '';
        input2.removeAttribute('disabled');

        const billboard = document.querySelector('.topic');
        billboard.classList.remove('winning-effect');
        billboard.textContent = 'Enter player names to start the game'
        
    });    
    
    
    
    
    return {playRound, switchPlayer, getActivePlayer, checkWinner,printScoreBoard, winnerAnimation};

};

// console.log(instance1)

const displayGameboard = (() => {
    
    const cells = document.querySelectorAll('.cell');
    const start = document.querySelector('.start');
    const billboard = document.querySelector('.topic');

    const controlRoom = gameController();

    billboard.textContent = 'Enter player names to start the game'

    // controlRoom.printScoreBoard();
    cells.forEach((cell, index) => {
        cell.addEventListener('click', ()=> {
            const token = controlRoom.getActivePlayer().token;
            const row = Math.floor(index / 3) ;
            const column = index % 3;
            // console.log(`row is ${row}`);
            // console.log(`column is ${column}`)
            
            if (token === 'X') {
                cell.innerHTML = '<img src="./cross.png" alt="X" width=60px>';
            }

            else if (token === 'O') {
                cell.innerHTML = '<img src="./circle.png" alt="O" width=60px>';
            }

            controlRoom.playRound(row,column);

            if (controlRoom.checkWinner()) {
                cells.forEach(cell => {
                cell.style.pointerEvents = 'none'; // Disables clicking
                });
                start.style.pointerEvents = 'none';
                controlRoom.winnerAnimation();

                
                
            }
            else {
                controlRoom.printScoreBoard();
            };
            cell.style.pointerEvents = 'none';
        });
        
        
    });

  })(); 








