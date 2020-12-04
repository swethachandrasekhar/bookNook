// Books Functional Component : Displays each book in the inventory

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
    </div>
  );
};

export default Book;
