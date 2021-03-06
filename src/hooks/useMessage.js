import { useState } from 'react';
import { useGameContext } from '../state/GameContext';

export const useMessage = (currentAction, currentRound, finalRound) => {
  const { gameActive } = useGameContext();
  const [correct, setCorrect] = useState(false);
  const [displayResult, setDisplayResult] = useState(false);
  const [newRound, setNewRound] = useState(false);

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
    } else if(gameActive) {
      switch (currentAction) {
      case 'computer hides':
        return 'The computer is hiding the item.';
      case 'computer seeks':
        return 'The computer is guessing where you hid the item.';
      case 'player hides':
        return 'Now it\'s your turn to hide the item. Click on a circle to hide it.';
      case 'player seeks':
        return 'Click on a circle to guess where the item is hidden.';
      default:
        return 'Something strange happened';
      }
    } else {
      return 'Game Over!';
    }
  };

  return {
    displayMessage,
    displayResult,
    setCorrect,
    setDisplayResult,
    setNewRound
  };
};