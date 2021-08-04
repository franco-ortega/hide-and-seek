import { useState } from 'react';

export const useMessage = (currentAction, currentRound, finalRound, newRound) => {
  const [correct, setCorrect] = useState(false);
  const [displayResult, setDisplayResult] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const displayMessage = () => {

    if(newRound) {
      if(currentRound === finalRound) return 'Final Round!';
      else return 'New Round.';
    }

    if(displayResult) {
      if(correct && currentAction === 'player seeks') return 'You guessed correctly!';
      else if(!correct && currentAction === 'player seeks') return 'You guessed incorrectly.';
      else if(correct && currentAction === 'computer seeks') return 'Computer guessed correctly!';
      else if(!correct && currentAction === 'computer seeks') return 'Computer guessed incorrectly.';
      else if(correct) return 'Only CORRECT.';
      else if(!correct) return 'Only WRONG.';
    }

    if(!gameOver) {
      switch (currentAction) {
      case 'computer hides': return 'The computer is hiding the item.';
      case 'computer seeks': return 'The computer is guessing where you hid the item.';
      case 'player hides': return 'Now it\'s your turn to hide the item. Click on a box to hide it.';
      case 'player seeks': return 'Click on a box to guess where the item is hidden.';
      default: return 'Something strange happened';
      }
    } else {
      return 'Game Over!';
    }
  };

  return {
    setGameOver,
    displayMessage,
    setCorrect,
    setDisplayResult
  };
};