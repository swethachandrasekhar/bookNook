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
          <img className="bookCoverImage" src={imageSrc} alt={bookTitle} />
          <button
            className="toWishlist"
            onClick={() => {
              handleWishlist(book, keyID);
            }}
          >
            {wishlistFlag === false
              ? `Add to Wishlist`
              : `Remove from Wishlist`}
          </button>
        </div>

        <div className="bookDetails">
          <h3>{bookTitle}</h3>
          <p className="authorName">{authorName}</p>
          <p className="bookPrice"> $ {bookPrice}</p>
        </div>
        <button
          className="addToCart"
          onClick={() => {
            addToCart(book, keyID);
          }}
        >
          Add to cart
        </button>
      </div>
    );
}

export default Book;