import { useCart } from '../context/CartContext';
import './BookList.css';

function BookList({ books, onBookClick }) {
  const { addToCart } = useCart();
  if (books.length === 0) {
    return (
      <div className="no-books" aria-label="No books available">
        <p aria-label="No books message">No books found</p>
        <p className="hint" aria-label="Search hint">Try adjusting your search filters</p>
      </div>
    );
  }

  return (
    <div className="book-list" role="region" aria-label="List of available books">
      {books.map((book) => (
        <div 
          key={book.id} 
          className="book-card"
          onClick={() => onBookClick(book)}
          data-testid={`book-card-${book.id}`}
          role="button"
          tabIndex={0}
          aria-label={`${book.title} by ${book.author}, $${book.price.toFixed(2)}`}
          onKeyPress={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              onBookClick(book);
            }
          }}
        >
          <div className="book-card-image" aria-label="Book cover image">
            {book.coverImage ? (
              <img src={book.coverImage} alt={`Cover of ${book.title}`} aria-label={`${book.title} cover image`} />
            ) : (
              <div className="book-placeholder" aria-label="No cover image available">📖</div>
            )}
          </div>
          
          <div className="book-card-content" aria-label="Book information">
            <h3 className="book-title" aria-label="Book title">{book.title}</h3>
            <p className="book-author" aria-label="Book author">by {book.author}</p>
            
            <div className="book-meta" aria-label="Book metadata">
              <span className="book-category" aria-label="Book category">{book.category}</span>
              {book.publicationYear && (
                <span className="book-year" aria-label="Publication year">{book.publicationYear}</span>
              )}
            </div>
            
            <div className="book-footer" aria-label="Book pricing and availability">
              <span className="book-price" aria-label="Book price">${book.price.toFixed(2)}</span>
              <span className={`book-stock ${book.stock > 0 ? 'in-stock' : 'out-of-stock'}`} aria-live="polite" aria-label="Stock availability">
                {book.stock > 0 ? `${book.stock} in stock` : 'Out of stock'}
              </span>
            </div>
            
            <button
              className={`add-to-cart-btn ${book.stock > 0 ? '' : 'disabled'}`}
              onClick={(e) => {
                e.stopPropagation();
                if (book.stock > 0) {
                  addToCart(book, 1);
                  alert(`Added "${book.title}" to cart!`);
                }
              }}
              disabled={book.stock <= 0}
              data-testid={`add-to-cart-${book.id}`}
              aria-label={`Add ${book.title} to shopping cart${book.stock <= 0 ? ' (out of stock)' : ''}`}
            >
              🛒 Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default BookList;
