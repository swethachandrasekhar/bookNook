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
        <a href="#mainContent" className="backtoTop" aria-label="back to the top">
          ↑
        </a>
        <footer>
          <div className="wrapper footerText">
            <p>All Product design and images credited to Rakuten Kobo Inc | PRH</p>
            <p>
              Created @ <a href="https://junocollege.com/"> Juno College </a>|
              Swetha Chandrasekhar
            </p>
          </div>
        </footer>
      </div>
    );
  }
}

export default App;


