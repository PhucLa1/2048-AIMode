
// board: Đây là trạng thái hiện tại của 
// bảng hoặc trò chơi. 
// Chúng ta giả định rằng board 
// có thể là một loại dữ liệu nào đó đại diện cho trạng thái của trò chơi.

// searches_per_move: Đây là số lượng lần thực hiện 
// mô phỏng cho mỗi bước di chuyển. Nó xác định mức độ mô phỏng 
// để đánh giá các bước di chuyển khả dĩ.

// search_length: Đây là độ dài của mỗi mô phỏng. 
// Nó xác định số lần di chuyển được thực hiện trong mỗi mô phỏng trước khi kết thúc.
function ai_moves(board,searches_per_move,search_length){
    let first_moves = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight']
    let scores = [0,0,0,0]

    //Chạy lần mô phỏng đầu tiên để giúp thuật toán có thể thực hiện tốt hơn
    for(let first_index = 0;first_index < 4;first_index++){
        let first_move = first_moves[first_index]
        //console.log(board)
        let zero_board = JSON.parse(JSON.stringify(board));
        let output_return = move(zero_board, first_move, 2);

        
        //Lấy ra những đối số trả về 
        let first_board = output_return[0]
        let first_valid = output_return[1]
        let first_score = evaluateBoard(first_board)

        //console.log(first_move,first_board,first_valid,first_score)

        

        if(first_valid){
            scores[first_index] += first_score
            console.log(first_valid)
        }
        else{
            continue
        }

        for (let later_moves = 0;later_moves< searches_per_move;later_moves ++){
            let move_number = 1
            let search_board = JSON.parse(JSON.stringify(first_board));
            let is_valid = true

            while(is_valid && move_number < search_length){
                let output_return_laters = move(search_board, Math.floor(Math.random() * 4), 2);

                //Lấy ra những đối số trả về 
                search_board = output_return_laters[0]
                is_valid = output_return_laters[1]
                const score = evaluateBoard(search_board)
                //console.log(is_valid)

                if(is_valid){
                    scores[first_index] += score
                    move_number += 1
                }
            }
        }
   }

    let best_move_index = scores.reduce((maxIndex, currentValue, currentIndex, arr) => currentValue > arr[maxIndex] ? currentIndex : maxIndex, 0); 

    // //console.log(scores)
    // //TỈm chỉ số của phần tử lớn nhất
    let best_move = first_moves[best_move_index]
    return best_move
}

function evaluateBoard(board) {
    // Đánh giá hiệu suất của bảng, ví dụ: số điểm đạt được hoặc số ô trống
    // Đây có thể là nơi bạn muốn thêm các tiêu chí đánh giá khác để cải thiện hiệu suất
    let score = calculateScore(board);
    return score;
}

function calculateScore(board) {
    // Tính điểm dựa trên trạng thái bảng, ví dụ: tổng giá trị của các ô
    let score = 0;
    for (let i = 0;i < 4; i++) {
        for (let j = 0;j < 4; j++) {
            //console.log(board[i][j])
            score += board[i][j];
        }
    }
    return score;
}


function playGameWithDelay(board) {
    function playNextMove() {
        if (!checkGameOver(board, 1) && gameRunning) {
            let board_fake = JSON.parse(JSON.stringify(boardReal));
            let bestMove = ai_moves(board_fake,10000,10);
            console.log(bestMove);
            move(boardReal,bestMove,1);
            setTimeout(playNextMove, 100); // Gọi lại hàm sau 2 giây
        }
    }

    playNextMove(); // Bắt đầu với lần đầu tiên
}
playGameWithDelay(boardReal)


document.getElementById("toggleButton").addEventListener("click", function() {
    gameRunning = !gameRunning; // Đảo ngược trạng thái của trò chơi (dừng nếu đang chạy và ngược lại)
    if (gameRunning) {
        playGameWithDelay(boardReal); // Nếu trạng thái là true, tiếp tục chạy trò chơi
    }
});



