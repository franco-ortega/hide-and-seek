import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { GameProvider } from '../../state/GameContext';
import Header from '../Header/Header';
import Home from '../Home/Home';
import Welcome from '../Welcome/Welcome';
import Game from '../Game/Game';
import Results from '../Results/Results';
import './App.scss';

const App = () => {
  const [gameActive, setGameActive] = useState(false);
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [difficulty, setDifficulty] = useState('');

  return (
    <div className="App">
      <Router>
        <GameProvider>
          <Header />
          <Switch>
            <Route
              exact path="/"
              component={Home}
            />
            <Route
              exact path="/welcome"
              render={() => <Welcome
                setDifficulty={setDifficulty}
                setGameActive={setGameActive}/>}
            />
            <Route
              exact path="/game"
              render={() => <Game
                difficulty={difficulty}
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
        </GameProvider>
      </Router>
    </div>
  );
};

export default App;
