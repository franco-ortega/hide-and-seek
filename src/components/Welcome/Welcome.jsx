import React from 'react';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';
import styles from './Welcome.module.scss';

const Welcome = ({ player, gameActive, setGameActive }) => {
  let history = useHistory();

  console.log(gameActive);
  console.log('Start Game Clicked!');

  const onStartGameClick = () => {
    setGameActive(true);
    history.push('/game');
  };

  return (
    <main className={styles.Welcome}>
      <h2>Welcome {player}!</h2>
      <section>
        <h3>Instructions</h3>
        <p>1. Guess the item is hidden by clicking on a box.</p>
        <p>2. Hide your item by clicking on a box.</p>
        <p>3. The computer will try to find your item.</p>
        <p>4. Every correct guess scores 1 point.</p>
        <p>5. The first one to 5 points wins the game.</p>
        <button onClick={onStartGameClick}>Start Game</button>
      </section>
    </main>
  );
};

Welcome.propTypes = {
  player: PropTypes.string.isRequired,
  gameActive: PropTypes.bool.isRequired,
  setGameActive: PropTypes.func.isRequired
};


export default Welcome;
