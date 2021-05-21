import React from 'react';
import PropTypes from 'prop-types';
import styles from './Welcome.module.scss';

const Welcome = ({ player }) => {
  return (
    <div className={styles.Welcome}>
      <h2>Welcome {player}!</h2>
    </div>
  );
};

Welcome.propTypes = {
  player: PropTypes.string.isRequired
};


export default Welcome;
