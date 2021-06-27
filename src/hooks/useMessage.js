import { useState } from 'react';

export const useMessage = (activeHider, activeSeeker) => {
  const [gameOver, setGameOver] = useState(false);

  let playerSeeks;
  if(activeSeeker === 'player') playerSeeks = true;
  else playerSeeks === false;

  let computerSeeks;
  if(activeSeeker === 'computer') computerSeeks = true;
  else computerSeeks === false;

  let playerHides;
  if(activeHider === 'player') playerHides = true;
  else playerHides === false;

  let computerHides;
  if(activeHider === 'computer') computerHides = true;
  else computerHides === false;

  const selectActionMessage = () => {
    if(!gameOver) {
      if(computerHides) return 'The computer is hiding the item.';
      if(playerSeeks) return 'Click on a box to guess where the item is hidden.';
      if(playerHides) return 'Now it\'s your turn to hide the item. Click on a box to hide the item.';
      if(computerSeeks) return 'The computer is guessing where you hid the item.';
    } else {
      return 'Game Over!';
    }
  };

  const [correct, setCorrect] = useState(false);
  const [incorrect, setIncorrect] = useState(false);
  const [displayResult, setDisplayResult] = useState(false);

  const selectResultMessage = () => {
    if(displayResult) {
      if(correct && playerSeeks) return 'You guessed correctly!';
      if(incorrect && playerSeeks) return 'You guessed incorrectly.';
      if(correct && computerSeeks) return 'Computer guessed correctly!';
      if(incorrect && computerSeeks) return 'Computer guessed incorrectly.';
    }
  };

  return {
    setGameOver,
    selectActionMessage,
    setCorrect,
    setIncorrect,
    setDisplayResult,
    selectResultMessage
  };
};