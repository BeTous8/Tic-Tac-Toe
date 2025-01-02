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
    console.log(board)
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
}

Gameboard();

