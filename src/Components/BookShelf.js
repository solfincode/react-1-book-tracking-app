import React from "react";
import Book from "./Book";

const BookShelf = (props) => {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{props.bookShelfName}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {props.bookData.map((book) => (
            <li key={book.id}>
              <Book
                book={book}
                title={book.title}
                authors={book.authors}
                img={book.imageLinks.thumbnail}
                shelf={book.shelf}
                moveToShelf={props.moveToShelf}
              />
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};
export default BookShelf;
