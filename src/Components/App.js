import { Component } from "react";
import Header from "./Header.js";
import Inventory from "./Inventory.js";
import "../styles/App.scss";


class App extends Component {
  constructor() {
    super();

    this.state = {
      //flags to manage the wishlist and cart display in the header
      showCart: false,
      showWishlist: false,
    };
  }

  //function to toggle the cart display state on click
  handleShowCart = () => {
    this.setState({
      showCart: !this.state.showCart,
    });
  };

  //function to set cart display state to false on clicking close button
  CartDisplayState = () => {
    this.setState({
      showCart: false,
    });
  };

  //function to toggle the cart display state on click
  handleShowWishlist = () => {
    this.setState({
      showWishlist: !this.state.showWishlist,
    });
  };

  //function to set wishlist display state to false on clicking close button
  WishlistDisplayState = () => {
    this.setState({
      showWishlist: false,
    });
  };

  render() {
    return (
      <div className="App">
        {/* Header component  */}
        <Header
          showCart={this.state.showCart}
          handleShowCart={this.handleShowCart}
          showWishlist={this.state.showWishlist}
          handleShowWishlist={this.handleShowWishlist}
        />

        {/* Inventory Section Component  */}
        <Inventory
          showCart={this.state.showCart}
          handleShowCart={this.handleShowCart}
          showWishlist={this.state.showWishlist}
          handleShowWishlist={this.handleShowWishlist}
          CartDisplayState={this.CartDisplayState}
          WishlistDisplayState={this.WishlistDisplayState}
        />

        {/* Back to the top link  */}
        <a
          href="#mainContent"
          className="backtoTop"
          aria-label="back to the top"
        >
          ↑
        </a>

        {/* footer section  */}
        <footer>
          <div className="wrapper footerText">
            <p>
              All Product design and images credited to Rakuten Kobo Inc | PRH
            </p>
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
