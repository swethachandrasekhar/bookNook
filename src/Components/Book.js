// Books Functional Component : Displays each book in the inventory
import hearts from '../assets/heart_vector.png';
import redheart from '../assets/red_heart.png';
import { Component } from 'react';

class Book extends Component {

  constructor(){
    super();
    this.state = {
      wishlistState: hearts,

    }
  }

  wishlistOnHover = () => { 
    if (this.state.wishlistState === hearts)
    this.setState({
      wishlistState: redheart,
    })
    else {
      this.setState({
      wishlistState: hearts,
    })
    }
  }

render() {
  
    const {
      book,
      keyID,
      imageSrc,
      bookTitle,
      handleWishlist,
      wishlistFlag,
      authorName,
      bookPrice,
      addToCart,
    } = this.props;
  
  return (
    <div className="bookContainer" key={keyID}>
      <div className="bookCover">
        <img className="bookCoverImage" src={imageSrc} alt={bookTitle} />
        <button
          className="toWishlist"
          // srOnly='true'
          onClick={() => {
            handleWishlist(book, keyID);
          }}
        >
          {wishlistFlag === false
            ? `Add to Wishlist ♥️`
            : `Remove from Wishlist`}
        </button>
      </div>

      <div className="bookDetails">
        <h3>{bookTitle}</h3>
        <p className="authorName">{authorName}</p>
        <p className="bookPrice">
          $ {bookPrice}
          {/* If inventory is less than <=5 and more than 1 then display number of books available  */}
          {book.inventory <= 5 && book.inventory >= 1 ? (
            <span className="inventoryLeft">{book.inventory} available</span>
          ) : null}
        </p>
      </div>
      <div className="addTo">
        {
          // If inventory is 0 then display out of stock
          book.inventory <= 0 ? (
            <p className="outOfStock">Out of stock </p>
          ) : (
            <button
              className="addToCart"
              onClick={() => {
                addToCart(book, keyID);
              }}
            >
              Add to Cart
            </button>
          )
        }
        <button
          className="quickWishlist"
          onClick={() => handleWishlist(book, keyID)}
          onMouseEnter={() => this.wishlistOnHover()}
          onMouseLeave={() => this.wishlistOnHover()}
        >
          {wishlistFlag === false ? (
            <img
              src={this.state.wishlistState}
              alt="wishlist button"
              className="heartShapeEmptyWishlistIcon"
            />
          ) : (
            <img
              src={redheart}
              alt="wishlist button"
              className="heartShapeRedWishlistIcon"
            />
          )}
        </button>
      </div>
    </div>
  );
}

}


export default Book;
