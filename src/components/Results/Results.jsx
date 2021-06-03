import React from 'react';
import PropTypes from 'prop-types';
import styles from './Results.module.scss';

const Results = ({ playerScore, computerScore }) => {
  return (
    <main className={styles.Results}>
      <h1>Result Page!!</h1>
      <section>
        <p>Your score: {playerScore}</p>
        <p>Computer score: {computerScore}</p>
      </section>

    </main>
  );
};

Results.propTypes = {
  playerScore: PropTypes.number.isRequired,
  computerScore: PropTypes.number.isRequired
};

export default Results;