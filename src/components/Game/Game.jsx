import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Game.module.scss';

const Game = ({
  gameActive,
  setGameActive,
  playerScore,
  setPlayerScore,
  computerScore,
  setComputerScore
}) => {
  //active player boolean: player = true, computer = false
  const [activePlayer, setActivePlayer] = useState(false);

  //correctBox = number
  const [hidingSpot, setHidingSpot] = useState(0);

  useEffect(() => {
    if(!activePlayer) {
      setTimeout(() => {
        setActivePlayer(true);
        const computerHidingSpot = Math.ceil(Math.random() * 3);
        setHidingSpot(computerHidingSpot);
        console.log('Computer Hiding Spot: ' + computerHidingSpot);
      }, 2000);
    }
    console.log('Active Player: ' + activePlayer);
  }, [activePlayer]);

  const incrementScore = () => setPlayerScore(playerScore + 1);

  //player clicks box to make guess
  const onGuessHidingSpotClick = ({ target }) => {
    console.log('Hiding spot: ' + hidingSpot);

    const guess = Number(target.value);
    console.log('Player guessed: ' + guess);

    if(guess === hidingSpot) {
      incrementScore();
      console.log('Score!!');
    }

    setActivePlayer(false);
  };
  //check score by comparing value of selection to correctBox
  //increment score
  //new turn: clear correctBox
  //select Box
  // hide item
  //computer makes guess
  //display messages: Your turn, Computer turn, You score, They score

  if(playerScore === 25) {
    console.log(activePlayer, setActivePlayer, hidingSpot, setHidingSpot);

    console.log(  gameActive,
      setGameActive,
      playerScore,
      setPlayerScore,
      computerScore,
      setComputerScore);
  }

  return (
    <main className={styles.Game}>
      <h2>Game</h2>
      <section>
        Message: {activePlayer ? 'Pick a box.' : 'Computer is choosing.'}
      </section>
      <section>
        <button value="1" onClick={onGuessHidingSpotClick}>Box 1</button>
        <button value="2" onClick={onGuessHidingSpotClick}>Box 2</button>
        <button value="3" onClick={onGuessHidingSpotClick}>Box 3</button>
      </section>
    </main>
  );
};

Game.propTypes = {
  gameActive: PropTypes.bool.isRequired,
  setGameActive: PropTypes.func.isRequired,
  playerScore: PropTypes.number.isRequired,
  setPlayerScore: PropTypes.func.isRequired,
  computerScore: PropTypes.number.isRequired,
  setComputerScore: PropTypes.func.isRequired
};

export default Game;
