/* Computer randomly generates R, P or S
   1. Randomly choose an integer between 0 and 2
   2. Assign it to variable 'roll'
   3. Return 'roll' */
function computerPlay() {
    let roll = Math.floor(Math.random() * 3);
    return roll;
}

/* Translates computer-generated 'roll' (int between 0 and 2) to
   rock, paper or scissors based on 'roll' value */
function translateRollToChoice(computerSelection) {
    /* If computerSelection is 0, returns 'rock',
    if its 1, returns 'paper',
    if its 2, returns 'scissors'. */
    switch(computerSelection) {
        case 0:
            return 'rock';
        case 1:
            return 'paper';
        case 2:
            return 'scissors';
    }
}

/* Gets user input and changes it to all lower-case */
function getUserInput() {
    let input = prompt("Please enter your choice!");
    return input.toLowerCase();
}

/* Compares choices and determines winner */
function compareChoices(playerSelection, computerSelection) {
    // If both players chose the same answer, it's a tie - no winner
    if(playerSelection === computerSelection) {
        return `It's a tie! You both chose ${playerSelection}!`;
    }

    const choices = [playerSelection, computerSelection];

    if (choices.includes("rock")) {
        // If the pair is 'rock' and 'paper'
        if (choices.includes("paper")) {
            // If playerSelection is rock (losing)
            if(choices[0] === 'rock') {
                return "You lose! Paper beats Rock!";
            } else {
                return "You win! Paper beats Rock!";
            }
        // If pair is 'rock' and 'scissors'
        } else if (choices.includes("scissors")) {
            // If playerSelection is rock (winning)
            if(choices[0] === 'rock') {
                return "You win! Rock beats Scissors!";
            } else {
                return "You lose! Rock beat Scissors!";
            }
        }
    // If pair is 'paper' and 'scissors'
    } else if (choices.includes("scissors") && choices.includes("paper")) {
        // If playerSelection is scissors (winning)
        if (choices[0] === "scissors") {
            return "You win! Scissors beat Paper!";
        } else {
            return "You lose! Scissors beat Paper!";
        }
    }
}

/* Determines winner of Rock, Paper, Scissors
   @param playerSelection (string) - user input to console,
          ('rock', 'paper', 'scissors' - made case-insensitive)
   @param computerSelection (int) - random integer between 0 and 2
          (0 - rock, 1 - paper, 2 - scissors) */
function playRound(playerSelection, computerSelection) {
    // string that contains either 'rock', 'paper' or 
    // 'scissors' generated by computer
    let computerSelectionTranslated = translateRollToChoice(computerSelection);

    return compareChoices(playerSelection, computerSelectionTranslated);
}

// /* Plays n-number of rounds, and calculates score. */
// function game(numberOfRounds) {
//     let playerPoints = 0;
//     let computerPoints = 0;
//     for (let i = 0; i < numberOfRounds; i++) {
//         let result = playRound(getUserInput(), computerPlay());
//         console.log(result);
//         if (result.includes("win")) {
//             playerPoints += 1;
//         } else if (result.includes("lose")) {
//             computerPoints += 1;
//         }
//     }
//     return `The final score is:\nPlayer: ${playerPoints}\nComputer: ${computerPoints}`;
// }

function getPlayerSelectionChoice(e) {
    let playerChoice = e.target.id;
    let computerChoice = computerPlay();
    const playerScoreDiv = document.querySelector('#player_score_num');
    const computerScoreDiv = document.querySelector('#computer_score_num');
    const resultDiv = document.querySelector('#result');

    if(playerScoreDiv.textContent >= 5 || computerScoreDiv.textContent >= 5) {
        return 0;
    }

    let result = playRound(playerChoice, computerChoice);

    resultDivTextContent = resultDiv.textContent;
    
    // If result has history of more than 5 games it removes 1st line
    if (resultDivTextContent.split(/\r\n|\r|\n/).length >= 5) {
        let lines = resultDivTextContent.split('\n');
        lines.splice(0, 1);
        console.log('here');
        resultDivTextContent = lines.join('\n');
    }
    resultDivTextContent += "\n" + result;
    resultDiv.textContent = resultDivTextContent;

    // If won -> add point to player, if lost -> add point to computer
    if (result.includes("win")) {
        let newPlayerScore = Number(playerScoreDiv.textContent) + 1;
        if(newPlayerScore <= 5 && Number(computerScoreDiv.textContent) !== 5){
            playerScoreDiv.textContent = newPlayerScore;
        }
    } else if (result.includes("lose")) {
        let newComputerScore = Number(computerScoreDiv.textContent) + 1;
        if(newComputerScore <= 5 && Number(playerScoreDiv.textContent) !== 5){
            computerScoreDiv.textContent = newComputerScore;
        }
    }

    // If either player won
    if(playerScoreDiv.textContent >= 5 || computerScoreDiv.textContent >= 5) {
        const winnerDiv = document.querySelector('.winner_container');
        if(playerScoreDiv.textContent >= 5) {
            winnerDiv.textContent = "Congratulations, you won!";
            return;
        }
        winnerDiv.textContent = "I'm sorry, you lost, better luck next time.";
        return;
    }
}

const buttons = document.querySelectorAll('.button_container button');
buttons.forEach((button) => {
    button.addEventListener('click', getPlayerSelectionChoice);
});
