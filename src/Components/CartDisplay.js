import React, { Component } from 'react';
import firebase from './firebase.js';
// import Inventory from './Inventory.js';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./fontawesome.js";
import { faTimes } from "@fortawesome/fontawesome-free-solid";
class CartDisplay extends Component {
  constructor() {
    super();
    this.state = {
      subtotal: 0,
      cartItems: [],
    };
  }

  handleRemoveCartItem = (index) => {
    const dbRefCart = firebase.database().ref(`cart`);

    const newCartArray = this.state.cartItems.filter((cartItem) => {
      return cartItem[0] !== index;
    });
    dbRefCart.on("value", (data) => {
      // console.log(data.val());
    });
    dbRefCart.child(index).remove();
    // this.props.parentSetStateCartItems(newCartArray);

    this.setState({
      cartItems: newCartArray,
    });
    // console.log("The cart array is now this ", newCartArray);
  };

  componentDidMount() {
    const dbRefCart = firebase.database().ref("cart");
    dbRefCart.on("value", (data) => {
      //Grab data from database
      let cartObject = data.val();

      // console.log(cartObject);
      if (cartObject !== null) {
        let cartArray = Object.entries(cartObject);
        let price = 0;
        cartArray.forEach((cartItem) => {
          price = price + cartItem[1].price;

          console.log(price);
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
  cartCloseButton = () => {

    this.props.CartDisplayState()

  }

  render() {
    console.log("inside cartDisplau.js", this.props.showCart);
    const images = require.context(`./../assets`, true);
    console.log(images);
    const showCartFlag = this.props.showCart;
    let cartVisible = "";
    showCartFlag
      ? (cartVisible = "cartDisplay visible")
      : (cartVisible = "cartDisplay");
    console.log("cartVisible", cartVisible);

    // console.log("inside cart", this.props.cartItems);
    return (
      <div className={cartVisible}>
        <div className="cartWrapper">
          {/* display close button */}
          {/* <input type="checkbox" id="toggle" name="toggle"></input>
          <label class="cartCloseButton" htmlFor="toggle">
            <FontAwesomeIcon icon={faTimes} />
          </label> */}
          <button className="cartCloseButton" onClick={this.cartCloseButton}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
          <div className="cartHeader">
            <p>Shopping Cart</p>
            <p>You have {this.state.cartItems.length} item(s)</p>
          </div>
          <div className="cartItems">
            <ul>
              {this.state.cartItems.map((item, index) => {
                const img_src = images(item[1].bookImage);
                console.log(img_src);

                return (
                  <li className="cartItem" key={item[0]}>
                    <div className="cartItemBookDetails">
                      <img
                        className="cartImage"
                        // src={item[1].bookImage}
                        src={img_src.default}
                        alt={item.title}
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
                            this.handleRemoveCartItem(item[0]);
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
                <a href="#">Continue Shopping</a>
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