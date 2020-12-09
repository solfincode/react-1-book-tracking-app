import React, { Component } from "react";
import Book from "./Book";

class BookShelf extends Component {
  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.bookShelfName}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {this.props.bookData.map((book) => (
              <li key={book.id}>
                <Book
                  book={book}
                  title={book.title}
                  authors={book.authors}
                  img={book.imageLinks.thumbnail}
                  shelf={book.shelf}
                  moveToShelf={this.props.moveToShelf}
                />
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}
export default BookShelf;
