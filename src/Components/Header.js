import React, { Component } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import firebase from "./firebase.js";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCheckSquare, faCoffee } from "@fortawesome/fontawesome-free-solid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './fontawesome.js' 
import {
  faShoppingCart,
  faHeart,
} from "@fortawesome/fontawesome-free-solid";
// import BackgroundVideo from './backgroundVideo.js'

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wishlistCount: "",
      cartCount: "",
    };
  }

  componentDidMount() {
    console.log("inside header");

    const dbRefCart = firebase.database().ref("cart");
    const dbRefBooks = firebase.database().ref("books");

    dbRefCart.on("value", (data) => {
      //Grab data from database
      const cartObject = data.val();
      // let cartArray = Object.values(cartObject);
      if (cartObject !== null) {
        let cartArray = Object.entries(cartObject);
        const numberOfItemsInCart = cartArray.length;
        console.log(`cartArray is `, cartArray);
        this.setState({
          cartCount: numberOfItemsInCart,
        });
      } else {
        this.setState({
          cartCount: 0,
        });
      }
    });
    dbRefBooks.on("value", (data) => {
      //Grab data from database
      const wishlistObject = data.val();
      if (wishlistObject !== null) {
        let booksArray = Object.values(wishlistObject);

        const wishListArray = booksArray.filter((book) => {
          if (book.addedToWishlist) {
            return book;
          } 

        });

        const numberOfItemsInWishlist = wishListArray.length;

        this.setState({
          wishlistCount: numberOfItemsInWishlist,
        });
      } else {
        this.setState({
          wishlistCount: 0,
        });
      }
    });

    // let wishlistArray = this.state.
  }
  openInNewTab = () => {
    var win = window.open("./wishlist.html", "_blank");
    win.focus();
  };
  
  render() {
    console.log("inside header.js", this.props.showCart);
    // console.log(
    //   `cart count and wishlist count `,
    //   this.state.cartCount,
    //   this.state.wishlistCount
    // );
    return (
      <header>
        <a href="#mainContent" class="skipLink">
          Skip to main content.
        </a>
        <div className="wrapper">
          <div className="siteHeader">
            <h1>
              {" "}
              <span className="logoBook">Book</span>
              <span className="logoPipe">📖</span>{" "}
              <span className="logoTopia">topia</span>
            </h1>

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
                {/* <input type="checkbox" id="toggle" name="toggle"></input>
            <label class="cartCloseButton" htmlFor="toggle">
              <FontAwesomeIcon icon={faShoppingCart} />
            </label> */}

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
        <div className="logo ">
          {/* <h1 className="wrapper">Booktopia</h1> */}
        </div>
        {/* <video  loop autoplay>
            <source src="" type="video/mp4">
            <source src="" type="video/ogg">
        
        </video> */}
      </header>
    );
  }
}

export default Header;
