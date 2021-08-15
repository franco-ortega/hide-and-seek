import React from 'react';
import PropTypes from 'prop-types';
import styles from './Scoreboard.module.scss';
import { useGameContext } from '../../state/GameContext';

const Scoreboard = ({ playerScore, computerScore }) => {
  const { player } = useGameContext();

  return (
    <section className={styles.Scoreboard}>
      <h2>Scoreboard</h2>
      <p>
        <span>{player}: {playerScore}</span>
        <span>Computer: {computerScore}</span>
      </p>
    </section>
  );
};

Scoreboard.propTypes = {
  playerScore: PropTypes.number.isRequired,
  computerScore: PropTypes.number.isRequired
};

export default Scoreboard;
