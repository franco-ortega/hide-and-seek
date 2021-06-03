import React from 'react';
import PropTypes from 'prop-types';
import styles from './Scoreboard.module.scss';

const Scoreboard = ({ player, playerScore, computerScore }) => {

  return (
    <section className={styles.Scoreboard}>
      <h2>Scoreboard</h2>
      <p>{player}: {playerScore}</p>
      <p>Computer: {computerScore}</p>
    </section>
  );
};

Scoreboard.propTypes = {
  player: PropTypes.string.isRequired,
  playerScore: PropTypes.number.isRequired,
  computerScore: PropTypes.number.isRequired
};

export default Scoreboard;