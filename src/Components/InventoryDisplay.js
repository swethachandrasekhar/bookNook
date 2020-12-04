// Display inventory class component

import React, { Component } from "react";
import Book from "./Book.js";
import firebase from "./firebase.js";

class InventoryDisplay extends Component {
  //Function to handle Add to Cart click
  addToCart = (book, index) => {
    //create a reference to the DB
    const dbItemRef = firebase.database().ref(`books/${index}`);
    const dbRefCart = firebase.database().ref("cart");

    //Push item into the cart array in the database
    dbRefCart.push(book);

    // reduce book inventory by 1
    book.inventory = book.inventory - 1;

    //Update the inventory in the database
    dbItemRef.update(book);
  };

  //Function to handle Add / Remove from Wishlist button click
  handleWishlist = (book) => {
    const booksArray = [...this.props.books];
    let indexOfWishlistItem = -1;
    // find the clicked book in the array of books list
    for (let i = 0; i < booksArray.length; i++) {
      if (booksArray[i].title === book.title) indexOfWishlistItem = i;
    }

    // Create a DB ref to the book object
    const dbRef = firebase.database().ref(`books/${indexOfWishlistItem}`);
    let newWishlistObject;
    dbRef.on("value", (data) => {
      //   //Grab data from database
      let wishlistObject = data.val();

      newWishlistObject = { ...wishlistObject };
    });

    // Flip the flag of the book object
    newWishlistObject.addedToWishlist = !newWishlistObject.addedToWishlist;

    // Update the DB book object with the new wishlist object
    dbRef.update(newWishlistObject);
  };

  render() {
    // Use require context to grab the images
    const images = require.context(`./../assets`, true);

    return (
      // <div className="inventoryDisplay" >
        // <div className="inventoryContainer">

          
            this.props.displayList.map((book, index) => {
            const img_src = images(book.bookImage);
            return (
              // Calling book component to display each book
              <Book
                book={book}
                keyID={index}
                imageSrc={img_src.default}
                bookTitle={book.title}
                handleWishlist={this.handleWishlist}
                wishlistFlag={book.addedToWishlist}
                authorName={book.authorName}
                bookPrice={book.price}
                addToCart={this.addToCart}
              />
            );
          })
        // </div>
      // {/* </div> */}
    );
  }
}

export default InventoryDisplay;
