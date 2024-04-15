function monteCarloPlay() {
    const moves = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];
    const iterations = 1000;
    let scores = {};

    for (let move of moves) {
        scores[move] = 0;
    }

    for (let i = 0; i < iterations; i++) {
        for (let move of moves) {
            let simulatedOutput = simulateMove(move);
            if(simulatedOutput[1] == false){
                continue
            }
            let score = evaluateBoard(simulatedOutput[0]);
            scores[move] += score;
        }
    }

    let bestMove = moves[0];
    let bestScore = scores[moves[0]];
    for (let move of moves) {
        if (scores[move] > bestScore) {
            bestScore = scores[move];
            bestMove = move;
        }
    }

    return bestMove;
}

function simulateMove(direction) {
    // Tạo bản sao của trạng thái hiện tại của bảng
    let simulatedBoard = JSON.parse(JSON.stringify(boardReal));
    //console.log(simulatedBoard)

    // Di chuyển trạng thái bảng
    let out_put = move(simulatedBoard,direction,2);

    return [simulatedBoard,out_put[1]];
}

function evaluateBoard(board) {
    let emptyCells = countEmptyCells(board);
    let totalValue = calculateScore(board);
    let smoothness = calculateSmoothness(board);

    // Thực hiện một số phép tính hoặc trọng số để tính điểm tổng thể của bảng
    let score = emptyCells * 100 + totalValue + smoothness;

    return score;
}

function calculateScore(board) {
    // Tính điểm dựa trên trạng thái bảng, ví dụ: tổng giá trị của các ô
    let score = 0;
    for (let row of board) {
        for (let cell of row) {
            score += cell;
        }
    }
    return score;
}

//Tính các ô trống trên bảng
function countEmptyCells(board) {
    let count = 0;
    for (let row of board) {
        for (let cell of row) {
            if (cell === 0) {
                count++;
            }
        }
    }
    return count;
}

// Hàm tính mức độ đồng đều của giá trị các ô trên bảng
// Hàm tính mức độ đồng đều của giá trị các ô trên bảng
function calculateSmoothness(board) {
    let smoothness = 0;
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length - 1; j++) {
            smoothness += Math.abs(board[i][j] - board[i][j + 1]);
            smoothness += Math.abs(board[j][i] - board[j + 1][i]);
        }
    }
    return smoothness;
}
function playGameWithDelay(board) {
    function playNextMove() {
        if (!checkGameOver(board, 1) && gameRunning) {
            let bestMove = monteCarloPlay();
            console.log(bestMove);
            move(boardReal,bestMove,1);
            setTimeout(playNextMove, 100); // Gọi lại hàm sau 2 giây
        }
    }

    playNextMove(); // Bắt đầu với lần đầu tiên
}



// Sử dụng hàm playGameWithDelay với board ban đầu
playGameWithDelay(boardReal);
