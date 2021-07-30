import React from 'react';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';
import styles from './Welcome.module.scss';

const Welcome = ({ player, setGameActive }) => {
  let history = useHistory();

  const onStartGameClick = () => {
    console.log('Start Game Clicked!');
    setGameActive(true);
    history.push('/game');
  };

  return (
    <main className={styles.Welcome}>
      <h2>Welcome {player}!</h2>
      <section>
        <h3>Game Rules:</h3>
        <p>1. The computer will hide the item in a box.</p>
        <p>2. You can guess where the item is hidden by clicking on a box.</p>
        <p>3. Then you get to hide the item by clicking on a box.</p>
        <p>4. The computer will try to guess where you hid the item.</p>
        <p>5. Every correct guess scores 1 point.</p>
        <p>6. The game ends after 3 rounds.</p>
        <button onClick={onStartGameClick}>Start Game</button>
      </section>
    </main>
  );
};

Welcome.propTypes = {
  player: PropTypes.string.isRequired,
  setGameActive: PropTypes.func.isRequired
};


export default Welcome;
