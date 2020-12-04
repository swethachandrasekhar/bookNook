import React, { Component } from "react";
import firebase from "./firebase.js";
import FilterSection from "./FilterSection.js";
import InventoryDisplay from "./InventoryDisplay.js";
import CartDisplay from "./CartDisplay.js";
import WishlistDisplay from "./WishlistDisplay.js";

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
      mainDisplay: [],
      emptyList: false,
    };
  }

  componentDidMount() {
    //create a reference to the DB to get all the books in the inventory
    const dbRef = firebase.database().ref("books");

    //Grab all the data from DB : event listener
    dbRef.on("value", (data) => {
      //Grab data from database
      const firebaseObj = data.val();
      //Create a temp array to store the DB items
      let booksArray = [];
      let ebooksListArray = [];
      let audioBooksArray = [];

      // Go over each item in the array and store in the temp array
      // Error handling : if empty object is returned from DB then set the empty list flag to true
      if (firebaseObj !== null) {
        firebaseObj.forEach((book) => {
          //Push book to audiobooks and ebooks array based on the filter
          if (book.mediaType === "eBooks") {
            ebooksListArray.push(book);
          } else if (book.mediaType === "audioBooks") {
            audioBooksArray.push(book);
          }

          booksArray.push(book);
        });

        // set state with all the parsed data
        this.setState({
          books: booksArray,
          ebooksList: ebooksListArray,
          audioBookslist: audioBooksArray,
          mainDisplay: booksArray,
          displayList: booksArray,
        });
      } else {
        this.setState({
          emptyList: true,
        });
      }
    });
  }

  //function set state the main books list (function called from child component)
  parentSetStateBooks = (obj) => {
    this.setState({ books: obj });
  };

  //function set state the displayed books list (function called from child component)
  parentSetStateDisplayList = (obj) => {
    this.setState({ displayList: obj });
  };

  //function set state the main display list (function called from child component)
  parentSetStateMainDisplay = (obj) => {
    this.setState({
      mainDisplay: obj,
      displayList: obj,
    });
  };

  //function set state the cart list (function called from child component)
  parentSetStateCartItems = (obj) => {
    this.setState({ cartItems: obj });
  };

  //function set state the subtotal (function called from child component)
  parentSetStateSubtotal = (obj) => {
    this.setState({ subtotal: obj });
  };

  //Handle when display wishlist is clicked.
  displayWishlist = () => {
    //filter through the books array and find the flag that is set to true
    const wishlistItems = this.state.books.filter((book) => {
      return book.addedToWishlist;
    });
    // set state the wishlist items array
    this.setState({
      mainDisplay: wishlistItems,
      displayList: wishlistItems,
    });
  };

  render() {
    // ERROR HANDLING - If the DB returned an null object then display user a message otherwise display the inventory
    return this.state.emptyList ? (
      <div className="errorMessage">
        Sorry☹️! Something went wrong. Please try again later{" "}
      </div>
    ) : (
      <main id="mainContent">
        <section className="inventorySection">
          {/* filter section component  */}
          <FilterSection
            allbooks={this.state.books}
            ebooksOnly={this.state.ebooksList}
            audioBooksOnly={this.state.audioBookslist}
            mainDisplay={this.state.mainDisplay}
            displayList={this.state.displayList}
            parentSetStateDisplayList={this.parentSetStateDisplayList}
            parentSetStateMainDisplay={this.parentSetStateMainDisplay}
            displayWishlist={this.displayWishlist}
          />

          {/* Inventory display component  */}
          <div className="inventoryDisplay">
            <div className="inventoryContainer">
              <InventoryDisplay
                mainDisplay={this.state.mainDisplay}
                displayList={this.state.displayList}
                addToCart={this.addToCart}
                parentSetStateBooks={this.parentSetStateBooks}
                books={this.state.books}
                displayWishlist={this.displayWishlist}
                parentSetStateDisplayList={this.parentSetStateDisplayList}
              />
            </div>
          </div>

          {/* Cart display component  */}
          <CartDisplay
            showCart={this.props.showCart}
            CartDisplayState={this.props.CartDisplayState}
            allbooks={this.state.books}
          />
          {/* Wishlist Display component  */}
          <WishlistDisplay
            showWishlist={this.props.showWishlist}
            WishlistDisplayState={this.props.WishlistDisplayState}
          />
         </section>
       </main>
    );
  }
}

export default Inventory;
