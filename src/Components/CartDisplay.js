// Cart display class Component

import React, { Component } from "react";
import firebase from "./firebase.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/fontawesome-free-solid";

class CartDisplay extends Component {
  constructor() {
    super();
    this.state = {
      subtotal: 0,
      cartItems: [],
    };
  }

  // Function to Handle remove from Cart
  handleRemoveCartItem = (bookTitle, index) => {
    //Create a reference to the DB
    const dbRefCart = firebase.database().ref(`cart`);

    let bookIndex = "";
    //Find that item in the books array so inventory can be updated by 1
    const bookItem = this.props.allbooks.filter((book, index) => {
      if (book.title === bookTitle) {
        bookIndex = index;
      }
      return book.title === bookTitle;
    });

    bookItem[0].inventory = bookItem[0].inventory + 1;

    //Update the inventory of the book by 1 in the DB
    const dbRef = firebase.database().ref(`books/${bookIndex}`);
    dbRef.update(bookItem[0]);
    //Remove cart item
    dbRefCart.child(index).remove();
  };

  componentDidMount() {
    // Create a ref to the Cart table in the DB

    const dbRefCart = firebase.database().ref("cart");
    dbRefCart.on("value", (data) => {
      //Grab data from database
      let cartObject = data.val();
      // ERROR HANDLING if cart object is null set the array to empty
      if (cartObject !== null) {
        let cartArray = Object.entries(cartObject);
        let price = 0;

        // grab price for each book and calculate subtotal
        cartArray.forEach((cartItem) => {
          price = price + cartItem[1].price;
        });
        price = price.toFixed(2);

        this.setState({
          subtotal: price,
          cartItems: cartArray,
        });
      } else {
        this.setState({
          cartItems: [],
          subtotal: 0,
        });
      }
    });
  }

  // Set the display state when X is clicked to close the cart
  cartCloseButton = () => {
    this.props.CartDisplayState();
  };

  render() {
    // User require  context to display locally hosted images

    const images = require.context(`./../assets`, true);
    const showCartFlag = this.props.showCart;
    let cartVisible = "";
    // Handle Display cart class name based on the showCart flag
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
            <p>Shopping Cart</p>
            <p>You have {this.state.cartItems.length} item(s)</p>
          </div>
          <div className="cartItems">
            <ul>
              {this.state.cartItems.map((item, index) => {
                const img_src = images(item[1].bookImage);
              

                return (
                  <li className="cartItem" key={item[0]}>
                    <div className="cartItemBookDetails">
                      <img
                        className="cartImage"
                        src={img_src.default}
                        alt={item[1].title}
                      />
                      <div className="bookDetailsAndRemove">
                        <div className="cartTitleAndAuthor">
                          <p className="cartItemtitle">{item[1].title}</p>
                          <p className="cartItemAuthorName">
                            by {item[1].authorName}
                          </p>
                        </div>
                        <button
                          className="removeFromCart"
                          onClick={() => {
                            this.handleRemoveCartItem(item[1].title, item[0]);
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                    <div className="cartItemBookPrice">
                      <p>$ {item[1].price}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
            <div>
              <div className="subTotal">
                <p>
                  Subtotal{" "}
                  <span className="subTotalAmount">
                    $ {this.state.subtotal}
                  </span>
                </p>
              </div>
              <div className="carFooter">
                <a href="#mainContent" onClick={this.cartCloseButton}>
                  Continue Shopping
                </a>
                <button className="checkOut">Checkout</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CartDisplay;
