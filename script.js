// VARIABLES
const selectionButtons = document.querySelectorAll('.selection')
const finalColumn = document.querySelector('[data-final-column')
const computerScore = document.querySelector('[data-computer-score')
const playerScore = document.querySelector('[data-player-score')
let playerSelection
let computerSelection
const SELECTIONS = [
    {
        name: 'rock',
        emoji: '✊',
        beats: 'scissors'
    },
    {
        name: 'paper',
        emoji: '🖐️',
        beats: 'rock'
    },
    {
        name: 'scissors',
        emoji: '✌️',
        beats: 'paper'
    }

]

const WHO_SELECTS = {
    PLAYER: 'player-selection',
    COMPUTER: 'computer-selection'
}


// FUNCTIONS
function makeSelection(selection) {
    computerSelection = randomSelection();
    const youWon = isWinner(playerSelection, computerSelection);
    const computerWon = isWinner(computerSelection, playerSelection);
    addSelectionResult(computerSelection, computerWon, WHO_SELECTS.COMPUTER);
    addSelectionResult(playerSelection, youWon, WHO_SELECTS.PLAYER);

    if (youWon) scoreTracker(playerScore);
    if (computerWon) scoreTracker(computerScore);

    if (playerScore.innerText == '3') {
        setTimeout(function () {
            alert("You won!");
            location.reload();
        }, 100);
    } else if (computerScore.innerText == '3') {
        setTimeout(function () {
            alert('You lost');
            location.reload();
        }, 100);
    }
}

function randomSelection() {
    const randomIndex = Math.floor(Math.random() * SELECTIONS.length);
    return SELECTIONS[randomIndex];
}

function isWinner(selection, opponentSelection) {
    return selection.beats === opponentSelection.name;
}

function addSelectionResult(selection, winner, whoSelects) {
    const div = document.createElement('div')
    div.innerText = selection.emoji
    if (whoSelects === WHO_SELECTS.PLAYER) {
        div.classList.add('player-selection')
    } else if (whoSelects === WHO_SELECTS.COMPUTER) {
        div.classList.add('computer-selection')
    }
    div.classList.add('result-selection')
    if (winner) div.classList.add('winner')
    finalColumn.after(div)
}

function scoreTracker(score) {
    score.innerText = +score.innerText + 1
}



// EVENT LISTENERS
selectionButtons.forEach(selectionButton => {
    selectionButton.addEventListener('click', e => {
        const selectionName = selectionButton.dataset.selection;
        playerSelection = SELECTIONS.find(selection => selection.name === selectionName);
        makeSelection(playerSelection);
    })
})
