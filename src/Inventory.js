import React, { Component } from 'react';
import firebase from './firebase.js'
import FilterSection from './FilterSection.js'
import InventoryDisplay from './InventoryDisplay.js'
import CartDisplay from "./CartDisplay.js";

class Inventory extends Component {
  constructor() {
    super();
    this.state = {
      books: [],
      ebooksList: [],
      audioBookslist: [],
      displayList: [],
      cartItems: [],
      wishlistItems: [],
      subtotal: 0,
    };
  }

  componentDidMount() {
    const dbRef = firebase.database().ref("books");
    // const dbRefCart = firebase.database().ref("cart");
    const dbRefWishlist = firebase.database().ref("wishlist");
    // const firebaseObj;
    dbRef.on("value", (data) => {
      //Grab data from database
      const firebaseObj = data.val();
      //Create a temp array to store the DB items
      let booksArray = [];
      let ebooksListArray = [];
      let audioBooksArray = [];

      // Go over each item in the array and store in the temp array
      firebaseObj.forEach((book) => {
        if (book.mediaType === "eBooks") {
          ebooksListArray.push(book);
        } else if (book.mediaType === "audioBooks") {
          audioBooksArray.push(book);
        }

        booksArray.push(book);
      });
      console.log(booksArray);

      this.setState({
        books: booksArray,
        ebooksList: ebooksListArray,
        audioBookslist: audioBooksArray,
        displayList: booksArray,
      });
    });


    dbRefWishlist.on("value", (data) => {
      //Grab data from database
      let wishlistObject = data.val();

      console.log(wishlistObject);
      if (wishlistObject !== null) {
        let wishlistArray = Object.entries(wishlistObject);
        console.log(`cartArray is `, wishlistArray);
        this.setState({
          wishlistItems: wishlistArray,
        });
      } else {
        this.setState({
          wishlistItems: [],
        });
      }
    });
  }

  parentSetStateBooks = (obj) => {
    this.setState({ books: obj });
  };
  parentSetStateDisplayList = (obj) => {
    console.log(obj);
    this.setState({ displayList: obj });
  };

  parentSetStateCartItems = (obj) => {
    console.log(obj);
    this.setState({ cartItems: obj });
  };
  parentSetStateSubtotal = (obj) => {
    console.log(obj);
    this.setState({ subtotal: obj });
  };
  
  


  render() {
    console.log(`cart items`, this.state.cartItems);
    return (
      <section className="inventorySection wrapper">
        <FilterSection
          // handleFilter={this.handleFilter}
          allbooks={this.state.books}
          ebooksOnly={this.state.ebooksList}
          audioBooksOnly={this.state.audioBookslist}
          parentSetStateDisplayList={this.parentSetStateDisplayList}
        />

        <InventoryDisplay
          displayList={this.state.displayList}
          addToCart={this.addToCart}
          parentSetStateBooks={this.parentSetState}
          books={this.state.books}
        />
        <CartDisplay
          // cartItems={this.state.cartItems}
          // handleRemoveCartItem={this.handleRemoveCartItem}
          // parentSetStateCartItems={this.parentSetStateCartItems}
          // parentSetStateSubtotal={this.parentSetStateSubtotal}
        />

        <div className="wishlistDisplay"></div>
      </section>
    );
  }
}

export default Inventory;