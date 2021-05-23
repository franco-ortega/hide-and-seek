import React from 'react';
import PropTypes from 'prop-types';
import styles from './Header.module.scss';

const Header = ({ player, gameActive }) => {
  return (
    <div className={styles.Header}>
      <h1>Hide & Seek</h1>
      <p>{gameActive && player}</p>
    </div>
  );
};

Header.propTypes = {
  player: PropTypes.string.isRequired,
  gameActive: PropTypes.string.isRequired
};

export default Header;
