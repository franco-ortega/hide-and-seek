import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useGameContext } from '../../state/GameContext';
import GameBoard from './GameBoard';
import Scoreboard from '../Scoreboard/Scoreboard';
import { useMessage } from '../../hooks/useMessage';
import { boxCount, generateNumber } from '../../utils/utils';
import { ACTIONS } from '../../utils/enums';
import PropTypes from 'prop-types';
import styles from './Game.module.scss';

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
  const timer = 2000;

  // List of currentAction values
  const { COMPUTER_HIDES, COMPUTER_SEEKS, PLAYER_HIDES, PLAYER_SEEKS } = ACTIONS;

  const [currentAction, setCurrentAction] = useState(COMPUTER_HIDES);
  const [buttonDisabled, setButtonDisabled] = useState(true);
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

  // Handles the seeking of an item by checking to see if the selection was correct.
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

  // Handles selection and actions of computer.
  const computerTurn = () => {
    const computerSelection = generateNumber(hidingSpots);

    if(currentAction === COMPUTER_SEEKS) handleGuess(computerSelection, 'computer');
    else if(currentAction === COMPUTER_HIDES) handleHide(computerSelection, 'player');
  };

  // Handles selection and actions of player.
  const onPlayerTurnClick = ({ target }) => {
    const playerSelection = Number(target.value);
  
    if(currentAction === PLAYER_SEEKS) handleGuess(playerSelection, 'player');
    else if(currentAction === PLAYER_HIDES) handleHide(playerSelection, 'computer');
  
    setButtonDisabled(true);
  };

  // Checks to see if game ends or continues, and proceeds accordingly.
  useEffect(() => {
    const gameOver = currentRound === finalRound && madeGuess === 'computer';
  
    if(gameOver) setButtonDisabled(true);

    setTimeout(() => {
      if(gameOver) {
        setDisplayResult(false);
        setGameActive(false);
        setTimeout(() => history.push('/results'), timer);
      } else if(madeGuess === 'player') {
        setDisplayResult(false);
        setCurrentAction(PLAYER_HIDES);
      } else if(madeGuess === 'computer') {
        setDisplayResult(false);
        setNewRound(true);
        incrementRound();
        setTimeout(() => {
          setNewRound(false);
          setCurrentAction(COMPUTER_HIDES);
        }, timer);
      }
    }, timer);
  }, [madeGuess]);

  // Checks to see which participant is conducting the current action, and proceeds accordingly.
  useEffect(() => {
    if(currentAction.includes('player')) setButtonDisabled(false);
    else if(currentAction.includes('computer')) setTimeout(() => computerTurn(), timer);
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
