import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Game.module.scss';
import { useHistory } from 'react-router';

const Game = ({
  gameActive,
  setGameActive,
  playerScore,
  setPlayerScore,
  computerScore,
  setComputerScore
}) => {
  let history = useHistory();
  
  const [activeSeeker, setActiveSeeker] = useState('');
  const [activeHider, setActiveHider] = useState('computer');

  let playerSeeks = false;
  if(activeSeeker === 'player') playerSeeks = true;
  else playerSeeks === false;

  let computerSeeks = false;
  if(activeSeeker === 'computer') computerSeeks = true;
  else computerSeeks === false;

  let playerHides = false;
  if(activeHider === 'player') playerHides = true;
  else playerHides === false;

  let computerHides = false;
  if(activeHider === 'computer') computerHides = true;
  else computerHides === false;

  const [correct, setCorrect] = useState(false);
  const [incorrect, setIncorrect] = useState(false);

  //correctBox = number
  const [hidingSpot, setHidingSpot] = useState(0);

  //disable button
  const [buttonClickable, setButtonClickable] = useState(false);

  //display the result: correct or incorrect
  const [displayResult, setDisplayResult] = useState(false);

  //display 'Game Over' message
  const [gameOver, setGameOver] = useState(false);

  const incrementScore = (scorer) => {
    if(scorer === 'player') {
      setPlayerScore(playerScore + 1);
    } else {
      setComputerScore(computerScore + 1);
    }
  };

  const computerHidesItem = () => {
    const computerHidingSpot = Math.ceil(Math.random() * 3);
    console.log('computer hiding spot: ' + computerHidingSpot);
    setHidingSpot(computerHidingSpot);
    setButtonClickable(true);
    setActiveSeeker('player');
    setCorrect(false);
    setIncorrect(false);
    setActiveHider('');
  };

  const computerMakesGuess = () => {
    console.log('The computer is making a guess');

    //random select a number
    const computerGuess = Math.ceil(Math.random() * 3);
    console.log('computer guess: ' + computerGuess);

    //compare guess to hiding spot; if correct, increment computer score
    if(computerGuess === hidingSpot) {
      incrementScore('computer');
      setCorrect(true);
    } else {
      setIncorrect(true);
    }

    setDisplayResult(true);
    setTimeout(() => {
      setActiveSeeker('');
      setActiveHider('computer');
    }, 2000);
  };

  const computerTurn = () => {
    if(activeHider === 'computer') computerHidesItem();
    if(activeSeeker === 'computer') computerMakesGuess();
  };

  useEffect(() => {
    if(playerScore === 3 || computerScore === 3) {
      setButtonClickable(false);
      setGameOver(true);
      setGameActive(false);
      setTimeout(() => {
        history.push('/results');
      }, 2000);
    } else if(activeHider === 'player') {
      setButtonClickable(true);
    } else {
      setTimeout(() => {
        computerTurn();
      }, 2000);
    }
  }, [activeHider]);

  //player clicks box to make guess || or to hide item
  const onPlayerTurnClick = ({ target }) => {
    if(activeSeeker === 'player') {
      const guess = Number(target.value);

      console.log('PT: hiding spot: ' + hidingSpot);
      console.log('PT: player guess: ' + guess);

      if(guess === hidingSpot) {
        incrementScore('player');
        setCorrect(true);
      } else {
        setIncorrect(true);
      }

      setButtonClickable(false);
      setDisplayResult(true);
      
      setTimeout(() => {
        setActiveHider('player');
        setActiveSeeker('');
        setDisplayResult(false);
      }, 2000);
  

    } else if(activeHider === 'player') {

      //the player hides the item
      console.log('Player hid the item!');
      const playerHidingSpot = Number(target.value);
      console.log('player hiding spot: ' + playerHidingSpot);
      
      setHidingSpot(playerHidingSpot);
      setActiveSeeker('computer');
      setButtonClickable(false);
      setCorrect(false);
      setIncorrect(false);
      setActiveHider('');
    }
  };
  
  console.log('Active Seeker: ' + activeSeeker + '; Active Hider: ' + activeHider);

  return (
    <main className={styles.Game}>
      <h2>Game</h2>
      <section>
        {!gameOver ?
          <span>
            {/* display messages: Your turn, Computer turn, You score, They score */}
            {computerHides && 'The computer is hiding the item.'}
            {playerSeeks && 'Click on a box to guess where the item is hidden.'}
            {playerHides && gameActive && 'Now it\'s your turn to hide the item. Click on a box to hide the item.'}
            {computerSeeks && 'The computer is guessing where you hid the item.'}
          </span>
          : 'Game Over!'
        }
      </section>
      <section>
        <button value="1" disabled={!buttonClickable} onClick={onPlayerTurnClick}>Box 1</button>
        <button value="2" disabled={!buttonClickable} onClick={onPlayerTurnClick}>Box 2</button>
        <button value="3" disabled={!buttonClickable} onClick={onPlayerTurnClick}>Box 3</button>
      </section>
      <section>
        {displayResult && 
          <span>
            {correct && playerSeeks && 'You guessed correctly!'}
            {incorrect && playerSeeks && 'You guessed incorrectly.'}
            {correct && computerSeeks && 'Computer guessed correctly!'}
            {incorrect && computerSeeks && 'Computer guessed incorrectly.'}
          </span>
        }
      </section>
    </main>
  );
};

Game.propTypes = {
  gameActive: PropTypes.bool.isRequired,
  setGameActive: PropTypes.func.isRequired,
  playerScore: PropTypes.number.isRequired,
  setPlayerScore: PropTypes.func.isRequired,
  computerScore: PropTypes.number.isRequired,
  setComputerScore: PropTypes.func.isRequired
};

export default Game;
