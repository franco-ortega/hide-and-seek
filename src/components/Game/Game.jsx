import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Game.module.scss';
import { useHistory } from 'react-router';

const Game = ({
  setGameActive,
  playerScore,
  setPlayerScore,
  computerScore,
  setComputerScore
}) => {
  let history = useHistory();
  
  //active player boolean: player = true, computer = false
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

  //correctBox = number
  const [hidingSpot, setHidingSpot] = useState(0);

  //disable button
  const [buttonClickable, setButtonClickable] = useState(false);

  const incrementPlayerScore = () => setPlayerScore(playerScore + 1);
  const incrementComputerScore = () => setComputerScore(computerScore + 1);

  const computerHidesItem = () => {
    const computerHidingSpot = Math.ceil(Math.random() * 3);
    console.log('computer hiding spot: ' + computerHidingSpot);
    setActiveHider('');
    setHidingSpot(computerHidingSpot);
    setButtonClickable(true);
    setActiveSeeker('player');
    // setButtonClickable(true);
  };

  // For when the computer makes guesses too:
  ////new turn: clear correctBox
  ////player selects Box to hide item
  ////computer makes guess
  const computerMakesGuess = () => {
    console.log('The computer is making a guess');

    //random select a number
    const computerGuess = Math.ceil(Math.random() * 3);
    console.log('computer guess: ' + computerGuess);
    setActiveSeeker('');

    //compare guess to hiding spot
    //if correct, increment computer score
    if(computerGuess === hidingSpot) incrementComputerScore();
    setActiveHider('computer');
    // setButtonClickable('false');
  };

  const computerTurn = () => {
    if(activeHider === 'computer') computerHidesItem();
    if(activeSeeker === 'computer') computerMakesGuess();
  };

  useEffect(() => {
    if(playerScore === 3 || computerScore === 3) {
      setGameActive(false);
      history.push('/results');
    } else {
      setTimeout(() => {
        computerTurn();
      }, 2000);
    }
  }, [activeHider]);

  //player clicks box to make guess || or to hide item
  const onPlayerTurnClick = ({ target }) => {
    if(activeSeeker === 'player') {
      setButtonClickable(true);
      const guess = Number(target.value);

      console.log('PT: hiding spot: ' + hidingSpot);
      console.log('PT: player guess: ' + guess);

      //check score by comparing value of selection to correctBox
      //increment score
      if(guess === hidingSpot) {
        incrementPlayerScore();
      }
  
      setActiveSeeker('');
      setActiveHider('player');

    } else if(activeHider === 'player') {

      //the player hides the item
      console.log('Player hid the item!');
      const playerHidingSpot = Number(target.value);
      console.log('player hiding spot: ' + playerHidingSpot);
      
      setHidingSpot(playerHidingSpot);
      setActiveSeeker('computer');
      setActiveHider('');
      setButtonClickable(false);
    }
  };
  
  console.log('Active Seeker: ' + activeSeeker + '; Active Hider: ' + activeHider);

  return (
    <main className={styles.Game}>
      <h2>Game</h2>
      <section>
        {/* display messages: Your turn, Computer turn, You score, They score */}
        <p>
          {playerSeeks && 'Click on a box to guess where the item is hidden.'}
          {computerSeeks && 'The computer is guessing where you hid the item.'}
          {playerSeeks && computerSeeks && 'Does double seek ever display?'}
        </p>
        <p>
          {playerHides && 'Now it\'s your turn to hide the item. Click on a box to hide the item.'}
          {computerHides && 'The computer is hiding the item.'}
          {playerHides && computerHides && 'Does double hide ever display?'}
        </p>
      </section>
      <section>
        <button value="1" disabled={!buttonClickable} onClick={onPlayerTurnClick}>Box 1</button>
        <button value="2" disabled={!buttonClickable} onClick={onPlayerTurnClick}>Box 2</button>
        <button value="3" disabled={!buttonClickable} onClick={onPlayerTurnClick}>Box 3</button>
      </section>
    </main>
  );
};

Game.propTypes = {
  setGameActive: PropTypes.func.isRequired,
  playerScore: PropTypes.number.isRequired,
  setPlayerScore: PropTypes.func.isRequired,
  computerScore: PropTypes.number.isRequired,
  setComputerScore: PropTypes.func.isRequired
};

export default Game;
