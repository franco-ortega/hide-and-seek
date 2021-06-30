import { useState } from 'react';

export const useMessage = (currentAction) => {
  const [gameOver, setGameOver] = useState(false);

  const selectActionMessage = () => {
    let actionMessage;

    if(!gameOver) {
      if(currentAction === 'computer hides') actionMessage = 'The computer is hiding the item.';
      else if(currentAction === 'computer seeks') actionMessage = 'The computer is guessing where you hid the item.';
      else if(currentAction === 'player hides') actionMessage = 'Now it\'s your turn to hide the item. Click on a box to hide the item.';
      else if(currentAction === 'player seeks') actionMessage = 'Click on a box to guess where the item is hidden.';
      else actionMessage = 'SOMETHING ELSE';
    } else {
      actionMessage = 'Game Over!';
    }

    return actionMessage;
  };

  const [correct, setCorrect] = useState(false);
  const [displayResult, setDisplayResult] = useState(false);

  const selectResultMessage = () => {
    if(displayResult) {
      if(correct && currentAction === 'player seeks') return 'You guessed correctly!';
      if(!correct && currentAction === 'player seeks') return 'You guessed incorrectly.';
      if(correct && currentAction === 'computer seeks') return 'Computer guessed correctly!';
      if(!correct && currentAction === 'computer seeks') return 'Computer guessed incorrectly.';
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