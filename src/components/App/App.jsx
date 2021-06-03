import React, { useState } from 'react';
import './App.scss';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from '../Header/Header';
import Home from '../Home/Home';
import Welcome from '../Welcome/Welcome';
import Game from '../Game/Game';
import Results from '../Results/Results';
// import { Router, Route, Switch } from "react-router";


const App = () => {
  const [gameActive, setGameActive] = useState(false);
  const [player, setPlayer] = useState('');
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);

  return (
    <div className="App">
      <Router>
        <Header
          gameActive={gameActive}
          player={player}
          playerScore={playerScore}
          computerScore={computerScore}
        />
        <Switch>
          <Route
            exact path="/"
            render={() => <Home setPlayer={setPlayer} />}
          />
          <Route
            exact path="/welcome"
            render={() => <Welcome 
              player={player}
              gameActive={gameActive}
              setGameActive={setGameActive}/>}
          />
          <Route
            exact path="/game"
            render={() => <Game
              gameActive={gameActive}
              setGameActive={setGameActive}
              setPlayerScore={setPlayerScore}
              setComputerScore={setComputerScore}
              playerScore={playerScore}
              computerScore={computerScore}/>}
          />
          <Route
            exact path="/results"
            render={() => <Results
              setGameActive={setGameActive}
              gameActive={gameActive}
              setPlayerScore={setPlayerScore}
              playerScore={playerScore}
              setComputerScore={setComputerScore}
              computerScore={computerScore}/>}
          />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
