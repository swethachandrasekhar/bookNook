import React, { Component } from 'react';
import Book from './Book.js'
import firebase from "./firebase.js";


class InventoryDisplay extends Component {
  addToCart = (book, index) => {
    console.log(book);
    const dbItemRef = firebase.database().ref(`books/${index}`);

    const dbRefCart = firebase.database().ref("cart");

    //Push item into the cart array in the database
    dbRefCart.push(book);

    // reduce book inventory by 1
    book.inventory = book.inventory - 1;
    // newdbref.on('value', (data) => {
    //   console.log(data.val());
    // })
    //Update the invetory in the database
    dbItemRef.set(book);
  };

  handleWishlist = (book, index) => {
    console.log(book.title);

    const dbRef = firebase.database().ref("books");

    const indexOfWishlistItem = this.props.books.indexOf(
      this.props.displayList[index].title
    );
    let indexOfUpdatedWishlistItem = "";
    let wishlistStateUpdated = this.props.books.map((item, index) => {
      console.log(item.title);
      if (item.title === book.title) {
        item.addedToWishlist = !item.addedToWishlist;
        indexOfUpdatedWishlistItem = index;
      }
      return item;
    });
    const updatedWishlistFlag = {
      addedToWishlist: this.props.books[index].addedToWishlist,
    };
    dbRef.child(indexOfUpdatedWishlistItem).update(updatedWishlistFlag);

    this.props.parentSetStateBooks(wishlistStateUpdated);

  };

  render() {
    console.log(this.props);
    return (
      <div className="inventoryDisplay">
        {this.props.displayList.map((book, index) => {
          return (
            <Book
              book={book}
              keyID={index}
              imageSrc={book.bookImage}
              bookTitle={book.title}
              handleWishlist={this.handleWishlist}
              
              wishlistFlag={book.addedToWishlist}
              authorName={book.authorName}
              bookPrice={book.price}
              addToCart={this.addToCart}
              
            />

            
          );
        })}
      </div>
    );
  }
}

export default InventoryDisplay;