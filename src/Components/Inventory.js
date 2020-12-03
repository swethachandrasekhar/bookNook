import React, { Component } from 'react';
import firebase from './firebase.js'
import FilterSection from './FilterSection.js'
import InventoryDisplay from './InventoryDisplay.js'
import CartDisplay from "./CartDisplay.js";
import WishlistDisplay from './wishlistDisplay.js'

class Inventory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      ebooksList: [],
      audioBookslist: [],
      displayList: [],
      cartItems: [],
      wishlistItems: [],
      subtotal: 0,
      mainDisplay: [],
    };
  }

  componentDidMount() {
    const dbRef = firebase.database().ref("books");
    // const dbRefCart = firebase.database().ref("cart");
    // const dbRefWishlist = firebase.database().ref("books");
    // const firebaseObj;
    dbRef.on("value", (data) => {
      //Grab data from database
      const firebaseObj = data.val();
      //Create a temp array to store the DB items
      let booksArray = [];
      let ebooksListArray = [];
      let audioBooksArray = [];

      // Go over each item in the array and store in the temp array
      console.log(`In here....`, firebaseObj);

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
        mainDisplay: booksArray,
        displayList: booksArray,
        
      });
    });

    

    // dbRefWishlist.on("value", (data) => {
    //   //Grab data from database
    //   let wishlistObject = data.val();

    //   console.log(wishlistObject);


    //   if (wishlistObject !== null) {
    //     let wishlistArray = Object.entries(wishlistObject);
    //     console.log(`cartArray is `, wishlistArray);
    //     this.setState({
    //       wishlistItems: wishlistArray,
    //     });
    //   } else {
    //     this.setState({
    //       wishlistItems: [],
    //     });
    //   }
    // });
  }

  getCatergories = () => {};

  parentSetStateBooks = (obj) => {
    this.setState({ books: obj });
  };
  parentSetStateDisplayList = (obj) => {
    console.log(obj);
    this.setState({ displayList: obj });
  };
  parentSetStateMainDisplay = (obj) => {
    console.log(obj);
    this.setState({
      mainDisplay: obj,
      displayList: obj,
    });
  };

  parentSetStateCartItems = (obj) => {
    console.log(obj);
    this.setState({ cartItems: obj });
  };
  parentSetStateSubtotal = (obj) => {
    console.log(obj);
    this.setState({ subtotal: obj });
  };
  displayWishlist = () =>{

    const wishlistItems = this.state.books.filter((book)=>{
            return (book.addedToWishlist)
    })

   this.setState({

     mainDisplay: wishlistItems,
     displayList: wishlistItems,
   });

  }

  render() {
    console.log("inside inventory.js", this.props.showCart);
    // console.log(`cart items`, this.state.cartItems);
    return (
      <section className="inventorySection">
        <FilterSection
          // handleFilter={this.handleFilter}
          allbooks={this.state.books}
          ebooksOnly={this.state.ebooksList}
          audioBooksOnly={this.state.audioBookslist}
          mainDisplay={this.state.mainDisplay}
          displayList={this.state.displayList}
          parentSetStateDisplayList={this.parentSetStateDisplayList}
          parentSetStateMainDisplay={this.parentSetStateMainDisplay}
          displayWishlist={this.displayWishlist}
        />

        <InventoryDisplay
          mainDisplay={this.state.mainDisplay}
          displayList={this.state.displayList}
          addToCart={this.addToCart}
          parentSetStateBooks={this.parentSetStateBooks}
          books={this.state.books}
          displayWishlist={this.displayWishlist}
          parentSetStateDisplayList={this.parentSetStateDisplayList}
        />
        <CartDisplay
          showCart={this.props.showCart}
          CartDisplayState={this.props.CartDisplayState}
          // cartItems={this.state.cartItems}
          // handleRemoveCartItem={this.handleRemoveCartItem}
          // parentSetStateCartItems={this.parentSetStateCartItems}
          // parentSetStateSubtotal={this.parentSetStateSubtotal}
        />

        <WishlistDisplay
          showWishlist={this.props.showWishlist}
          WishlistDisplayState={this.props.WishlistDisplayState}
          // cartItems={this.state.cartItems}
          // handleRemoveCartItem={this.handleRemoveCartItem}
          // parentSetStateCartItems={this.parentSetStateCartItems}
          // parentSetStateSubtotal={this.parentSetStateSubtotal}
        />

        {/* <div className="wishlistDisplay"></div> */}
      </section>
    );
  }
}

export default Inventory;