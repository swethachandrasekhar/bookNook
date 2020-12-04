const Book = (props) => {
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
    } = props;
    return (
      <div className="bookContainer" key={keyID}>
        <div className="bookCover">
          <img className="bookCoverImage"  src={imageSrc} alt={bookTitle} />
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
            {book.inventory <= 5 && book.inventory >= 1 ? (
              <span className="inventoryLeft">
                {book.inventory} available
              </span>
            ) : null}
          </p>
        </div>
        {
          // console.log( `inventory`, book.inventory)
          book.inventory <= 0 
          ? (
            <p className='outOfStock'>Out of stock </p>
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
      </div>
    );
}

export default Book;