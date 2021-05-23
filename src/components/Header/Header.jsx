import React from 'react';
import PropTypes from 'prop-types';
import styles from './Header.module.scss';
import Scoreboard from '../../Scoreboard/Scoreboard';

const Header = ({ gameActive, player, playerScore, computerScore }) => {
  return (
    <header className={styles.Header}>
      <h1>Hide & Seek</h1>
      <p>{gameActive && <Scoreboard
        player={player}
        playerScore={playerScore}
        computerScore={computerScore}
      />}
      </p>
    </header>
  );
};

Header.propTypes = {
  gameActive: PropTypes.string.isRequired,
  player: PropTypes.string.isRequired,
  playerScore: PropTypes.func.isRequired,
  computerScore: PropTypes.func.isRequired
};

export default Header;
