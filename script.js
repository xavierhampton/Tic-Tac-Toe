const grid = document.querySelector('.game').children;
const banner = document.querySelector('.banner');
let player1 = document.querySelector('input.X');
let player2 = document.querySelector('input.O');
const btn = document.querySelector('.button');

player1Card = document.querySelector('.p1');
player2Card = document.querySelector('.p2');

let curPlayer = 'X';
let gameStatus = false;

const game = (function () {
    let gameBoard = [];

    const initBoard = () => {
        gameBoard = [['','',''],['','',''],['','','']];
    };

    const checkWin = (player) => {
        for (let i = 0; i < 3; i++){
            if ((player === gameBoard[i][0] && player === gameBoard[i][1] && player === gameBoard[i][2]) || 
            (player === gameBoard[0][i] && player === gameBoard[1][i] && player === gameBoard[2][i]) || (player === gameBoard[0][0] && player === gameBoard[1][1] && player === gameBoard[2][2]) ||
            (player === gameBoard[0][2] && player === gameBoard[1][1] && player === gameBoard[2][0])) {
                if (player == 'X') {
                    resetBoardColor();
                    banner.textContent = `${player1.value} Wins the round!`;
                    score = document.querySelector('.player-score.X');
                    newScore = parseInt(score.textContent) + 1;
                    score.textContent = `${newScore}`;
                    gameStatus = false;
                    return true;
                }
                else if (player == 'O') {
                    resetBoardColor();
                    banner.textContent = `${player2.value} Wins the round!`;
                    score = document.querySelector('.player-score.O');
                    newScore = parseInt(score.textContent) + 1;
                    score.textContent = `${newScore}`;
                    gameStatus = false;
                    return true;
                }
            }
            }

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (gameBoard[i][j] == '') {
                    return false;
                }
            }
        }

        resetBoardColor();
        banner.textContent = 'Oh No!!! You Tied! Press start to play again!';
        btn.textContent = 'Start';
        gameStatus = false;
        player2Card.style.backgroundColor = '';
        player1Card.style.backgroundColor = ''
        return;
    };

    const updateBoard = () => {
        for (let child = 0; child < 9; child++) {
            grid[child].textContent = gameBoard[(parseInt(child / 3))][(child % 3)];
        }
    };

    const playMove = (player, idx) => {
        if (checkBoard(idx)) {
            return;
        }
        gameBoard[(parseInt(idx / 3))][(idx % 3)] = player;
        updateBoard();
        return checkWin(player);
    };

    const checkBoard = (idx) => {
        if (gameBoard[(parseInt(idx / 3))][(idx % 3)] !== '') {
            return true;
        }
        return false;
    };

    const resetBoardColor = () => {
        for (let i=0; i < 9; i++) {
            grid[i].style.color = 'rgba(255,255,255,0.1)';
        }
    }

    const resetGame = () => {
        initBoard();
        updateBoard();
    };

    resetGame();
    return {playMove, resetGame, checkBoard, resetBoardColor};

})();

for (let i = 0; i < 9; i++) {
    grid[i].addEventListener('click', () => {
        if (gameStatus === true) {
            playStatus = game.playMove(curPlayer, i);
            if (playStatus === true) {
                grid[i].style.color = 'rgba(255,255,255,0.9)';
                curPlayer = 'X';
                gameStatus = false;
                btn.textContent = 'Start';
                player2Card.style.backgroundColor = '';
                player1Card.style.backgroundColor = '';
            }
            else if (playStatus === false) {
                grid[i].style.color = 'rgba(255,255,255,0.9)';
                if (curPlayer == 'X') {
                    curPlayer = 'O';
                    player1Card.style.backgroundColor = '';
                    player2Card.style.backgroundColor = 'rgba(80, 255, 80, 0.1)';
                    banner.textContent = `It's now ${player2.value}'s turn.`;
                }
                else if (curPlayer == 'O') {
                    curPlayer = 'X';
                    player2Card.style.backgroundColor = '';
                    player1Card.style.backgroundColor = 'rgba(80, 255, 80, 0.1)';
                    banner.textContent = `It's now ${player1.value}'s turn.`;
                }
            }
        }
    });
    grid[i].addEventListener('mousemove', () => {
        if ((game.checkBoard(i) == false) && gameStatus) {
            grid[i].textContent = curPlayer;
        }
    });
    grid[i].addEventListener('mouseout', () => {
        if (game.checkBoard(i) == false) {
            grid[i].textContent = ''
        }
    });
};

btn.addEventListener('click', () => {
    gameStatus = true;
    game.resetGame();
    curPlayer = 'X';
    player2Card.style.backgroundColor = '';
    player1Card.style.backgroundColor = 'rgba(80, 255, 80, 0.1)';
    btn.textContent = 'Restart';
    banner.textContent = `Lets Start! ${player1.value}'s turn.`;
    resetBoardColor();
});