import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Game.module.scss';
import { useHistory } from 'react-router';
import { useMessage } from '../../hooks/useMessage';
import { generateNumber } from '../../utils/utils';
import GameBoard from './GameBoard';

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
  const [newRound, setNewRound] = useState(false);
  const [currentGuess, setCurrentGuess] = useState(0);
  const [correcttGuess, setCorrecttGuess] = useState(0);
  const [displayGuess, setDisplayGuess] = useState(false);

  // List of currentActions: computer hides, player seeks, player hides, computer seeks
  const [currentAction, setCurrentAction] = useState('computer hides');

  const {
    setGameOver,
    selectActionMessage,
    setCorrect,
    setDisplayResult,
    selectResultMessage,
    selectRoundMessage
  } = useMessage();

  const actionMessage = selectActionMessage(currentAction);
  const resultMessage = selectResultMessage(currentAction);
  const roundMessage = selectRoundMessage(round);

  useEffect(() => {
    console.log('Score Check useEffect');
    if(round === 3 && madeGuess === 'computer') {
      setButtonDisabled(true);
      setTimeout(() => {
        setDisplayGuess(false);
        setDisplayResult(false);
        setGameOver(true);
        setTimeout(() => {
          setGameActive(false);
          history.push('/results');
        }, timer);
      }, timer);
    } else if(madeGuess === 'player') {
      console.log('Player made guess.');
      setTimeout(() => {
        setDisplayGuess(false);
        setDisplayResult(false);
        setCurrentAction('player hides');
      }, timer);
    } else if(madeGuess === 'computer') {
      console.log('Computer made guess.');
      setTimeout(() => {
        setDisplayGuess(false);
        setDisplayResult(false);
        setNewRound(true);
        incrementRound();
        setTimeout(() => {
          setNewRound(false);
          setCurrentAction('computer hides');
        }, timer);
      }, timer);
    } else if(madeGuess === '') console.log('No one made a guess');
  }, [madeGuess]);

  useEffect(() => {
    console.log('Current Action useEffect');
    if(currentAction === 'player hides' || currentAction === 'player seeks') {
      console.log('PLAYER SSAFASJDAOKS!!');
      setButtonDisabled(false);
    }
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
    const computerHidingSpot = generateNumber(3);
    // console.log('Computer Hide Item: ' + computerHidingSpot);
    setCorrecttGuess(computerHidingSpot);
    setHidingSpot(computerHidingSpot);
    console.log('Computer Hides Item: computer hid item');
    setCurrentAction('player seeks');
    console.log('Computer Hides Item: player will seek');
  };

  const computerMakesGuess = () => {
    const computerGuess = generateNumber(3);
    // console.log('Computer Makes Guess = ' + computerGuess + ' vs hiding spot = ' + hidingSpot);

    if(computerGuess === hidingSpot) {
      incrementScore('computer');
      setCorrect(true);
    } else {
      setCorrect(false);
    }

    setCurrentGuess(computerGuess);
    setDisplayGuess(true);
    setDisplayResult(true);
    setMadeGuess('computer');
  };

  const onPlayerTurnClick = ({ target }) => {
    if(currentAction === 'player seeks') {
      const playerGuess = Number(target.value);
      console.log('CLIIIICCKKK:' + playerGuess);
      // console.log('Player Turn (seek) = ' + playerGuess + ' vs hiding spot = ' + hidingSpot);
  
      if(playerGuess === hidingSpot) {
        incrementScore('player');
        setCorrect(true);
      } else {
        setCorrect(false);
      }
  
      setCurrentGuess(playerGuess);
      setDisplayGuess(true);
      setButtonDisabled(true);
      setDisplayResult(true);
      setMadeGuess('player');
  
    } else if(currentAction === 'player hides') {
      const playerHidingSpot = Number(target.value);
      // console.log('Player Turn (hide): ' + playerHidingSpot);
      console.log('CLIIIICCKKK:' + playerHidingSpot);
      
      setCorrecttGuess(playerHidingSpot);
      setHidingSpot(playerHidingSpot);
      setButtonDisabled(true);
      setCurrentAction('computer seeks');
    }
  };
  
  // console.log('Bottom of file: current action = ' + currentAction);



  return (
    <main className={styles.Game}>
      <header>
        <h2>Happy seeking!!</h2>
        <p>
          Round: {round}
        </p>
      </header>
      <section>
        {newRound ? roundMessage : actionMessage}
      </section>
      <GameBoard
        buttonDisabled={buttonDisabled}
        onPlayerTurnClick={onPlayerTurnClick}
      />
      {displayGuess &&
      <section>
        Guess: {currentGuess} vs Correct: {correcttGuess}
        <br />
        {resultMessage}
      </section>
      }
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
