import React from "react";
import { Route, Switch, Link } from "react-router-dom";
import * as BooksAPI from "./util/BooksAPI";
import "./App.css";

//components
import OpenSearch from "./Components/OpenSearch";
import BookShelf from "./Components/BookShelf";
import Book from "./Components/Book";

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    currentReading: [],
    wantToRead: [],
    read: [],
    query: [],
    searchResults: [],
  };

  componentDidMount() {
    BooksAPI.getAll()
      .then((data) =>
        data.map((book) => {
          if (book.shelf === "currentlyReading") {
            this.setState((curState) => ({
              currentReading: [...curState.currentReading, book],
            }));
          } else if (book.shelf === "wantToRead") {
            this.setState((curState) => ({
              wantToRead: [...curState.wantToRead, book],
            }));
          } else {
            this.setState((curState) => ({
              read: [...curState.read, book],
            }));
          }
          return true;
        })
      )
      .catch((err) => console.log(err));
  }
  moveToShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then((books) => {
      // target shelf is currentlyReading
      if (shelf === "currentlyReading") {
        book.shelf = "currentlyReading";
        // setState for current reading
        this.setState((curState) => ({
          currentReading: [...curState.currentReading, book],
        }));
        // setState for want to read
        this.setState((curState) => ({
          wantToRead: curState.wantToRead.filter((b) => {
            return b.id !== book.id;
          }),
        }));
        // setState for read
        this.setState((curState) => ({
          read: curState.read.filter((b) => {
            return b.id !== book.id;
          }),
        }));
      } else if (shelf === "wantToRead") {
        book.shelf = "wantToRead";
        // setState for current reading
        this.setState((curState) => ({
          currentReading: curState.currentReading.filter((b) => {
            return b.id !== book.id;
          }),
        }));
        // setState for want to read
        this.setState((curState) => ({
          wantToRead: [...curState.wantToRead, book],
        }));
        // setState for read
        this.setState((curState) => ({
          read: curState.read.filter((b) => {
            return b.id !== book.id;
          }),
        }));
      } else {
        book.shelf = "read";
        this.setState((curState) => ({
          currentReading: curState.currentReading.filter((b) => {
            return b.id !== book.id;
          }),
        }));
        this.setState((curState) => ({
          wantToRead: curState.wantToRead.filter((b) => {
            return b.id !== book.id;
          }),
        }));

        this.setState((curState) => ({
          read: [...curState.read, book],
        }));
      }
    });
  };

  searchHandler = (e) => {
    this.setState({ query: e.target.value });
    const query = e.target.value;
    BooksAPI.search(query.trim())
      .then((books) => {
        if (query.trim().length > 0) {
          this.setState({ searchResults: books });
        } else {
          this.setState({ searchResults: [] });
        }
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <div className="app">
        <Switch>
          {/* search route */}
          <Route
            exact
            path="/search"
            render={({ history }) => (
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
                      value={this.state.query}
                      onChange={this.searchHandler}
                    />
                  </div>
                </div>
                <div className="search-books-results">
                  <ol className="books-grid">
                    {this.state.searchResults.map((book) => (
                      <li key={book.id}>
                        <Book
                          book={book}
                          title={book.title}
                          authors={book.authors}
                          img={book.imageLinks.thumbnail}
                          shelf={book.shelf}
                          moveToShelf={this.moveToShelf}
                        />
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            )}
          />
          {/* index route */}
          <Route
            exact
            path="/"
            render={() => (
              <div className="list-books">
                <div className="list-books-title">
                  <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                  <div>
                    {/* currently reading section */}
                    <BookShelf
                      bookData={this.state.currentReading}
                      bookShelfName="Currently Reading"
                      moveToShelf={this.moveToShelf}
                    />
                    {/* want to read section */}
                    <BookShelf
                      bookData={this.state.wantToRead}
                      bookShelfName="Want to Read"
                      moveToShelf={this.moveToShelf}
                    />
                    {/* read section */}
                    <BookShelf
                      bookData={this.state.read}
                      bookShelfName="Read"
                      moveToShelf={this.moveToShelf}
                    />
                  </div>
                </div>
                <OpenSearch />
              </div>
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default BooksApp;
