import React, { Component } from 'react';
import Header from './Header.js'
import '../styles/App.scss';
import Inventory from './Inventory.js';
import "./fontawesome.js";

class App extends Component {
  render() {

    return (
      <div className="App">
       
        <Header />
        
        <Inventory />
        
      </div>
    );
  }
}

export default App;


