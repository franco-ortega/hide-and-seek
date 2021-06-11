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
  //computer hides item
  //player guesses
  //check guess
  //maybe score
  //player hides item
  //computer guesses
  //check guess
  //maybe score
  
  //active player boolean: player = true, computer = false
  const [activeSeeker, setActiveSeeker] = useState('');
  const [activeHider, setActiveHider] = useState('computer');

  let playerSeeks = false;
  if(activeSeeker === 'player') playerSeeks = true;
  else playerSeeks === false;

  let computerSeeks = false;
  if(activeSeeker === 'computer') computerSeeks = true;
  else computerSeeks === false;

  let playerHides = false;
  if(activeHider === 'player') playerHides = true;
  else playerHides === false;

  let computerHides = false;
  if(activeHider === 'computer') computerHides = true;
  else computerHides === false;

  //correctBox = number
  const [hidingSpot, setHidingSpot] = useState(0);

  //disable button
  const [buttonClickable, setButtonClickable] = useState(false);

  const incrementPlayerScore = () => setPlayerScore(playerScore + 1);
  const incrementComputerScore = () => setComputerScore(computerScore + 1);

  const computerHidesItem = () => {
    const computerHidingSpot = Math.ceil(Math.random() * 3);
    console.log('computer hiding spot: ' + computerHidingSpot);
    setHidingSpot(computerHidingSpot);
    setButtonClickable(true);
    setActiveHider('');
    setActiveSeeker('player');
  };

  // For when the computer makes guesses too:
  ////new turn: clear correctBox
  ////player selects Box to hide item
  ////computer makes guess
  const computerMakesGuess = () => {
    console.log('The computer is making a guess');
    //random select a number
    const computerGuess = Math.ceil(Math.random() * 3);
    console.log('computer guess: ' + computerGuess);
    //compare guess to hiding spot
    //if correct, increment computer score
    if(computerGuess === hidingSpot) incrementComputerScore();
    setActiveHider('computer');
    setButtonClickable('false');
    setActiveSeeker('');
  };


  const computerTurn = () => {
    if(activeHider === 'computer') {
      computerHidesItem();
    }

    if(activeSeeker === 'computer') {
      computerMakesGuess();
    }
  };

  useEffect(() => {
    if(playerScore === 3 || computerScore === 3) {
      setGameActive(false);
      history.push('/results');
    } else {
      setTimeout(() => {
        computerTurn();
      }, 2000);
      // if(activeSeeker === 'computer') {
      // }  
    }
  }, [activeSeeker, ]);


  //player clicks box to make guess || or to hide item
  const onGuessHidingSpotClick = ({ target }) => {
    if(activeSeeker === 'player') {
      console.log('GHS: Hiding spot: ' + hidingSpot);
  
      // setButtonClickable(false);
  
      const guess = Number(target.value);
      console.log('GHS: player guess: ' + guess);
  
      //check score by comparing value of selection to correctBox
      //increment score
      if(guess === hidingSpot) incrementPlayerScore();
      // else incrementComputerScore();
  
      setActiveSeeker('');
      setActiveHider('player');
    } else if(activeHider === 'player') {
      // setButtonClickable(true);
      //the player hides the item
      console.log('Player hid the item!');
      const playerHidingSpot = Number(target.value);
      setHidingSpot(playerHidingSpot);
      setActiveSeeker('computer');
      setActiveHider('');
    }
  };

  // const playerHidesItem = ({ target }) => {
  //   setHidingSpot(target.value);

  // };


  
  console.log('ACTIVE PLAYER (end): ' + activeSeeker);

  return (
    <main className={styles.Game}>
      <h2>Game</h2>
      <section>
        {/* display messages: Your turn, Computer turn, You score, They score */}
        <p>
          {/* Message #1: {playerSeeks ? 'Player picks box.' : 'Computer picks box.'} */}
          {playerSeeks && 'Player picks box.'}
          {computerSeeks && 'Computer picks box.'}
        </p>
        <p>
          {/* Message #2: {activeHider ? 'Player hides item.' : 'Computer hides item.'} */}
          {playerHides && 'Player hides item.'}
          {computerHides && 'Computer hides item.'}
        </p>
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
