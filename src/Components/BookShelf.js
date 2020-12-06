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
                  title={book.title}
                  author={book.authors[0]}
                  img={book.imageLinks.thumbnail}
                  shelf={book.shelf}
                  moveToHandler={this.moveToHandler}
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
