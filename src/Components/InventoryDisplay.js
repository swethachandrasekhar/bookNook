import React, { Component } from 'react';

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
            <div className="bookContainer" key={index}>
              <div className="bookCover">
                <img className='bookCoverImage' src={book.bookImage} alt={book.title} />
                <button className='toWishlist'
                  onClick={() => {
                    this.handleWishlist(book, index);
                  }}
                >
                  {book.addedToWishlist === false
                    ? `Add to Wishlist`
                    : `Remove from Wishlist`}
                </button>
              </div>

              <div className="bookDetails">
                <h3>{book.title}</h3>
                <p className='authorName'>{book.authorName}</p>
                <p className='bookPrice'> $ {book.price}</p>
              </div>
              <button className='addToCart'
                onClick={() => {
                  this.addToCart(book, index);
                }}
              >
                Add to cart
              </button>
            </div>
          );
        })}
      </div>
    );
  }
}

export default InventoryDisplay;