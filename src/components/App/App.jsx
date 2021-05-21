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
  

  return (
    <div className="App">
      <Router>
        <Header player={player} />
        <Switch>
          <Route exact path="/" render={() => <Home setPlayer={setPlayer} />} />
          <Route exact path="/welcome" render={() => <Welcome player={player} />} />
          <Route exact path="/game" component={Game} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
