'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let board = [];
let solution = '';
let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

function printBoard() {
  for (let i = 0; i < board.length; i++) {
    console.log(board[i]);
  }
}

function generateSolution() {
  for (let i = 0; i < 4; i++) {
    const randomIndex = getRandomInt(0, letters.length);
    solution += letters[randomIndex];
  }
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function generateHint(guess) {
  let correctAnswer = solution.split("");
  let guessAttempt = guess.split("");
  let correctSpot = 0;
  let correctLetter = 0;
  //Check location accuracy
  for(let i = 0; i < 4; i++) {
    if(correctAnswer[i] === guessAttempt[i])
    {
      correctSpot++;
      correctAnswer[i] = null;
    }
  }

  //Check letter accuracy
  for(let i = 0; i < 4; i++) {
    let targetIndex = correctAnswer.indexOf(guessAttempt[i]);
    if(targetIndex > -1)
    {
      correctLetter++;
      correctAnswer[targetIndex] = null;
    }
  }

  return correctLetter + '-' + correctSpot;
}


function mastermind(guess) {
  board.push(guess);
  if (guess === solution) {
    return "You guessed it!"
  } else if (guess.length === 4 && guess !== solution) {
      generateHint(guess)
  }
}


function getPrompt() {
  rl.question('guess: ', (guess) => {
    mastermind(guess);
    printBoard();
    getPrompt();
  });
}

// Tests

if (typeof describe === 'function') {
  solution = 'abcd';
  describe('#mastermind()', () => {
    it('should register a guess and generate hints', () => {
      mastermind('aabb');
      assert.equal(board.length, 1);
    });
    it('should be able to detect a win', () => {
      assert.equal(mastermind(solution), 'You guessed it!');
    });
  });

  describe('#generateHint()', () => {
    it('should generate hints', () => {
      assert.equal(generateHint('abdc'), '2-2');
    });
    it('should generate hints if solution has duplicates', () => {
      assert.equal(generateHint('aabb'), '1-1');
    });

  });

} else {

  generateSolution();
  getPrompt();
}