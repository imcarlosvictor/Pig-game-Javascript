/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var playerScore, roundScore, player, isGameActive, previousNum, lastDice;

init();


// function reset game
function init() {

    playerScore = [0, 0]; //global score
    roundScore = 0; //current score
    player = 0; // player
    isGameActive = true;
    // intialize all scores to zero
    var glbScoreDOM = document.getElementsByClassName('player-score');
    glbScoreDOM[0].textContent = '0';
    glbScoreDOM[1].textContent = '0';


    var currScoreDOM = document.getElementsByClassName('player-current-score');
    currScoreDOM[0].textContent = '0';
    currScoreDOM[1].textContent = '0';

    // Hide the dice
    document.querySelector('.dice').style.display = 'none';

}


// function rotate player 
function rotatePlayer() {

    // reset current score
    roundScore = 0;
    document.getElementsByClassName('player-current-score')[player].textContent = '0';

    // hide the dice
    document.querySelector('.dice').style.display = 'none';

    // SWITCH Players
    player === 0 ? player = 1 : player = 0;

    //change active player UI *doesnt work*
    document.querySelector('.player-0-panel').classList.toggle('.active');
    document.querySelector('.player-1-panel').classList.toggle('.active');
}




/**
 ******* EVENTS *******
 */


// NEW EVENT
document.querySelector('.btn-new').addEventListener('click', init);


// ROLL EVENT
document.querySelector('.btn-roll').addEventListener('click', () => {

    if (isGameActive) {
        // random number 
        const randomNum = (Math.floor(Math.random() * 6) + 1);

        // select the image to show the result
        const image = document.querySelector('.dice');
        image.style.display = 'block';
        image.src = 'dice-' + randomNum + '.png';


        // dice result conditional
        if (randomNum === 6 && lastDice === 6) { //Challenge 1 - reset after double 6s

            //player loses ALL score
            playerScore[player] = 0;
            document.getElementById('score-' + player) = '0';
        } else if (randomNum === 1) {

            rotatePlayer();
        } else {

            // update the roundScore and display on the screen
            roundScore += randomNum;
            document.getElementById('current-' + player).textContent = roundScore;

            //store num
            previousNum = randomNum;
        }
    }
})



//HOLD EVENT
document.querySelector('.btn-hold').addEventListener('click', () => {

    if (isGameActive) {

        // UPDATE + DISPLAY Global Score
        let globalScoreDOM = document.querySelectorAll('.player-score');
        playerScore[player] += roundScore;
        globalScoreDOM[player].textContent = playerScore[player];

        //user final score input
        const scoreLimit = document.getElementById('game-limit-input').value;
        
        let winningScore;
        //check user input
        if (scoreLimit) {

            winningScore = scoreLimit;
        } else {

            winningScore = 50;
        }

        // final score conditional
        if (playerScore[player] >= winningScore) {

            document.getElementById('name-' + player).textContent = 'Winner!';
            isGameActive = false; // ends game
        } else {

            rotatePlayer();
        }
    }
})



//challenge 1





