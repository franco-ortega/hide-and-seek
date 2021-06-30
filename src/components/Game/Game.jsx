import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Game.module.scss';
import { useHistory } from 'react-router';
import { useMessage } from '../../hooks/useMessage';

const Game = ({
  // gameActive,
  setGameActive,
  playerScore,
  setPlayerScore,
  computerScore,
  setComputerScore
}) => {
  let history = useHistory();

  const [hidingSpot, setHidingSpot] = useState(0);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  // const [activeHider, setActiveHider] = useState('computer');
  // const [activeSeeker, setActiveSeeker] = useState('');
  const [madeGuess, setMadeGuess] = useState('');

  const [currentAction, setCurrentAction] = useState('computer hides');
  // List of currentActions: computer hides, player seeks, player hides, computer seeks





  const {
    setGameOver,
    selectActionMessage,
    setCorrect,
    setDisplayResult,
    selectResultMessage
  } = useMessage(currentAction);

  const actionMessage = selectActionMessage();
  const resultMessage = selectResultMessage();

  const incrementScore = (scorer) => {
    if(scorer === 'player') {
      setPlayerScore(playerScore + 1);
    } else {
      setComputerScore(computerScore + 1);
    }
  };

  const computerHidesItem = () => {
    const computerHidingSpot = Math.ceil(Math.random() * 3);
    console.log('computer hiding spot: ' + computerHidingSpot);
    setHidingSpot(computerHidingSpot);
    console.log('TEST 1');
    // setActiveSeeker('player');
    setCurrentAction('player seeks');
    console.log('TEST 2');
  };

  const computerMakesGuess = () => {
    console.log('The computer is making a guess');

    //random select a number
    const computerGuess = Math.ceil(Math.random() * 3);
    console.log('CT: hiding spot = ' + hidingSpot + '; computer guess = ' + computerGuess);

    //compare guess to hiding spot; if correct, increment computer score
    if(computerGuess === hidingSpot) {
      incrementScore('computer');
      setCorrect(true);
    } else {
      setCorrect(false);
    }

    setDisplayResult(true);
    setMadeGuess('computer');
  };

  useEffect(() => {
    console.log('Score Check useEffect');
    if(playerScore === 3 || computerScore === 3) {
      setButtonDisabled(true);
      setGameOver(true);
      setTimeout(() => {
        setGameActive(false);
        history.push('/results');
      }, 2000);
    } else if(madeGuess === 'player') {
      console.log('Player made guess.');
      setTimeout(() => {
        setDisplayResult(false);
        // setActiveHider('player');
        // setActiveSeeker('');
        setCurrentAction('player hides');
      }, 2000);
    } else if(madeGuess === 'computer') {
      console.log('Computer made guess.');
      setTimeout(() => {
        setDisplayResult(false);
        // setActiveHider('computer');
        // setActiveSeeker('');
        setCurrentAction('computer hides');
      }, 2000);
    }
  }, [madeGuess]);

  useEffect(() => {
    console.log('Current Action useEffect');

    if(currentAction === 'player hides' || currentAction === 'player seeks') {
      console.log('Player action.');
      setButtonDisabled(false);
    }
    
    if(currentAction === 'computer hides') {
      console.log('Computer will hide.');
      setTimeout(() => {
        computerHidesItem();
      }, 2000);
    }

    
    if(currentAction === 'computer seeks') {
      console.log('Computer will seek.');
      setTimeout(() => {
        computerMakesGuess();
      }, 2000);
    }
    
    if(currentAction === '') {
      console.log('No one is acting');
    }
  }, [currentAction]);

  //player clicks box to make guess || or to hide item
  const onPlayerTurnClick = ({ target }) => {
    if(currentAction === 'player seeks') {
      const playerGuess = Number(target.value);

      console.log('PT: hiding spot = ' + hidingSpot + '; player guess = ' + playerGuess);

      if(playerGuess === hidingSpot) {
        incrementScore('player');
        setCorrect(true);
      } else {
        setCorrect(false);
      }

      setButtonDisabled(true);
      setDisplayResult(true);
      setMadeGuess('player');
      
    } else if(currentAction === 'player hides') {
      //the player hides the item
      const playerHidingSpot = Number(target.value);
      console.log('player hides item: ' + playerHidingSpot);
      
      setHidingSpot(playerHidingSpot);
      // setActiveSeeker('computer');
      setCurrentAction('computer seeks');
      setButtonDisabled(true);
    }
  };

  console.log('Bottom of file - current action: ' + currentAction);


  // const {
  //   setGameOver,
  //   selectActionMessage,
  //   setCorrect,
  //   setDisplayResult,
  //   selectResultMessage
  // } = useMessage(activeHider, activeSeeker);

  // const actionMessage = selectActionMessage();
  // const resultMessage = selectResultMessage();

  // const incrementScore = (scorer) => {
  //   if(scorer === 'player') {
  //     setPlayerScore(playerScore + 1);
  //   } else {
  //     setComputerScore(computerScore + 1);
  //   }
  // };

  // const computerHidesItem = () => {
  //   const computerHidingSpot = Math.ceil(Math.random() * 3);
  //   console.log('computer hiding spot: ' + computerHidingSpot);
  //   setHidingSpot(computerHidingSpot);
  //   console.log('TEST 1');
  //   setActiveSeeker('player');
  //   console.log('TEST 2');
  // };

  // const computerMakesGuess = () => {
  //   console.log('The computer is making a guess');

  //   //random select a number
  //   const computerGuess = Math.ceil(Math.random() * 3);
  //   console.log('CT: hiding spot = ' + hidingSpot + '; computer guess = ' + computerGuess);

  //   //compare guess to hiding spot; if correct, increment computer score
  //   if(computerGuess === hidingSpot) {
  //     incrementScore('computer');
  //     setCorrect(true);
  //   } else {
  //     setCorrect(false);
  //   }

  //   setDisplayResult(true);
  //   setMadeGuess('computer');
  // };

  // useEffect(() => {
  //   console.log('Score Check useEffect');
  //   if(playerScore === 3 || computerScore === 3) {
  //     setButtonDisabled(true);
  //     setGameOver(true);
  //     setTimeout(() => {
  //       setGameActive(false);
  //       history.push('/results');
  //     }, 2000);
  //   } else if(madeGuess === 'player') {
  //     console.log('Player made guess.');
  //     setTimeout(() => {
  //       setDisplayResult(false);
  //       setActiveHider('player');
  //       setActiveSeeker('');
  //     }, 2000);
  //   } else if(madeGuess === 'computer') {
  //     console.log('Computer made guess.');
  //     setTimeout(() => {
  //       setDisplayResult(false);
  //       setActiveHider('computer');
  //       setActiveSeeker('');
  //     }, 2000);
  //   }
  // }, [madeGuess]);

  // useEffect(() => {
  //   console.log('Action Check useEffect');
  //   if(activeHider === 'player') {
  //     console.log('Player will hide.');
  //     setButtonDisabled(false);
  //   } else if(activeHider === 'computer') {
  //     console.log('Computer will hide.');
  //     setTimeout(() => {
  //       computerHidesItem();
  //     }, 2000);
  //   } else if(activeHider === '') {
  //     console.log('No one is hiding');
  //   }
  // }, [activeHider]);

  // useEffect(() => {
  //   console.log('Seeker changed useEffect');
  //   if(activeSeeker === 'player') {
  //     console.log('Player will seek.');
  //     setButtonDisabled(false);
  //   } else if(activeSeeker === 'computer') {
  //     console.log('Computer will seek.');
  //     setTimeout(() => {
  //       computerMakesGuess();
  //     }, 2000);
  //   } else if(activeSeeker === '') {
  //     console.log('No one is seeking');
  //   }
  // }, [activeSeeker]);

  // //player clicks box to make guess || or to hide item
  // const onPlayerTurnClick = ({ target }) => {
  //   if(activeSeeker === 'player') {
  //     const playerGuess = Number(target.value);

  //     console.log('PT: hiding spot = ' + hidingSpot + '; player guess = ' + playerGuess);

  //     if(playerGuess === hidingSpot) {
  //       incrementScore('player');
  //       setCorrect(true);
  //     } else {
  //       setCorrect(false);
  //     }

  //     setButtonDisabled(true);
  //     setDisplayResult(true);
  //     setMadeGuess('player');
      
  //   } else if(activeHider === 'player') {
  //     //the player hides the item
  //     const playerHidingSpot = Number(target.value);
  //     console.log('player hides item: ' + playerHidingSpot);
      
  //     setHidingSpot(playerHidingSpot);
  //     setActiveSeeker('computer');
  //     setButtonDisabled(true);
  //   }
  // };

  // console.log('Bottom of file');

  return (
    <main className={styles.Game}>
      <h2>Happy seeking!!</h2>
      <section>
        {actionMessage}
      </section>
      <section className={styles.Buttons}>
        <button value="1" disabled={buttonDisabled} onClick={onPlayerTurnClick}>Box 1</button>
        <button value="2" disabled={buttonDisabled} onClick={onPlayerTurnClick}>Box 2</button>
        <button value="3" disabled={buttonDisabled} onClick={onPlayerTurnClick}>Box 3</button>
      </section>
      <section>
        {resultMessage}
      </section>
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
