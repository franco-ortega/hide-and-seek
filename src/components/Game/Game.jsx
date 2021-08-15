import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import GameBoard from './GameBoard';
import Scoreboard from '../Scoreboard/Scoreboard';
import { useMessage } from '../../hooks/useMessage';
import { boxCount, generateNumber } from '../../utils/utils';
import PropTypes from 'prop-types';
import styles from './Game.module.scss';
import { useGameContext } from '../../state/GameContext';

const Game = ({
  difficulty,
  playerScore,
  setPlayerScore,
  computerScore,
  setComputerScore
}) => {
  const history = useHistory();
  const { setGameActive } = useGameContext();
  
  const finalRound = 5;
  const hidingSpots = boxCount(difficulty);
  const timer = 500;

  const [buttonDisabled, setButtonDisabled] = useState(true);
  // List of currentActions: computer hides, player seeks, player hides, computer seeks
  const [currentAction, setCurrentAction] = useState('computer hides');
  const [currentRound, setCurrentRound] = useState(1);
  const [currentGuess, setCurrentGuess] = useState(null);
  const [hidingSpot, setHidingSpot] = useState(null);
  const [madeGuess, setMadeGuess] = useState(null);

  const {
    displayMessage,
    displayResult,
    setCorrect,
    setDisplayResult,
    setNewRound
  } = useMessage(currentAction, currentRound, finalRound);

  const message = displayMessage();

  const incrementScore = (scorer) => {
    if(scorer === 'player') setPlayerScore(prev => (prev + 1));
    else if(scorer === 'computer') setComputerScore(prev => (prev + 1));
  };

  const incrementRound = () => setCurrentRound(prev => (prev + 1));

  // Handles the hiding of an item and passes the action to the seeker.
  const handleHide = (hiddenSpot, seeker) => {
    setHidingSpot(hiddenSpot);
    setCurrentAction(`${seeker} seeks`);
  };

  // Handles the seeking of an item and checks to see if the selection was correct.
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

  // Participant actions: computer and player
  const computerTurn = () => {
    const computerSelection = generateNumber(hidingSpots);

    if(currentAction === 'computer seeks') handleGuess(computerSelection, 'computer');
    else if(currentAction === 'computer hides') handleHide(computerSelection, 'player');
  };

  const onPlayerTurnClick = ({ target }) => {
    const playerSelection = Number(target.value);
  
    if(currentAction === 'player seeks') handleGuess(playerSelection, 'player');
    else if(currentAction === 'player hides') handleHide(playerSelection, 'computer');
  
    setButtonDisabled(true);
  };


  useEffect(() => {
    if(currentRound === finalRound && madeGuess === 'computer') {
      setButtonDisabled(true);
      setTimeout(() => {
        setDisplayResult(false);
        setGameActive(false);
        setTimeout(() => history.push('/results'), timer);
      }, timer);
    } else {
      setTimeout(() => {
        if(madeGuess === 'player') {
          setDisplayResult(false);
          setCurrentAction('player hides');
        } else if(madeGuess === 'computer') {
          setDisplayResult(false);
          setNewRound(true);
          incrementRound();
          setTimeout(() => {
            setNewRound(false);
            setCurrentAction('computer hides');
          }, timer);
        }
      }, timer);
    }
  }, [madeGuess]);

  useEffect(() => {
    if(currentAction === 'player hides' || currentAction === 'player seeks') setButtonDisabled(false);
    else if(currentAction === 'computer hides' || currentAction === 'computer seeks') setTimeout(() => computerTurn(), timer);
  }, [currentAction]);

  return (
    <main className={styles.Game}>
      <Scoreboard
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
          <p>Guess: {currentGuess} vs Hiding Spot: {hidingSpot}</p>
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
  playerScore: PropTypes.number.isRequired,
  setPlayerScore: PropTypes.func.isRequired,
  computerScore: PropTypes.number.isRequired,
  setComputerScore: PropTypes.func.isRequired
};

export default Game;
