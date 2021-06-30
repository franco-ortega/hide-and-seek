import { useState } from 'react';

export const useMessage = (activeHider, activeSeeker) => {
  const [gameOver, setGameOver] = useState(false);

  const selectActionMessage = () => {
    let actionMessage;

    if(!gameOver) {
      if(activeHider === 'computer') actionMessage = 'The computer is hiding the item.';
      if(activeSeeker === 'player') actionMessage = 'Click on a box to guess where the item is hidden.';
      if(activeHider === 'player') actionMessage = 'Now it\'s your turn to hide the item. Click on a box to hide the item.';
      if(activeSeeker === 'computer') actionMessage = 'The computer is guessing where you hid the item.';
      // else actionMessage = 'SOMETHING ELSE';
    } else {
      actionMessage = 'Game Over!';
    }

    return actionMessage;
  };

  const [correct, setCorrect] = useState(false);
  const [displayResult, setDisplayResult] = useState(false);

  const selectResultMessage = () => {
    if(displayResult) {
      if(correct && activeSeeker === 'player') return 'You guessed correctly!';
      if(!correct && activeSeeker === 'player') return 'You guessed incorrectly.';
      if(correct && activeSeeker === 'computer') return 'Computer guessed correctly!';
      if(!correct && activeSeeker === 'computer') return 'Computer guessed incorrectly.';
      if(correct) return 'Only CORRECT.';
      if(!correct) return 'Only WRONG.';
    }
  };

  return {
    setGameOver,
    selectActionMessage,
    setCorrect,
    setDisplayResult,
    selectResultMessage
  };
};