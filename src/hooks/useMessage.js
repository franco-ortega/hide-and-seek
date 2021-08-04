import { useState } from 'react';

export const useMessage = () => {
  const [correct, setCorrect] = useState(false);
  const [displayResult, setDisplayResult] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const displayMessage = (currentAction) => {
    if(displayResult) {
      if(correct && currentAction === 'player seeks') return 'You guessed correctly!';
      if(!correct && currentAction === 'player seeks') return 'You guessed incorrectly.';
      if(correct && currentAction === 'computer seeks') return 'Computer guessed correctly!';
      if(!correct && currentAction === 'computer seeks') return 'Computer guessed incorrectly.';
      if(correct) return 'Only CORRECT.';
      if(!correct) return 'Only WRONG.';
    }

    if(!gameOver) {
      if(currentAction === 'computer hides') return 'The computer is hiding the item.';
      if(currentAction === 'computer seeks') return 'The computer is guessing where you hid the item.';
      if(currentAction === 'player hides') return 'Now it\'s your turn to hide the item. Click on a box to hide it.';
      if(currentAction === 'player seeks') return 'Click on a box to guess where the item is hidden.';
      if(!currentAction) return 'NO ACTION';
    } else {
      return 'Game Over!';
    }
  };

  const roundAlertMessage = (round) => {
    let roundMessage;
    if(round < 3) roundMessage = 'New Round';
    else roundMessage = 'Final Round!';
    return roundMessage;
  };

  return {
    setGameOver,
    displayMessage,
    setCorrect,
    setDisplayResult,
    roundAlertMessage
  };
};