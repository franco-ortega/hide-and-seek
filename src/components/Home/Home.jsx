import React from 'react';
import styles from './Home.module.scss';

const Home = () => {
  return (
    <main className={styles.Home}>
      <h2>Home Page!</h2>
      <section>
        <p>This is a Hide & Seek game. Enter your name and click on the Begin button to proceed.</p>
      </section>
    </main>
  );
};

export default Home;
