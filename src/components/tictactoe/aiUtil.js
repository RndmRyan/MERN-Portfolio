const player = 'X'; // Human player
const opponent = 'O'; // AI player

const isMovesLeft = (board) => {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] === '') {
                return true;
            }
        }
    }
    return false;
};

const evaluate = (b) => {
    // Checking for Rows for X or O victory
    for (let row = 0; row < 3; row++) {
        if (b[row][0] === b[row][1] && b[row][1] === b[row][2]) {
            if (b[row][0] === player) {
                return 10;
            } else if (b[row][0] === opponent) {
                return -10;
            }
        }
    }

    // Checking for Columns for X or O victory
    for (let col = 0; col < 3; col++) {
        if (b[0][col] === b[1][col] && b[1][col] === b[2][col]) {
            if (b[0][col] === player) {
                return 10;
            } else if (b[0][col] === opponent) {
                return -10;
            }
        }
    }

    // Checking for Diagonals for X or O victory
    if (b[0][0] === b[1][1] && b[1][1] === b[2][2]) {
        if (b[0][0] === player) {
            return 10;
        } else if (b[0][0] === opponent) {
            return -10;
        }
    }

    if (b[0][2] === b[1][1] && b[1][1] === b[2][0]) {
        if (b[0][2] === player) {
            return 10;
        } else if (b[0][2] === opponent) {
            return -10;
        }
    }

    return 0;
};

const minimax = (board, depth, isMax, alpha = -1000, beta = 1000) => 
{
    const score = evaluate(board);

    if (score === 10) return score;
    if (score === -10) return score;

    if (!isMovesLeft(board)) return 0;

    if (isMax) {
        let best = -1000;

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] === '') {
                    board[i][j] = player;
                    best = Math.max(best, minimax(board, depth + 1, !isMax, alpha, beta));
                    board[i][j] = '';
                    alpha = Math.max(alpha, best);

                    if (beta <= alpha) break;
                }
            }
        }
        return best;
    } else {
        let best = 1000;

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] === '') {
                    board[i][j] = opponent;
                    best = Math.min(best, minimax(board, depth + 1, !isMax, alpha, beta));
                    board[i][j] = '';
                    beta = Math.min(beta, best);

                    if (beta <= alpha) break;
                }
            }
        }
        return best;
    }
};

const findBestMove = (board) => {
    let bestVal = 1000;
    let bestMove = { row: -1, col: -1 };

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] === '') {
                board[i][j] = opponent;
                const moveVal = minimax(board, 0, false);
                board[i][j] = '';

                if (moveVal < bestVal) {
                    bestMove = { row: i, col: j };
                    bestVal = moveVal;
                }
            }
        }
    }

    return bestMove;
};

export { findBestMove };