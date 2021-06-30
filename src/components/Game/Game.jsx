import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Game.module.scss';
import { useHistory } from 'react-router';
import { useMessage } from '../../hooks/useMessage';

const Game = ({
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

  // List of currentActions: computer hides, player seeks, player hides, computer seeks
  const [currentAction, setCurrentAction] = useState('computer hides');

  const {
    setGameOver,
    selectActionMessage,
    setCorrect,
    setDisplayResult,
    selectResultMessage
  } = useMessage(currentAction);

  const actionMessage = selectActionMessage();
  const resultMessage = selectResultMessage();

  const incrementScore = (scorer) => {
    if(scorer === 'player') setPlayerScore(playerScore + 1);
    if(scorer === 'computer') setComputerScore(computerScore + 1);
  };

  const computerHidesItem = () => {
    const computerHidingSpot = Math.ceil(Math.random() * 3);
    console.log('Computer Hide Item: ' + computerHidingSpot);
    setHidingSpot(computerHidingSpot);
    console.log('Computer Hides Item: computer hid item');
    setCurrentAction('player seeks');
    console.log('Computer Hides Item: player will seek');
  };

  const computerMakesGuess = () => {
    const computerGuess = Math.ceil(Math.random() * 3);
    console.log('Computer Makes Guess = ' + computerGuess + ' vs hiding spot = ' + hidingSpot);

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
        setCurrentAction('player hides');
      }, 2000);
    } else if(madeGuess === 'computer') {
      console.log('Computer made guess.');
      setTimeout(() => {
        setDisplayResult(false);
        setCurrentAction('computer hides');
      }, 2000);
    }
  }, [madeGuess]);

  useEffect(() => {
    console.log('Current Action useEffect');
    if(currentAction === 'player hides' || currentAction === 'player seeks') setButtonDisabled(false);
    if(currentAction === 'computer hides') setTimeout(() => computerHidesItem(), 2000);
    if(currentAction === 'computer seeks') setTimeout(() => computerMakesGuess(), 2000);
    if(currentAction === '') console.log('No one is acting');
  }, [currentAction]);

  //player clicks box to make guess || or to hide item
  const onPlayerTurnClick = ({ target }) => {
    if(currentAction === 'player seeks') {
      const playerGuess = Number(target.value);

      console.log('PT: hiding spot = ' + hidingSpot + '; player guess = ' + playerGuess);

      if(playerGuess === hidingSpot) {
        incrementScore('player');
        setCorrect(true);
      } else {
        setCorrect(false);
      }

      setButtonDisabled(true);
      setDisplayResult(true);
      setMadeGuess('player');
      
    } else if(currentAction === 'player hides') {
      //the player hides the item
      const playerHidingSpot = Number(target.value);
      console.log('player hides item: ' + playerHidingSpot);
      
      setHidingSpot(playerHidingSpot);
      setCurrentAction('computer seeks');
      setButtonDisabled(true);
    }
  };

  console.log('Bottom of file - current action: ' + currentAction);

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
  setGameActive: PropTypes.func.isRequired,
  playerScore: PropTypes.number.isRequired,
  setPlayerScore: PropTypes.func.isRequired,
  computerScore: PropTypes.number.isRequired,
  setComputerScore: PropTypes.func.isRequired
};

export default Game;
