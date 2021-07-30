import React from 'react';
import PropTypes from 'prop-types';
import styles from './GameBoard.module.scss';
import HidingSpot from '../HidingSpot/HidingSpot';

const GameBoard = ({ buttonDisabled, hidingSpots, onPlayerTurnClick }) => {
  let hidingSpotList = [];

  //   let boxes;

  //   if(difficulty === 'easy') boxes = 3;
  //   if(difficulty === 'medium') boxes = 6;
  //   if(difficulty === 'hard') boxes = 3;

  for(let i = 0; i < hidingSpots; i++) {
    hidingSpotList.push(
      <HidingSpot
        key={i}
        item={i + 1}
        value={i + 1}
        buttonDisabled={buttonDisabled}
        onPlayerTurnClick={onPlayerTurnClick}
      />
    );
  }

  return (
    <section className={styles.GameBoard}>
      {hidingSpotList}
    </section>
  );
};

GameBoard.propTypes = {
  buttonDisabled: PropTypes.bool.isRequired,
  hidingSpots: PropTypes.number.isRequired,
  onPlayerTurnClick: PropTypes.func.isRequired
};

export default GameBoard;
