//DISPLAY WISHLIST ITEMS Class component

import React, { Component } from "react";
import firebase from "./firebase.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/fontawesome-free-solid";

class WishlistDisplay extends Component {
  constructor() {
    super();
    this.state = {
      subtotal: 0,
      wishlistArray: [],
      emptyList: false,
    };
  }
  componentDidMount() {
    // Make a DB ref to the books array to grab all the books
    const dbRefCart = firebase.database().ref("books");
    dbRefCart.on("value", (data) => {
      let wishlistItemsArray = [];
      //Grab data from database
      let cartObject = data.val();

      // Error Handling if the return object is null, in that case make the wishlist array empty
      if (cartObject !== null) {
        cartObject.forEach((book) => {
          if (book.addedToWishlist === true) {
            wishlistItemsArray.push(book);
          }
        });

        this.setState({
          wishlistArray: wishlistItemsArray,
        });
      } else {
        this.setState({
          wishlistArray: [],
        });
      }
    });
  }

  //Handle the cart close flag when clicking on the x button
  cartCloseButton = () => {
    this.props.WishlistDisplayState();
  };

  render() {
    // User require  context to display locally hosted images
    const images = require.context(`./../assets`, true);

    const showCartFlag = this.props.showWishlist;
    let cartVisible = "";
    // Handle Display wishlist class name based on the showCart flag
    showCartFlag
      ? (cartVisible = "cartDisplay visible")
      : (cartVisible = "cartDisplay");
   

    return (
      <div className={cartVisible}>
        <div className="cartWrapper">
          {/* display close button */}

          <button className="cartCloseButton" onClick={this.cartCloseButton}>
            <FontAwesomeIcon icon={faTimes} aria-label="Close" />
          </button>
          <div className="cartHeader">
            <p>Wishlist Items</p>
            <p>You have {this.state.wishlistArray.length} item(s)</p>
          </div>
          <div className="cartItems">
            <ul>
              {this.state.wishlistArray.map((item, index) => {
                const img_src = images(item.bookImage);
               

                return (
                  <li className="cartItem" key={index}>
                    <div className="cartItemBookDetails">
                      <img
                        className="cartImage"
                        src={img_src.default}
                        alt={item.title}
                      />
                      <div className="bookDetailsAndRemove">
                        <div className="cartTitleAndAuthor">
                          <p className="cartItemtitle">{item.title}</p>
                          <p className="cartItemAuthorName">
                            by {item.authorName}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="cartItemBookPrice">
                      <p>$ {item.price}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default WishlistDisplay;
