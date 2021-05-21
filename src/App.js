import React from 'react';
// import logo from './logo.svg';
import './App.scss';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import { Router, Route, Switch } from "react-router";


const App = () => {
  //Header
  //Home page
  //Welcome/Instructions page
  //Game page

  return (

    <div className="App">
      <Router>
        HEADER
        <Switch>
          {/* <Route exact path="/" component={Home} /> */}
        </Switch>
      </Router>
    </div>
  );
};

export default App;
