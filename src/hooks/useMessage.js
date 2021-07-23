import { useState } from 'react';

export const useMessage = () => {
  const [gameOver, setGameOver] = useState(false);

  const selectActionMessage = (currentAction) => {
    let actionMessage;

    if(!gameOver) {
      if(currentAction === 'computer hides') actionMessage = 'The computer is hiding the item.';
      if(currentAction === 'computer seeks') actionMessage = 'The computer is guessing where you hid the item.';
      if(currentAction === 'player hides') actionMessage = 'Now it\'s your turn to hide the item. Click on a box to hide the item.';
      if(currentAction === 'player seeks') actionMessage = 'Click on a box to guess where the item is hidden.';
      if(!currentAction) actionMessage = 'NO ACTION';
    } else {
      actionMessage = 'Game Over!';
    }

    return actionMessage;
  };

  const [correct, setCorrect] = useState(false);
  const [displayResult, setDisplayResult] = useState(false);

  const selectResultMessage = (currentAction) => {
    if(displayResult) {
      if(correct && currentAction === 'player seeks') return 'You guessed correctly!';
      if(!correct && currentAction === 'player seeks') return 'You guessed incorrectly.';
      if(correct && currentAction === 'computer seeks') return 'Computer guessed correctly!';
      if(!correct && currentAction === 'computer seeks') return 'Computer guessed incorrectly.';
      if(correct) return 'Only CORRECT.';
      if(!correct) return 'Only WRONG.';
    }
  };

  const selectRoundMessage = (round) => {
    let roundMessage;
    if(round < 3) roundMessage = 'New Round';
    else roundMessage = 'Final Round!';
    return roundMessage;
  };

  return {
    setGameOver,
    selectActionMessage,
    setCorrect,
    setDisplayResult,
    selectResultMessage,
    selectRoundMessage
  };
};