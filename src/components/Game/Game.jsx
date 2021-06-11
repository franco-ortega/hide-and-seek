import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Game.module.scss';
import { useHistory } from 'react-router';
// import Results from '../Results/Results';

const Game = ({
  // gameActive,
  setGameActive,
  playerScore,
  setPlayerScore,
  computerScore,
  setComputerScore
}) => {
  let history = useHistory();
  
  //active player boolean: player = true, computer = false
  const [activePlayer, setActivePlayer] = useState(false);

  //correctBox = number
  const [hidingSpot, setHidingSpot] = useState(0);

  //disable button
  const [buttonClickable, setButtonClickable] = useState(false);

  const incrementPlayerScore = () => setPlayerScore(playerScore + 1);
  const incrementComputerScore = () => setComputerScore(computerScore + 1);

  const computerTurn = () => {
    const computerHidingSpot = Math.ceil(Math.random() * 3);
    setHidingSpot(computerHidingSpot);
    setButtonClickable(true);
    setActivePlayer(true);
  };

  useEffect(() => {
    if(playerScore === 5 || computerScore === 5) {
      setGameActive(false);
      history.push('/results');
    } else {
      if(!activePlayer) {
        setTimeout(() => {
          computerTurn();
        }, 1000);
      }  
    }
  }, [activePlayer, ]);


  //player clicks box to make guess
  const onGuessHidingSpotClick = ({ target }) => {
    console.log('GHS: Hiding spot: ' + hidingSpot);

    setButtonClickable(false);

    const guess = Number(target.value);
    console.log('GHS: Player guessed: ' + guess);

    //check score by comparing value of selection to correctBox
    //increment score
    if(guess === hidingSpot) incrementPlayerScore();
    else incrementComputerScore();

    setActivePlayer(false);
  };


  // For when the computer makes guesses too:
  ////new turn: clear correctBox
  ////player selects Box to hide item
  ////computer makes guess

  console.log('ACTIVE PLAYER (end): ' + activePlayer);

  return (
    <main className={styles.Game}>
      <h2>Game</h2>
      <section>
        {/* display messages: Your turn, Computer turn, You score, They score */}
        Message: {activePlayer ? 'Pick a box.' : 'Computer is choosing.'}
      </section>
      <section>
        <button value="1" disabled={!buttonClickable} onClick={onGuessHidingSpotClick}>Box 1</button>
        <button value="2" disabled={!buttonClickable} onClick={onGuessHidingSpotClick}>Box 2</button>
        <button value="3" disabled={!buttonClickable} onClick={onGuessHidingSpotClick}>Box 3</button>
      </section>
      {/* {!gameActive &&
      <Results
        setGameActive={setGameActive}
        gameActive={gameActive}
        setPlayerScore={setPlayerScore}
        playerScore={playerScore}
        setComputerScore={setComputerScore}
        computerScore={computerScore}
      />
      } */}
    </main>
  );
};

Game.propTypes = {
  // gameActive: PropTypes.bool.isRequired,
  setGameActive: PropTypes.func.isRequired,
  playerScore: PropTypes.number.isRequired,
  setPlayerScore: PropTypes.func.isRequired,
  computerScore: PropTypes.number.isRequired,
  setComputerScore: PropTypes.func.isRequired
};

export default Game;
