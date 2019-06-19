
var scores, roundScore, activePlayer, gamePlaying, lastDice;


initGame();

// Call back function will call another function. This example is an anonymous function. 
document.querySelector('.btn-roll').addEventListener('click', function () {
    if (gamePlaying) {
        //1. Random number
        var dice = Math.floor(Math.random() * 6) + 1;

        //2. Display the result
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';

        if (lastDice === 6 && dice === 6) {
            scores[activePlayer] = 0
            document.querySelector('#score-' + activePlayer).textContent = '0';
            nextPlayer()
        } else if (dice !== 1) {
            //Add score
            roundScore += dice;
            prevDice = dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            nextPlayer();
        }

        lastDice = dice;
    }
});


document.querySelector('.btn-hold').addEventListener('click', function () {
    if (gamePlaying) {
        //Add current score to global score
        scores[activePlayer] += roundScore;
        //Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        //Check if player won the game
        if (scores[activePlayer] >= 100) {
            gamePlaying = false;
            document.getElementById('name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');

        } else {
            //Next Player
            nextPlayer();
        }
    }
});



function nextPlayer() {
    //Next Player // Ternary operator
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    //Toggling if the class is there or not. 
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    //Set dice image to hide
    document.querySelector('.dice').style.display = 'none';
};


document.querySelector('.btn-new').addEventListener('click', initGame);

function initGame() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0; // 0 will be the first and 1 will be the 2nd player
    gamePlaying = true; // State variable
    //Hiding the dice image before the game
    document.querySelector('.dice').style.display = 'none';

    //Setting the scores to 0
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
};









//Random number between 1-6. Floor will get rid of the decimals and random will be a random number 
//dice = Math.floor(Math.random() * 6) + 1;

//Adding the active player you can switch the currenty active user instead of writing the line of code twice.
//document.querySelector('#current-' + activePlayer).textContent = dice;

//Using innerHTML will let you use html and textContent will only let you use text. 
//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';

//var x = document.querySelector('#score-0').textContent;
//console.log(x);

//**Remove and add classes**
//document.querySelector('.player-0-panel').classList.remove('active');
//document.querySelector('.player-1-panel').classList.add('active');
