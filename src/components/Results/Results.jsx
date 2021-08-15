import React from 'react';
import PropTypes from 'prop-types';
import styles from './Results.module.scss';
import { useHistory } from 'react-router';
import { useGameContext } from '../../state/GameContext';

const Results = ({
  playerScore,
  setPlayerScore,
  computerScore,
  setComputerScore
  // setGameActive
}) => {
  let history = useHistory();
  const { setPlayer, setGameActive } = useGameContext();

  let resultsMessage;

  if(playerScore > computerScore) resultsMessage = 'You win!!!';
  else if(playerScore < computerScore) resultsMessage = 'Computer wins.';
  else resultsMessage = 'It\'s a tie!';

  const resetScores = () => {
    setPlayerScore(0);
    setComputerScore(0);
  };

  const onPlayAgainClick = () => {
    resetScores();
    setGameActive(true);
    history.push('/game');
  };

  const onNewGameClick = () => {
    resetScores();
    setGameActive(true);
    history.push('/welcome');
  };

  const onNewPlayerClick = () => {
    resetScores();
    setPlayer('');
    history.push('/');
  };

  return (
    <main className={styles.Results}>
      <section>
        <h2>{resultsMessage}</h2>
        <p>
          <span>Your score: {playerScore}</span>
          <span>Computer score: {computerScore}</span>
        </p>
        <p>
          <button onClick={onPlayAgainClick}>Replay Game</button>
          <button onClick={onNewGameClick}>New Game</button>
          <button onClick={onNewPlayerClick}>New Player</button>
        </p>
      </section>
    </main>
  );
};

Results.propTypes = {
  playerScore: PropTypes.number.isRequired,
  setPlayerScore: PropTypes.func.isRequired,
  computerScore: PropTypes.number.isRequired,
  setComputerScore: PropTypes.func.isRequired
  // setGameActive: PropTypes.func.isRequired
};

export default Results;