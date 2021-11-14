//We stored our game status here to use it easier later 
const statusDisplay = document.querySelector('.game--status');

/*
Here we created some variables that we´ll use to track the 
game state throught the game. 
*/

//We will use gameActive to pause the game in case of an end scenario
let gameActive = true;
//We will store our current player here, so we know whos turn 
let currentPlayer = "X";
/*
We will store our current game state here, the form of empty strings in an array
 will allow us to easily track played cells and validate the game state later on
*/
let gameState = ["", "", "", "", "", "", "", "", ""];

//Here we have declared some messages we will display to the user during the game.
const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

//We set the inital message to let the players know whose turn it is
statusDisplay.innerHTML = currentPlayerTurn();


//Here we update our gameState and our UI
function handleCellPlayed(clickedCell, clickedCellIndex) {          
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
};

function handlePlayerChange() {

}

function handleResultValidation() {
    let roundWon = false;

//Values in arrays for our are indexes for cells that need to be populated to be considered a victor.
//(By the same player)
    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

//for-loop go through each one and check whether the elements of our game state array under those indexes match.
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
//If they match we move on
        if (a === '' || b === '' || c === '') {
            continue;
        }
//And declare the victory
        if (a === b && b === c) {
            roundWon = true;
            break
        }
    }
if (roundWon) {
//when won a message is dispplayed
    statusDisplay.innerHTML = winningMessage();
    gameActive = false;
    return;
}

//We will check if there are any values that are still not populated
let roundDraw = !gameState.includes("");
if (roundDraw) {
//and display a message if ended in draw
    statusDisplay.innerHTML = drawMessage();
    gameActive = false;
    return;
}

//If we get to here no one won the game yet, so we continue by changing the current player.
handlePlayerChange();
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = currentPlayerTurn();
}
        


//Here we track which cell has been clicked and get it*/
function handleCellClick(clickedCellEvent) {
//saving the html element in a variable to use it easier
    const clickedCell = clickedCellEvent.target;
//Here we will take the 'data-cell-index' attribute
//from the clicked cell to identify where that cell is in our grid.
    const clickedCellIndex = parseInt(
        clickedCell.getAttribute('data-cell-index')
    );

//Next we check which call has already been played, or if the game is paused.
//If either of those is true we will simply ignore the click.

if (gameState[clickedCellIndex] !== "" || !gameActive) {
    return;
}

//If everything if in order we will proceed with the game flow
    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
};

//Here we set everything to default so the player can play again
function handleRestartGame() {
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell')
        .forEach(cell => cell.innerHTML = "");

}

//Here is our event listeners to the actual game cells and our restart button

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.game--restart').addEventListener('click', handleRestartGame);