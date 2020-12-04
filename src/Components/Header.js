// HEADER Class Component

import { Component } from "react";
import firebase from "./firebase.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faHeart } from "@fortawesome/fontawesome-free-solid";

class Header extends Component {
  constructor() {
    super();
    this.state = {
      wishlistCount: "",
      cartCount: "",
    };
  }

  componentDidMount() {
    // Creating a reference to the database to get cart items and books
    const dbRefCart = firebase.database().ref("cart");
    const dbRefBooks = firebase.database().ref("books");

    dbRefCart.on("value", (data) => {
      //Grab data from database
      const cartObject = data.val();

      //Error handling: Check if the returned object from DB is empty, if it is empty set count to 0
      if (cartObject !== null) {
        let cartArray = Object.entries(cartObject);
        const numberOfItemsInCart = cartArray.length;
        // Set Cart items count
        this.setState({
          cartCount: numberOfItemsInCart,
        });
      } else {
        this.setState({
          cartCount: 0,
        });
      }
    });

    // Books Inventory
    dbRefBooks.on("value", (data) => {
      //Grab data from database
      const wishlistObject = data.val();

      //Error handling: Check if the returned object from DB is empty, if it is empty set count to 0
      if (wishlistObject !== null) {
        let booksArray = Object.values(wishlistObject);

        // filter the list to get the book with added to wishlist flag is true
        const wishListArray = booksArray.filter((book) => {
          if (book.addedToWishlist) {
            return book;
          } 
        });

        const numberOfItemsInWishlist = wishListArray.length;

        //Set the wishlist count
        this.setState({
          wishlistCount: numberOfItemsInWishlist,
        });
      } else {
        this.setState({
          wishlistCount: 0,
        });
      }
    });
  }

  render() {
    return (
      <header>
        {/* SKIP LINK for accessibility  */}
        <a href="#mainContent" className="skipLink">
          Skip to main content.
        </a>

        <div className="siteHeader">
          <div className="siteHeaderWrapper">
            <h1>
              {" "}
              <span className="logoBook">Book</span>
              <span className="logoPipe" aria-hidden="true">
                📖
              </span>{" "}
              <span className="logoTopia">topia</span>
            </h1>

            {/* Header Link for cart and wishlist  */}
            <nav className="shoppingCartAndWishlist">
              <li>
                <button
                  className="wishlist"
                  onClick={this.props.handleShowWishlist}
                >
                  <FontAwesomeIcon
                    icon={faHeart}
                    className="wishlistIcon"
                    aria-label="Wishlist"
                  />
                  <span>Wishlist</span>
                </button>
                <p className="wishlistCount">{this.state.wishlistCount}</p>
              </li>
              <li>
                <button
                  className="showCart"
                  onClick={this.props.handleShowCart}
                >
                  <FontAwesomeIcon
                    icon={faShoppingCart}
                    className="showCartIcon"
                    aria-label="Cart"
                  />
                  <span>Cart</span>
                </button>
                <p className="cartCount">{this.state.cartCount}</p>
              </li>
            </nav>
          
          </div>
        </div>
        <div className="logo "></div>
      </header>
    );
  }
}

export default Header;
