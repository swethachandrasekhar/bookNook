import React, { Component } from 'react';
import firebase from './firebase.js'


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./fontawesome.js";
import {
  faShoppingCart,
  faHeart,
  faTimes,
  faCoffee,
} from "@fortawesome/fontawesome-free-solid";
class CartDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subtotal: 0,
      cartItems : []
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
          // console.log(`cartArray is `, cartArray);

          // let cartArray = this.state.cartItems;
          // console.log(`cart array rest`, cartArray);
          let price = 0;
          cartArray.forEach((cartItem) => {
            price = price + (cartItem[1].price);
            
            console.log(price);

          });
          price = price.toFixed(2);
          

          this.setState({
            subtotal: price,
            cartItems: cartArray
            
          });
        } else {
          this.setState({
            cartItems: [],
            subtotal: 0,
          });
        }
      });


  }

  render() {
    // console.log("inside cart", this.props.cartItems);
    return (
      <div className="cartDisplay">
        {/* display close button */}
        <button>
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <div className="cartHeader">
          <p>Shopping Cart</p>
          <p>X items</p>
        </div>
        <ul className="cartItems">
          {this.state.cartItems.map((item, index) => {
            return (
              <li key={item[0]}>
                <div>
                  <img src={item[1].bookImage} alt={item.title} />
                  <p>{item[1].title}</p>
                  <p>{item[1].authorName}</p>
                </div>
                <div>
                  <p>{item[1].price}</p>
                  <button
                    onClick={() => {
                      this.handleRemoveCartItem(item[0]);
                    }}
                  >
                    delete
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
        <div>
          <div>
            <p>
              Subtotal <span>{this.state.subtotal}</span>
            </p>
          </div>
          <div>
            <a href="">Continue Shopping</a>
            <button className="checkOut">Checkout</button>
          </div>
        </div>
      </div>
    );
  }
}

export default CartDisplay;