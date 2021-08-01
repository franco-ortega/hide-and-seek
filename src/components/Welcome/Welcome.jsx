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
      <section>
        <h2>Welcome {player}!</h2>
        <section>
          <h3>Game Rules:</h3>
          <ol>
            <li>The computer will hide the item in a box.</li>
            <li>You can guess where the item is hidden by clicking on a box.</li>
            <li>Then you get to hide the item by clicking on a box.</li>
            <li>The computer will try to guess where you hid the item.</li>
            <li>Every correct guess scores 1 point.</li>
            <li>The game ends after 3 rounds.</li>
          </ol>
          <button onClick={onStartGameClick}>Start Game</button>
        </section>
      </section>
    </main>
  );
};

Welcome.propTypes = {
  player: PropTypes.string.isRequired,
  setGameActive: PropTypes.func.isRequired
};


export default Welcome;
