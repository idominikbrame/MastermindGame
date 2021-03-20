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

function mastermind(guess) {
  const solution = 'abcd'; // Comment this out to generate a random solution
  // your code here
  board.push(guess);
  if (guess === solution){
    return "Correct!"
  } else if (guess.length === 4 && guess !==solution){
    generateHint(guess);
    addHint(guess);
  }
}

function generateHint(guess) {
  // your code here

  let solutionArr = solution.split('');
  let guessArr = guess.split('');
  let correctLetterSpot = 0;
  let correctLetter = 0;

//Location Accuracy?

for(let i = 0; i < 4; i++){
  if(solutionArr[1] == guessArr[i]){
  correctLetterSpot++;
  solutionArr[i] = null;
}
}

//Letter Accuracy?

for(let i = 0; i <4; i++){
  let targetIndex = solutionArr = solutionArr.indexOf(guessArr[i]);
  if(targetIndex > -1){
    correctLetter++;
    solutionArr[targetIndex] = null;
  } 
}

//Results
return correctLetter + '-' + correctLetterSpot;
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
