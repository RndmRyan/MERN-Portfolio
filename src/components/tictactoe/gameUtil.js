export const initializeBoard = (starter) => {
    const initialBoard = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];
    return initialBoard;
};

export const checkWinner = (board) => {
    const lines = [
        // Horizontal lines
        [board[0][0], board[0][1], board[0][2]],
        [board[1][0], board[1][1], board[1][2]],
        [board[2][0], board[2][1], board[2][2]],
        // Vertical lines
        [board[0][0], board[1][0], board[2][0]],
        [board[0][1], board[1][1], board[2][1]],
        [board[0][2], board[1][2], board[2][2]],
        // Diagonal lines
        [board[0][0], board[1][1], board[2][2]],
        [board[0][2], board[1][1], board[2][0]],
    ];

    for (let line of lines) {
        if (line[0] && line[0] === line[1] && line[0] === line[2]) {
            return line[0];
        }
    }

    return null;
};

export const isBoardFull = (board) => {
    for (let row of board) {
        for (let cell of row) {
            if (cell === '') {
                return false;
            }
        }
    }
    return true;
};