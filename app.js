/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying, gameGoal;

init();

document.querySelector('.btn-roll').addEventListener('click', function() {
		
		if(gamePlaying) {			
		// 1. Random number
		var dice = Math.floor(Math.random() * 6) + 1;
		var dice_1 = Math.floor(Math.random() * 6) + 1;
		
		//2. Display the result
		var diceDOM = document.querySelector('.dice');
		diceDOM.style.display = 'block';
		diceDOM.src = 'dice-' + dice + '.png';

		var dice_1DOM = document.querySelector('.dice_1');
		dice_1DOM.style.display = 'block';
		dice_1DOM.src = 'dice-' + dice_1 + '.png';		
		
		//3. Update the round score if the random number is not 1				
		if (!(dice_1 === 6 && dice === 6)) {
			//Add score
			roundScore += (dice + dice_1);
			document.querySelector('#current-' + activePlayer).textContent = roundScore;			
		} else {
			//Next player
			nextPlayer();			
		}
		}	
});

document.querySelector('.btn-hold').addEventListener('click', function() {
	if(gamePlaying) {
		//1. Add current score to global score
		scores[activePlayer] += roundScore;
		//2. Update the UI
		document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
		//3. Check if player won the game
		if(scores[activePlayer] >= gameGoal) {
			document.getElementById('name-' + activePlayer).textContent = 'Winner!!!';
			document.querySelector('.dice').style.display = 'none';
			document.querySelector('.dice_1').style.display = 'none';
			document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
			document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
			gamePlaying = false;
		} else {
			//4. Next player
			nextPlayer();	
		}
	}
		
});

document.querySelector('.btn-set').addEventListener('click', function() {
	gameGoal = document.getElementById('in-1').value;
	document.getElementById('game-g').textContent = 'Game goal is ' + gameGoal;
});


document.querySelector('.btn-new').addEventListener('click', init);

function nextPlayer() {
	activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
	roundScore = 0;
			
	document.getElementById('current-0').textContent = 0;
	document.getElementById('current-1').textContent = 0;
			
	document.querySelector('.player-0-panel').classList.toggle('active');
	document.querySelector('.player-1-panel').classList.toggle('active');
			
	document.querySelector('.dice').style.display = 'none';
	document.querySelector('.dice_1').style.display = 'none';
}

function init() {
	gameGoal = 100;
	scores = [0,0];
	activePlayer = 0;
	roundScore = 0;
	gamePlaying = true;										
	
	document.querySelector('.dice').style.display = 'none';
	document.querySelector('.dice_1').style.display = 'none';
	document.getElementById('score-0').textContent = '0';
	document.getElementById('score-1').textContent = '0';
	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';
	document.getElementById('name-0').textContent = 'Player 1';
	document.getElementById('name-1').textContent = 'Player 2';
	document.getElementById('game-g').textContent = 'Game goal is ' + gameGoal;
	
	document.querySelector('.player-0-panel').classList.remove('winner');
	document.querySelector('.player-1-panel').classList.remove('winner');
	document.querySelector('.player-0-panel').classList.remove('active');
	document.querySelector('.player-1-panel').classList.remove('active');
	document.querySelector('.player-0-panel').classList.add('active');
	
	
	
}


