import React from "react";
import { Link } from "react-router-dom";
//component
import Book from "./Book";

function SearchPage(props) {
  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link to="/">
          <button className="close-search">Close</button>
        </Link>
        <div className="search-books-input-wrapper">
          {/*
        NOTES: The search from BooksAPI is limited to a particular set of search terms.
        You can find these search terms here:
        https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
        However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
        you don't find a specific author or title. Every search is limited by search terms.
      */}
          <input
            type="text"
            placeholder="Search by title or author"
            value={props.query}
            onChange={props.searchHandler}
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {props.searchResults.map((book) =>
            book.imageLinks !== undefined ? (
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
            ) : (
              <li key={book.id}>no result</li>
            )
          )}
        </ol>
      </div>
    </div>
  );
}

export default SearchPage;
