import React from 'react';
import { useHistory } from 'react-router';
import { useGameContext } from '../../state/GameContext';
import { DIFFICULTY_LEVELS } from '../../utils/enums';
import PropTypes from 'prop-types';
import styles from './Welcome.module.scss';

const Welcome = ({ setDifficulty }) => {
  let history = useHistory();
  const { player, setGameActive } = useGameContext();
  const { EASY, MEDIUM, HARD} = DIFFICULTY_LEVELS;
  
  const onStartGameClick = () => {
    setGameActive(true);
    history.push('/game');
  };

  return (
    <main className={styles.Welcome}>
      <section>
        <h2>Welcome {player}!</h2>
        <h3>Game Rules</h3>
        <ol>
          <li>The computer will hide the item in a circle.</li>
          <li>You can guess where the item is hidden by clicking on a circle.</li>
          <li>Then you get to hide the item by clicking on a circle.</li>
          <li>The computer will try to guess where you hid the item.</li>
          <li>Every correct guess scores one point.</li>
          <li>The game ends after five rounds.</li>
        </ol>
        <form onSubmit={onStartGameClick}>
          <label htmlFor="difficulty">
            <select
              id="difficulty"
              name="difficulty"
              onChange={({ target }) => setDifficulty(target.value)}>
              <option value="">Choose Your Difficulty</option>
              <option value={EASY}>Easy (3 hiding spots)</option>
              <option value={MEDIUM}>Medium (4 hiding spots)</option>
              <option value={HARD}>Hard (8 hiding spots)</option>
            </select>
          </label>
          <button>Start Game</button>
        </form>
      </section>
    </main>
  );
};

Welcome.propTypes = {
  setDifficulty: PropTypes.func
};

export default Welcome;
