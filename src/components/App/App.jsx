import React, { useState } from 'react';
import './App.scss';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from '../Header/Header';
import Home from '../Home/Home';
import Welcome from '../Welcome/Welcome';
import Game from '../Game/Game';
// import { Router, Route, Switch } from "react-router";


const App = () => {
  const [player, setPlayer] = useState('');
  const [gameActive, setGameActive] = useState(false);

  return (
    <div className="App">
      <Router>
        <Header player={player} gameActive={gameActive} />
        <Switch>
          <Route
            exact path="/"
            render={() => <Home setPlayer={setPlayer} />} />
          <Route
            exact path="/welcome"
            render={() => <Welcome 
              player={player}
              gameActive={gameActive}
              setGameActive={setGameActive}/>} />
          <Route
            exact path="/game"
            render={() => <Game
              gameActive={gameActive}
              setGameActive={setGameActive}/>} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
