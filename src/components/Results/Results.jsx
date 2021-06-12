import React from 'react';
import PropTypes from 'prop-types';
import styles from './Results.module.scss';
import { useHistory } from 'react-router';

const Results = ({
  playerScore,
  setPlayerScore,
  computerScore,
  setComputerScore,
  setGameActive
}) => {
  let history = useHistory();

  const resetScores = () => {
    setPlayerScore(0);
    setComputerScore(0);
  };

  const onPlayAgainClick = () => {
    resetScores();
    setGameActive(true);
    history.push('/game');
  };

  const onNewPlayerClick = () => {
    resetScores();
    history.push('/');
  };

  return (
    <main className={styles.Results}>
      <h1>Results Page!!</h1>
      <section>
        <p>Your score: {playerScore}</p>
        <p>Computer score: {computerScore}</p>
        <button onClick={onPlayAgainClick}>Play Again</button>
        <button onClick={onNewPlayerClick}>New Player</button>
      </section>

    </main>
  );
};

Results.propTypes = {
  playerScore: PropTypes.number.isRequired,
  setPlayerScore: PropTypes.func.isRequired,
  computerScore: PropTypes.number.isRequired,
  setComputerScore: PropTypes.func.isRequired,
  setGameActive: PropTypes.func.isRequired
};

export default Results;