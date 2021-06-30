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
  let timer = 2000;

  const [hidingSpot, setHidingSpot] = useState(0);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [madeGuess, setMadeGuess] = useState('');
  const [round, setRound] = useState(1);

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

  useEffect(() => {
    console.log('Score Check useEffect');
    if(playerScore === 3 || computerScore === 3) {
      setButtonDisabled(true);
      setGameOver(true);
      setTimeout(() => {
        setGameActive(false);
        history.push('/results');
      }, timer);
    } else if(madeGuess === 'player') {
      console.log('Player made guess.');
      setTimeout(() => {
        setDisplayResult(false);
        setCurrentAction('player hides');
      }, timer);
    } else if(madeGuess === 'computer') {
      console.log('Computer made guess.');
      setTimeout(() => {
        setDisplayResult(false);
        setCurrentAction('computer hides');
        incrementRound();
      }, timer);
    } else if(madeGuess === '') console.log('No one made a guess');
  }, [madeGuess]);

  useEffect(() => {
    console.log('Current Action useEffect');
    if(currentAction === 'player hides' || currentAction === 'player seeks') setButtonDisabled(false);
    if(currentAction === 'computer hides') setTimeout(() => computerHidesItem(), timer);
    if(currentAction === 'computer seeks') setTimeout(() => computerMakesGuess(), timer);
    if(currentAction === '') console.log('No one is acting');
  }, [currentAction]);

  const incrementScore = (scorer) => {
    if(scorer === 'player') setPlayerScore(playerScore + 1);
    if(scorer === 'computer') setComputerScore(computerScore + 1);
  };

  const incrementRound = () => setRound(round + 1);

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

  const onPlayerTurnClick = ({ target }) => {
    if(currentAction === 'player seeks') {
      const playerGuess = Number(target.value);
      console.log('Player Turn (seek) = ' + playerGuess + ' vs hiding spot = ' + hidingSpot);
  
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
      const playerHidingSpot = Number(target.value);
      console.log('Player Turn (hide): ' + playerHidingSpot);
        
      setHidingSpot(playerHidingSpot);
      setButtonDisabled(true);
      setCurrentAction('computer seeks');
    }
  };
  
  console.log('Bottom of file: current action = ' + currentAction);

  return (
    <main className={styles.Game}>
      <h2>Happy seeking!!</h2>
      <section>
        Round: {round}
      </section>
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
