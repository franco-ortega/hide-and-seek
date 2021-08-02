import React from 'react';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';
import styles from './Home.module.scss';

const Home = ({ setPlayer }) => {
  let history = useHistory();

  const onPlayerSubmit = (e) => {
    e.preventDefault();
    history.push('/welcome');
  };

  return (
    <main className={styles.Home}>
      <section>
        <p>This is a Hide & Seek game where you play against the computer. Enter your name, and then, click on the button to proceed.</p>
        <form onSubmit={onPlayerSubmit}>
          <label htmlFor="name">
            Name: <input
              id="name"
              name="name"
              type="text"
              maxLength="25"
              placeholder="Name"
              onChange={({ target }) => setPlayer(target.value)} />
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
