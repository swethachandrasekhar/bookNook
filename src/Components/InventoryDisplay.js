import React, { Component } from 'react';
import Book from './Book.js'
import firebase from "./firebase.js";


class InventoryDisplay extends Component {
  constructor(props) {
    super(props);
  }
  addToCart = (book, index) => {
    console.log(book);
    const dbItemRef = firebase.database().ref(`books/${index}`);

    const dbRefCart = firebase.database().ref("cart");

    //Push item into the cart array in the database
    dbRefCart.push(book);

    // reduce book inventory by 1
    book.inventory = book.inventory - 1;
    
    //Update the invetory in the database
    dbItemRef.set(book);
  };

  handleWishlist = (book, index) => {
    console.log(book.title);
    //when i click on a book, 
    //i get the index of that title in the main array
    const booksArray = [...this.props.books]
    let indexOfWishlistItem = -1;
    for (let i = 0; i < booksArray.length; i++){
        if (booksArray[i].title === book.title)
        indexOfWishlistItem = i; 

    }
    
    const newDisplayList = this.props.displayList.map((displayedBook) => {
      if(displayedBook.title === book.title) 
      {
        displayedBook.addedToWishlist = !(displayedBook.addedToWishlist);
        
      }
      return displayedBook;
    })
    

    console.log(indexOfWishlistItem)
    const dbRef = firebase.database().ref(`books/${indexOfWishlistItem}`);
    let newWishlistObject;
    dbRef.on("value", (data) => {
      //   //Grab data from database
      let wishlistObject = data.val();
      console.log(wishlistObject);
      newWishlistObject = { ...wishlistObject };
    });
      newWishlistObject.addedToWishlist = !(newWishlistObject.addedToWishlist);
      console.log(newWishlistObject);
     
      dbRef.update(newWishlistObject);
      this.props.parentSetStateDisplayList(newDisplayList);

    

    // this.props.displayWishlist();
    
  };

  render() {
    
    const images = require.context(`./../assets`, true);
    console.log(this.props);
    return (
      <div className='inventoryDisplay'>
        <div className="inventoryContainer">
          {this.props.displayList.map((book, index) => {
            const img_src = images(book.bookImage);
            return (
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
          })}
        </div>
      </div>
    );
  }
}

export default InventoryDisplay;