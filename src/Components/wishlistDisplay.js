import React, { Component } from 'react';
import firebase from "./firebase.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./fontawesome.js";
import {
  faShoppingCart,
  faHeart,
  faTimes,
  faCoffee,
  faImages,
} from "@fortawesome/fontawesome-free-solid";

 
class WishlistDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subtotal: 0,
      wishlistArray: [],
    };
  }
  componentDidMount() {
    const dbRefCart = firebase.database().ref("books");
    dbRefCart.on("value", (data) => {
        let wishlistItemsArray = [];
      //Grab data from database
      let cartObject = data.val();

        cartObject.forEach((book)=>{
            if (book.addedToWishlist === true){
                wishlistItemsArray.push(book);
            }

        })

        console.log(`wishlistItemsArray`, wishlistItemsArray);

        this.setState({
            wishlistArray : wishlistItemsArray,
        })

    });
  }
  cartCloseButton = () => {
    this.props.WishlistDisplayState();
  };

  render() {
      console.log("inside wihslistDisplay.js", this.props.showWishlist);
      const images = require.context(`./../assets`, true);
      console.log(images);
      const showCartFlag = this.props.showWishlist;
      let cartVisible = "";
      showCartFlag
        ? (cartVisible = "cartDisplay visible")
        : (cartVisible = "cartDisplay");
      console.log("cartVisible", cartVisible);

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
            <p>Wishlist Items</p>
            <p>You have {this.state.wishlistArray.length} item(s)</p>
          </div>
          <div className="cartItems">
            <ul>
              {this.state.wishlistArray.map((item, index) => {
                const img_src = images(item.bookImage);
                console.log(img_src);

                return (
                  <li className="cartItem" key={index}>
                    <div className="cartItemBookDetails">
                      <img
                        className="cartImage"
                        // src={item[1].bookImage}
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
                        {/* <button
                          className="removeFromCart"
                          onClick={() => {
                            this.handleRemoveCartItem(item);
                          }}
                        >
                          Remove
                        </button> */}
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