import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import GameBoard from './GameBoard';
import Scoreboard from '../Scoreboard/Scoreboard';
import { useMessage } from '../../hooks/useMessage';
import { boxCount, generateNumber } from '../../utils/utils';
import PropTypes from 'prop-types';
import styles from './Game.module.scss';

const Game = ({
  difficulty,
  setGameActive,
  player,
  playerScore,
  setPlayerScore,
  computerScore,
  setComputerScore
}) => {
  const history = useHistory();
  const finalRound = 3;
  const hidingSpots = boxCount(difficulty);
  const timer = 500;

  const [buttonDisabled, setButtonDisabled] = useState(true);
  // List of currentActions: computer hides, player seeks, player hides, computer seeks
  const [currentAction, setCurrentAction] = useState('computer hides');
  const [currentRound, setCurrentRound] = useState(1);
  const [currentGuess, setCurrentGuess] = useState(0);
  const [correcttGuess, setCorrecttGuess] = useState(0);
  const [hidingSpot, setHidingSpot] = useState(0);
  const [madeGuess, setMadeGuess] = useState('');

  const {
    displayMessage,
    displayResult,
    setCorrect,
    setDisplayResult,
    setGameOver,
    setNewRound
  } = useMessage(currentAction, currentRound, finalRound);

  const message = displayMessage();

  useEffect(() => {
    console.log('Score Check useEffect');
    if(currentRound === finalRound && madeGuess === 'computer') {
      setButtonDisabled(true);
      setTimeout(() => {
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
        setDisplayResult(false);
        setCurrentAction('player hides');
      }, timer);
    } else if(madeGuess === 'computer') {
      console.log('Computer made guess.');
      setTimeout(() => {
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
    if(currentAction === 'player hides' || currentAction === 'player seeks') setButtonDisabled(false);
    else if(currentAction === 'computer hides') setTimeout(() => computerHidesItem(), timer);
    else if(currentAction === 'computer seeks') setTimeout(() => computerMakesGuess(), timer);
    else if(currentAction === '') console.log('No one is acting');
  }, [currentAction]);

  const incrementScore = (scorer) => {
    if(scorer === 'player') setPlayerScore(prev => (prev + 1));
    else if(scorer === 'computer') setComputerScore(prev => (prev + 1));
  };

  const incrementRound = () => setCurrentRound(prev => (prev + 1));

  const handleGuess = (guess, guesser) => {
    if(guess === hidingSpot) {
      incrementScore(guesser);
      setCorrect(true);
    } else {
      setCorrect(false);
    }

    setCurrentGuess(guess);
    setDisplayResult(true);
    setMadeGuess(guesser);
  };

  const handleHide = (hiddenSpot, seeker) => {
    setCorrecttGuess(hiddenSpot);
    setHidingSpot(hiddenSpot);
    setCurrentAction(`${seeker} seeks`);
  };

  const computerHidesItem = () => {
    const computerHidingSpot = generateNumber(hidingSpots);
    handleHide(computerHidingSpot, 'player');
  };

  const computerMakesGuess = () => {
    const computerGuess = generateNumber(hidingSpots);
    handleGuess(computerGuess, 'computer');
  };

  const onPlayerTurnClick = ({ target }) => {
    if(currentAction === 'player seeks') {
      const playerGuess = Number(target.value);
      handleGuess(playerGuess, 'player');
    } else if(currentAction === 'player hides') {
      const playerHidingSpot = Number(target.value);      
      handleHide(playerHidingSpot, 'computer');
    }
    setButtonDisabled(true);
  };

  return (
    <main className={styles.Game}>
      <Scoreboard
        player={player}
        playerScore={playerScore}
        computerScore={computerScore}
      />
      <section>
        <p>
          Round: {currentRound}
        </p>
        <p>{message}</p>
        {
          displayResult &&
          <p>Guess: {currentGuess} vs Hiding Spot: {correcttGuess}</p>
        }
      </section>
      <GameBoard
        hidingSpots={hidingSpots}
        buttonDisabled={buttonDisabled}
        onPlayerTurnClick={onPlayerTurnClick}
      />
    </main>
  );
};

Game.propTypes = {
  difficulty: PropTypes.string.isRequired,
  setGameActive: PropTypes.func.isRequired,
  player: PropTypes.string.isRequired,
  playerScore: PropTypes.number.isRequired,
  setPlayerScore: PropTypes.func.isRequired,
  computerScore: PropTypes.number.isRequired,
  setComputerScore: PropTypes.func.isRequired
};

export default Game;
