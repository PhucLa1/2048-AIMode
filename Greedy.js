const all_state = new Map() //lưu tất cả các trạng thái của trò chơi
function brute_force(board, depth) {
    let bestScore = -1;
    let allMoves = []
    let bestMove = 'chịu đấy';
    let allScores = [];
    let directions = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];
    for (let j = 0; j < 4; j++) {
        let copy_board = JSON.parse(JSON.stringify(board));
        let new_output = move_brute_force(copy_board, directions[j], 2);

        let new_board = new_output[0];
        let valid = new_output[1];


        if (valid) {
            let new_state = add_new_title(new_board, directions[j]); // Thêm mới một ô với giá trị 2 hoặc 4
            for (const [key, value] of new_state.entries()) {
                let first_move = [directions[j]];
                console.log(first_move)
                let decodedBoard = decodeBoard(key);
                let score = evaluateBoard(decodedBoard);
                if (score >= bestScore) {
                    bestMove = value;
                    bestScore = score;
                }
            }
        }
    }
    //return 1;
    return bestMove;
}


function evaluateBoard(board) {
    let emptyCells = countEmptyCells(board);
    let totalValue = calculateScore(board);

    // Thực hiện một số phép tính hoặc trọng số để tính điểm tổng thể của bảng
    let score = emptyCells * 100 + totalValue;

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





function move_brute_force(board, direction, option) {
    let hasChanged = false;
    if (direction === 'ArrowUp' || direction === 'ArrowDown') {
        for (let j = 0; j < size; j++) {
            const column = [...Array(size)].map((_, i) => board[i][j]);
            const newColumn = transform(option, column, direction === 'ArrowUp');
            for (let i = 0; i < size; i++) {
                if (board[i][j] !== newColumn[i]) {
                    hasChanged = true;
                    board[i][j] = newColumn[i];
                }
            }
        }
    } else if (direction === 'ArrowLeft' || direction === 'ArrowRight') {
        for (let i = 0; i < size; i++) {
            const row = board[i];
            const newRow = transform(option, row, direction === 'ArrowLeft');
            if (row.join(',') !== newRow.join(',')) {
                hasChanged = true;
                board[i] = newRow;
            }
        }
    }
    if (hasChanged) {
        if (option == 1) {
            renderBoard();

        }
        checkGameOver(board, option);

    }
    return [board, hasChanged]
}

//Mã hóa phần bảng ra để có thể lưu vào hash map
function encodeBoard(board) {
    return board.flat().join(",");
}

//Mã hóa ngược
function decodeBoard(encodedString) {
    const flatArray = encodedString.split(",");
    const board = [...Array(4)].map(e => Array(4).fill(0));
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            board[i][j] = parseInt(flatArray[i * 4 + j])
        }
    }
    return board;
}

function add_new_title(board, direction) {
    const new_state = new Map()
    const available = [];
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            if (board[i][j] === 0) {
                available.push({ x: i, y: j });
            }
        }
    }

    if (available.length > 0) {
        let new_title = [2, 4]
        for (let value = 0; value < 2; value++) {
            for (let i = 0; i < available.length; i++) {
                let copy_board = JSON.parse(JSON.stringify(board));
                copy_board[available[i].x][available[i].y] = new_title[value];
                let encodedBoard = encodeBoard(copy_board);
                // Kiểm tra xem trạng thái mới đã tồn tại trong all_state chưa
                if (!all_state.has(encodedBoard)) {
                    new_state.set(encodedBoard, direction);
                    all_state.set(encodedBoard, direction);
                }
            }
        }
    }
    return new_state;
}

// function playGameWithDelay(board) {
//     function playNextMove() {
//         if (!checkGameOver(board, 1) && gameRunning) {
//             let bestMove = brute_force(boardReal,2,[]).bestPath;
//             if(bestMove == 'chịu đấy'){
//                 //gameRunning = false
//             }
//             //console.log(bestMove);
//             //move(boardReal,bestMove,1);
//             //console.log(bestMove)
//             setTimeout(playNextMove, 100); // Gọi lại hàm sau 2 giây
//         }
//     }

//     playNextMove(); // Bắt đầu với lần đầu tiên
// }



// // // Sử dụng hàm playGameWithDelay với board ban đầu
// playGameWithDelay(boardReal);

let out = brute_force(boardReal,1)
console.log(out)