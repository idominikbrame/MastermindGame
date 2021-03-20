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

const addHint = (guess) => {
  let hint = generateHint(guess);
}

const mastermind = (guess) => {
  board.push(guess);
  if (guess === solution){
    return 'You guessed it!';
  }
  else if (guess.length === 4 && guess !== solution){
    generateHint(guess);
    addHint(guess);
  }
}

//Generate Hint
const generateHint = (guess) => {
  //your code here
  let solutionArr = solution.split('');
  let guessArr = guess.split('');
  let correctLetterLocations = 0;
  let correctLetter = 0;

  //Check location accuracy
  for(let i = 0; i < 4; i++)
  {
    if(solutionArr[i] === guessArr[i])
    {
      correctLetterLocations++;
      solutionArr[i] = null;
    }
  }

  //Check letter accuracy
  for(let i = 0; i < 4; i++)
  {
    let targetIndex = solutionArr.indexOf(guessArr[i]);
    if(targetIndex > -1)
    {
      correctLetter++;
      solutionArr[targetIndex] = null;
    }
  }

  //Return results?? - syntax looks okay??
  return correctLetter + '-' + correctLetterLocations;
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
