import React, { Component } from 'react';
import Header from './Header.js'
import '../styles/App.scss';
import Inventory from './Inventory.js';
import "./fontawesome.js";


class App extends Component {
  constructor() {
    super();

    this.state = {
      showCart: false,
      showWishlist: false,
    };
  }
  handleShowCart = () => {
    // const showCartFlag

    this.setState({
      showCart: !this.state.showCart,
    });
  };

  CartDisplayState = () => {
    this.setState({
      showCart: false,
    });
  };
  handleShowWishlist = () => {
    // const showCartFlag

    this.setState({
      showWishlist: !this.state.showWishlist,
    });
  };

  WishlistDisplayState = () => {
    this.setState({
      showWishlist: false,
    });
  };

  render() {
    console.log("inside app.js", this.state.showCart);
    return (
      <div className="App">
        <Header
          showCart={this.state.showCart}
          handleShowCart={this.handleShowCart}
          showWishlist={this.state.showWishlist}
          handleShowWishlist={this.handleShowWishlist}
        />

        <Inventory
          showCart={this.state.showCart}
          handleShowCart={this.handleShowCart}
          showWishlist={this.state.showWishlist}
          handleShowWishlist={this.handleShowWishlist}
          CartDisplayState={this.CartDisplayState}
          WishlistDisplayState={this.WishlistDisplayState}
        />
        <a href="#" className="backtoTop">↑</a>
        <footer>
          <p>Created @ Juno College | Swetha Chandrasekhar</p>
        </footer>
      </div>
    );
  }
}

export default App;


