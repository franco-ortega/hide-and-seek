import { useState } from 'react';

export const useMessage = (currentAction, currentRound, finalRound, newRound) => {
  const [correct, setCorrect] = useState(false);
  const [displayResult, setDisplayResult] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const displayMessage = () => {

    if(newRound) {
      if(currentRound === finalRound) return 'Final Round!';
      else return 'New Round.';
    } else if(displayResult) {
      if(correct) {
        switch (currentAction) {
        case 'player seeks':
          return 'You guessed correctly!';
        case 'computer seeks':
          return 'Computer guessed correctly!';
        default:
          return 'Only CORRECT.';
        }
      } else {
        switch (currentAction) {
        case 'player seeks':
          return 'You guessed incorrectly.';
        case 'computer seeks':
          return 'Computer guessed incorrectly.';
        default:
          return 'Only WRONG.';
        }
      }

    } else if(!gameOver) {
      switch (currentAction) {
      case 'computer hides':
        return 'The computer is hiding the item.';
      case 'computer seeks':
        return 'The computer is guessing where you hid the item.';
      case 'player hides':
        return 'Now it\'s your turn to hide the item. Click on a box to hide it.';
      case 'player seeks':
        return 'Click on a box to guess where the item is hidden.';
      default:
        return 'Something strange happened';
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