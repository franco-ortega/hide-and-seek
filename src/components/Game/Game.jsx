import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Game.module.scss';
import { useHistory } from 'react-router';
import { useMessage } from '../../hooks/useMessage';

const Game = ({
  // gameActive,
  setGameActive,
  playerScore,
  setPlayerScore,
  computerScore,
  setComputerScore
}) => {
  let history = useHistory();

  const [hidingSpot, setHidingSpot] = useState(0);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [madeGuess, setMadeGuess] = useState('');
  const [activeSeeker, setActiveSeeker] = useState('');
  const [activeHider, setActiveHider] = useState('computer');

  const {
    setGameOver,
    selectActionMessage,
    setCorrect,
    setDisplayResult,
    selectResultMessage
  } = useMessage(activeHider, activeSeeker);

  const actionMessage = selectActionMessage();
  const resultMessage = selectResultMessage();


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
    console.log('TEST 1');
    setActiveSeeker('player');
    console.log('TEST 2');
    setActiveHider('');
    console.log('TEST 3');
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
      setCorrect(false);
    }

    setDisplayResult(true);
    setMadeGuess('computer');
  };

  useEffect(() => {
    console.log('Score Check useEffect');
    if(playerScore === 3 || computerScore === 3) {
      setButtonDisabled(true);
      setGameOver(true);
      setTimeout(() => {
        setGameActive(false);
        history.push('/results');
      }, 2000);
    } else if(madeGuess === 'player') {
      console.log('Player made guess.');
      setTimeout(() => {
        setDisplayResult(false);
        setActiveHider('player');
        setActiveSeeker('');
      }, 2000);
    } else if(madeGuess === 'computer') {
      console.log('Computer made guess.');
      setTimeout(() => {
        setDisplayResult(false);
        setActiveHider('computer');
        setActiveSeeker('');
      }, 2000);
    }
  }, [madeGuess]);

  useEffect(() => {
    console.log('Action Check useEffect');
    if(activeHider === 'player') {
      console.log('Player will hide.');
      setButtonDisabled(false);
    } else if(activeHider === 'computer') {
      console.log('Computer will hide.');
      setTimeout(() => {
        computerHidesItem();
      }, 2000);
    } else if(activeSeeker === 'player') {
      console.log('Player will seek.');
      setButtonDisabled(false);
    } else if(activeSeeker === 'computer') {
      console.log('Computer will seek.');
      setTimeout(() => {
        computerMakesGuess();
      }, 2000);
    }
  }, [activeHider]);

  //player clicks box to make guess || or to hide item
  const onPlayerTurnClick = ({ target }) => {
    if(activeSeeker === 'player') {
      const guess = Number(target.value);

      console.log('PT: hiding spot: ' + hidingSpot + '; player guess: ' + guess);

      if(guess === hidingSpot) {
        incrementScore('player');
        setCorrect(true);
      } else {
        setCorrect(false);
      }

      setButtonDisabled(true);
      setDisplayResult(true);
      setMadeGuess('player');
      
    } else if(activeHider === 'player') {
      //the player hides the item
      const playerHidingSpot = Number(target.value);
      console.log('player hides item: ' + playerHidingSpot);
      
      setHidingSpot(playerHidingSpot);
      setActiveSeeker('computer');
      setButtonDisabled(true);
      setActiveHider('');
    }
  };

  // console.log('Active Seeker: ' + activeSeeker + '; Active Hider: ' + activeHider);
  console.log('Bottom of file');

  return (
    <main className={styles.Game}>
      <h2>Happy seeking!!</h2>
      <section>
        {actionMessage}
      </section>
      <section className={styles.Buttons}>
        <button value="1" disabled={buttonDisabled} onClick={onPlayerTurnClick}>Box 1</button>
        <button value="2" disabled={buttonDisabled} onClick={onPlayerTurnClick}>Box 2</button>
        <button value="3" disabled={buttonDisabled} onClick={onPlayerTurnClick}>Box 3</button>
      </section>
      <section>
        {resultMessage}
      </section>
    </main>
  );
};

Game.propTypes = {
  // gameActive: PropTypes.bool.isRequired,
  setGameActive: PropTypes.func.isRequired,
  playerScore: PropTypes.number.isRequired,
  setPlayerScore: PropTypes.func.isRequired,
  computerScore: PropTypes.number.isRequired,
  setComputerScore: PropTypes.func.isRequired
};

export default Game;
