import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import GameBoard from './containers/GameBoard';

class App extends Component {
  render() {
    return (
      <GameBoard />
    );
  }
}

export default App;
