function checkWinner() {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let line of lines) 
    {
        const [a, b, c] = line;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) 
        {
            return board[a];
        }
    }

    return null;
}

function showResult(result) 
{
    messageElement.textContent = result;
    popupMessageElement.textContent = result;
    popupElement.style.display = 'flex';
}

function updatePlayerInfo() 
{
    messageElement.textContent = `${currentPlayer === 'X' ? 'X' : 'O'}'s TURN`;
}

function restartGame() 
{
    board = Array(9).fill(null);
    currentPlayer = 'X';
    winner = null;
    renderBoard();
    updatePlayerInfo();
    popupElement.style.display = 'none';
}

const boardElement = document.getElementById("board");
const messageElement = document.getElementById("message");
const popupElement = document.getElementById("popup");
const popupMessageElement = document.getElementById("popup-message");
const playerInfoTopElement = document.getElementById("playerInfoTop");
const playerInfoBottomElement = document.getElementById("playerInfoBottom");
let board = Array(9).fill(null);
let currentPlayer = 'X';
let winner = null;

function renderBoard() 
{
    boardElement.innerHTML = "";
    board.forEach((value, index) => 
    {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.textContent = value;
        cell.addEventListener("click", () => cellClick(index));
        cell.style.color = value === 'X' ? 'red' : 'green';
        cell.style.fontWeight = 'bold';
        boardElement.appendChild(cell);
    });
}

function isBoardFull()
{
    return board.every(cell => cell !== null);
}

function cellClick(index) 
{
    if (board[index] || winner) return;

    board[index] = currentPlayer;
    renderBoard();

    winner = checkWinner();
    if (winner) 
    {
        showResult(`${currentPlayer === 'X' ? 'X' : 'O'} wins!`);
    } 
    else if (isBoardFull()) 
    {
        showResult("It's a draw!");
    } 
    else
    {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        updatePlayerInfo();
    }
}

renderBoard();
updatePlayerInfo();
