import React, { useState } from 'react';
import styles from './Game.module.scss';

const Game = () => {
  //active player boolean: player = true, computer = false
  const [activePlayer, setActivePlayer] = useState(false);
  //correctBox = number
  const [hidingSpot, setHidingSpot] = useState();
  //check score by comparing value of selection to correctBox
  //increment score
  //new turn: clear correctBox
  //select Box
  // hide item
  //computer makes guess
  //player clicks box to make guess

  console.log(activePlayer, setActivePlayer, hidingSpot, setHidingSpot);

  return (
    <main className={styles.Game}>
      <h2>Game</h2>
      <section>

      </section>
    </main>
  );
};

export default Game;
