import React from 'react';
import PropTypes from 'prop-types';
import styles from './Header.module.scss';

const Header = ({ player }) => {
  return (
    <div className={styles.Header}>
      <h1>Hide & Seek</h1>
      <p>{player}</p>
    </div>
  );
};

Header.propTypes = {
  player: PropTypes.string.isRequired
};

export default Header;
