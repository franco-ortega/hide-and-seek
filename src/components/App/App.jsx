import React from 'react';
import './App.scss';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from '../Home/Home';
import Header from '../Header/Header';
import Welcome from '../Welcome/Welcome';
import Game from '../Game/Game';
// import { Router, Route, Switch } from "react-router";


const App = () => {
  //Header
  //Home page
  //Welcome/Instructions page
  //Game page

  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/welcome" component={Welcome} />
          <Route exact path="/game" component={Game} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
