import React from 'react';
import PropTypes from 'prop-types';
import styles from './Home.module.scss';
import { useHistory } from 'react-router';

const Home = ({ setPlayer }) => {
  let history = useHistory();

  const playerObject = {
    player: ''
  };
  const onPlayerChange = (e) => {
    playerObject.player = e.target.value;
  };

  const onPlayerSubmit = (e) => {
    e.preventDefault();
    console.log('Clicked!');
    setPlayer(playerObject.player);
    history.push('/welcome');
  };

  return (
    <main className={styles.Home}>
      <h2>Home Page!</h2>
      <section>
        <p>This is a Hide & Seek game. Enter your name and click on the button to proceed.</p>
        <form onSubmit={onPlayerSubmit}>
          <label htmlFor="name">
            Name: <input
              id="name"
              type="text"
              placeholder="Name"
              onChange={onPlayerChange} />
          </label>
          <button>Click to Proceed</button>
        </form>
      </section>
    </main>
  );
};

Home.propTypes = {
  setPlayer: PropTypes.func
};
  

export default Home;
