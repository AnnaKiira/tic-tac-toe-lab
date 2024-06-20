/*-------------------------------- Constants --------------------------------*/
const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]

/*---------------------------- Variables (state) ----------------------------*/
let board = ['', '', '', '', '', '', '', '', ''];
let turn = 'X'; 
let winner = false;
let tie = false;

/*------------------------ Cached Element References ------------------------*/
const squareEls = document.querySelectorAll('.sqr')
const messageEl = document.querySelector('#message')
const resetBtnEl = document.querySelector('#reset')
/* console.log(messageEl, squareEls, resetBtnEl) */

/*-------------------------------- Functions --------------------------------*/
function init () {
    render();
}

function render () {
    updateBoard();
    updateMessage();
}

function updateBoard () {
    board.forEach((currentSquare, index) => {
        const squareElement = squareEls[index];
        squareElement.textContent = currentSquare;

        squareElement.classList.remove('X', 'O', 'Empty')

        if (currentSquare === 'X') {
            squareElement.classList.add('X')
        } else if (currentSquare === 'O') {
            squareElement.classList.add('O')
        } 
        /* console.log('Current Square:', currentSquare, 'Index:', index); */
    });
}


function updateMessage () {
    if (winner) {
        messageEl.textContent = `${winner} is the winner of this game!`;
    } else if (tie) {
        messageEl.textContent = 'It is a tie!';
    } else {
        messageEl.textContent = `It is ${turn}´s turn`;
    }  
    /* console.log(messageEl.textContent) */
}

function handleClick (evt) {
    const squareIndex = evt.target.id;
    if (board[squareIndex] === 'X' || board[squareIndex] === 'O') {
        return;
    }    
    if (winner === true) {
        return;
    }

    placePiece(squareIndex);
    checkForWinner();
    checkForTie();
    switchPlayerTurn();
    render();
    /* console.log('Clicked square index:', squareIndex) */
}

function placePiece (index) {
    board[index] = turn;
    /* console.log(board) */
}

function checkForWinner () {
    winningCombos.forEach((combo) => {
        const [a, b, c] = combo;
        if (board[a] && board[a] === board[b] && board[b] === board[c]) {
            winner = turn
            /* console.log('Winner', turn)  */ 
        }
    
    })
}

function checkForTie () {
    if (winner === true) {
        return
    } else {
        for (let i = 0; i < board.length; i++) {
            if (board[i] === '') {
                tie = false
                return
            }
        }

        tie = true
        /* console.log('Tie:', tie) */
    }    
}

function switchPlayerTurn () {
    if (winner === true) {
        return
    } else if (turn === 'X') {
        turn = 'O'
    } else {
        turn = 'X'
    }
    /* console.log('Current turn:', turn) */
}

/*----------------------------- Event Listeners -----------------------------*/
init()
/* render()
updateBoard()
updateMessage()
placePiece()
checkForWinner()
checkForTie() */

squareEls.forEach(square => {
    square.addEventListener('click', handleClick)

})

resetBtnEl.addEventListener('click', init)
