'use strict';

var buttonRock = document.getElementById('rock');
var buttonScissors = document.getElementById('scissors');
var buttonPaper = document.getElementById('paper');
var buttonNewGame = document.getElementById('newGame');
var infoAboutRounds= document.getElementById('infoAboutRounds');
var playerScore = document.getElementById('player-score');
var computerScore = document.getElementById('computer-score');
var resultOfGame = document.getElementById('resultOfGame');
var resultsTableBody = document.getElementById('tablebody');


//Score for each player
var params = {
    roundsNumber : 0,
    playerScore : 0,
    computerScore : 0,
    playerPoint : '',
    computerPoint : '',
    numberToWin : '',
    roundWinner : '',
};
buttonDisabled();


//function which return random number from 1 to 3
var random = function () {
    return Math.floor(Math.random() * 3) + 1;
}

//function start New Game
function newGame() {
 	resetResults();
  params.numberToWin = window.prompt('To how many wins would you like to play?');
  buttonDisabled();
    if ((isNaN(params.numberToWin)) || params.numberToWin == null || params.numberToWin <= 0 ) {
    infoAboutRounds.innerHTML = 'You need to write a number';
  } else {
    params.numberToWin = Math.floor(params.numberToWin);
    infoAboutRounds.innerHTML = 'You are playing to ' + params.numberToWin + ' wins';
    buttonEnable();
  }
}


buttonNewGame.addEventListener('click', function () {
    newGame();
})

var playerButton = document.querySelectorAll('.player-move');
  for(var i = 0; i < playerButton.length; i++) {
  var dataMove = playerButton[i].getAttribute('data-move');
  playerButton[i].addEventListener('click', function() {
    if (dataMove == 'rock') {
      playerMove(1);
    } else if (dataMove == 'scissors') {
      playerMove(2);
    } else {
      playerMove(3);
    }
    })
  }

                          
var playerMove = function(userMove) {
  var computerMove = random();
  if (userMove === computerMove) {
    output.innerHTML = 'you played the same as computer<br> no point';
    params.roundWinner = 'no winner';
    params.playerPoint = '0';
    params.computerPoint = '0';
    params.roundsNumber++;
    addProgressTable();
  } else if (userMove === 1 && computerMove === 2 || userMove === 2 && computerMove === 3 || userMove === 3 && computerMove === 1) { 
    output.innerHTML = 'you won <br> one point for you';
    params.playerScore++
    playerScore.innerHTML = params.playerScore;
    params.roundWinner = 'player';
    params.playerPoint = '1';
    params.computerPoint = '0';
    params.roundsNumber++;
    addProgressTable();
    winner();
  } else {
    output.innerHTML = 'you lost <br> one point for computer';
    params.computerScore++
    computerScore.innerHTML = params.computerScore;
    params.roundWinner = 'computer';
    params.playerPoint = '0';
    params.computerPoint = '1';
    params.roundsNumber++;
    addProgressTable();
    winner();   
  }
}

var progressTable = [];
var addProgressTable = function() {
  progressTable.push({
    rounds_number : params.roundsNumber,
    player_point : params.playerPoint,
    computer_point : params.computerPoint,
    round_winner : params.roundWinner,
    round_result : params.playerScore + ':' + params.computerScore,
    });
}

function buttonDisabled() {
    buttonRock.disabled = true;
    buttonScissors.disabled = true;
    buttonPaper.disabled = true;
}

function buttonEnable() {
    buttonRock.disabled = false;
    buttonScissors.disabled = false;
    buttonPaper.disabled = false;
}

//Function restart results
function resetResults() {
    params = {
        playerScore: 0,
        computerScore: 0,
        roundsNumber: 0,
    }
  progressTable.length = 0;
  playerScore.innerHTML = params.playerScore;
  computerScore.innerHTML = params.computerScore;
  output.innerHTML = '';
}

//function winner
function winner() {
  if (params.playerScore == params.numberToWin) {
    showModal('You WON whole game! <br> To start new game click New Game button');
    buttonDisabled();      
  } else if (params.computerScore == params.numberToWin) {
    showModal('You LOSE: computer was better! <br> To start new game  click New Game button');
    buttonDisabled();
  }
}

var progressTableInModal = function() {
  var tbody = '';
  progressTable.forEach(function(row) {
    tbody += '<tr><td> ' + row.rounds_number + '</td><td> ' + row.player_point + '</td><td> ' + row.computer_point + '</td><td> ' + row.round_winner + '</td><td> ' + row.round_result + '</td></tr>'
  });
  progressTable = [];
  return tbody;
};
 
var showModal = function(text) {
	resultsTableBody.innerHTML = progressTableInModal();
  document.querySelector('#modal-overlay').classList.add('show');
  document.querySelector('#modal-one').classList.add('show');
  resultOfGame.innerHTML = '<br> final result <br>' + params.playerScore + '-' + params.computerScore + '<br>' + text + '<br>';
}
	
var hideModal = function(event) {
	event.preventDefault();
	document.querySelector('#modal-overlay').classList.remove('show');
}
	
var closeButtons = document.querySelectorAll('.modal .close');
	for(var i = 0; i < closeButtons.length; i++) {
		closeButtons[i].addEventListener('click', hideModal);
  }
 
document.querySelector('#modal-overlay').addEventListener('click', hideModal); 
var modals = document.querySelectorAll('.modal');
  for(var i = 0; i < modals.length; i++) {
		modals[i].addEventListener('click', function(event) {
		event.stopPropagation();
		});
	}
	
	
	
