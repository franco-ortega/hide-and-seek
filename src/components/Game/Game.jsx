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
  // gameActive,
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
  const timer = 2000;

  const [buttonDisabled, setButtonDisabled] = useState(true);
  // List of currentActions: computer hides, player seeks, player hides, computer seeks
  const [currentAction, setCurrentAction] = useState('computer hides');
  const [currentRound, setCurrentRound] = useState(1);
  const [currentGuess, setCurrentGuess] = useState(0);
  const [correcttGuess, setCorrecttGuess] = useState(0);
  const [displayGuess, setDisplayGuess] = useState(false);
  const [hidingSpot, setHidingSpot] = useState(0);
  const [madeGuess, setMadeGuess] = useState('');

  const {
    displayMessage,
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
      setButtonDisabled(false);
    }
    if(currentAction === 'computer hides') setTimeout(() => computerHidesItem(), timer);
    else if(currentAction === 'computer seeks') setTimeout(() => computerMakesGuess(), timer);
    else if(currentAction === '') console.log('No one is acting');
  }, [currentAction]);

  const incrementScore = (scorer) => {
    if(scorer === 'player') setPlayerScore(prev => (prev + 1));
    else if(scorer === 'computer') setComputerScore(prev => (prev + 1));
  };

  const incrementRound = () => setCurrentRound(prev => (prev + 1));

  const computerHidesItem = () => {
    const computerHidingSpot = generateNumber(hidingSpots);
    // console.log('Computer Hide Item: ' + computerHidingSpot);
    setCorrecttGuess(computerHidingSpot);
    setHidingSpot(computerHidingSpot);
    console.log('Computer Hides Item: computer hid item');
    setCurrentAction('player seeks');
    console.log('Computer Hides Item: player will seek');
  };

  const computerMakesGuess = () => {
    const computerGuess = generateNumber(hidingSpots);
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

  return (
    <main className={styles.Game}>
      <Scoreboard
        player={player}
        playerScore={playerScore}
        computerScore={computerScore}
      />
      <p>Round: {currentRound}</p>
      <section>
        <p>{message}</p>
        {displayGuess &&
        <p>
          Guess: {currentGuess} vs Hiding Spot: {correcttGuess}
        </p>
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
  // gameActive: PropTypes.bool.isRequired,
  setGameActive: PropTypes.func.isRequired,
  player: PropTypes.string.isRequired,
  playerScore: PropTypes.number.isRequired,
  setPlayerScore: PropTypes.func.isRequired,
  computerScore: PropTypes.number.isRequired,
  setComputerScore: PropTypes.func.isRequired
};

export default Game;
