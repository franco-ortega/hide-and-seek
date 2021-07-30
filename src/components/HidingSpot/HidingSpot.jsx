import React from 'react';
import PropTypes from 'prop-types';
import styles from './HidingSpot.module.scss';

const HidingSpot = ({
  item,
  value,
  buttonDisabled,
  onPlayerTurnClick
}) => {
  return (
    <button
      className={styles.HidingSpot}
      value={value}
      disabled={buttonDisabled}
      onClick={onPlayerTurnClick}
    >{item}</button>
  );
};

HidingSpot.propTypes = {
  item: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  buttonDisabled: PropTypes.bool.isRequired,
  onPlayerTurnClick: PropTypes.func.isRequired
};

export default HidingSpot;
