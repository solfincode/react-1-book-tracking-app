import React from "react";
import { Route, Switch } from "react-router-dom";
import * as BooksAPI from "./util/BooksAPI";
import "./App.css";

//components
import SearchPage from "./Components/SearchPage";
import HomePage from "./Components/HomePage";

class BooksApp extends React.Component {
  state = {
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
          wantToRead: curState.wantToRead.filter((b) => b.id !== book.id),
        }));
        // setState for read
        this.setState((curState) => ({
          read: curState.read.filter((b) => b.id !== book.id),
        }));
      } else if (shelf === "wantToRead") {
        book.shelf = "wantToRead";
        // setState for current reading
        this.setState((curState) => ({
          currentReading: curState.currentReading.filter(
            (b) => b.id !== book.id
          ),
        }));
        // setState for want to read
        this.setState((curState) => ({
          wantToRead: [...curState.wantToRead, book],
        }));
        // setState for read
        this.setState((curState) => ({
          read: curState.read.filter((b) => b.id !== book.id),
        }));
      } else if (shelf === "read") {
        book.shelf = "read";
        this.setState((curState) => ({
          currentReading: curState.currentReading.filter(
            (b) => b.id !== book.id
          ),
        }));
        this.setState((curState) => ({
          wantToRead: curState.wantToRead.filter((b) => b.id !== book.id),
        }));

        this.setState((curState) => ({
          read: [...curState.read, book],
        }));
      } else {
        book.shelf = "none";
        this.setState((curState) => ({
          currentReading: curState.currentReading.filter(
            (b) => b.id !== book.id
          ),
        }));
        this.setState((curState) => ({
          wantToRead: curState.wantToRead.filter((b) => b.id !== book.id),
        }));

        this.setState((curState) => ({
          read: curState.read.filter((b) => b.id !== book.id),
        }));
      }
    });
  };

  searchHandler = (e) => {
    this.setState({ query: e.target.value });
    const query = e.target.value;
    if (query.trim().length > 0) {
      BooksAPI.search(query.trim())
        .then((books) => {
          books.map((el) => {
            el.shelf = "none";
            this.state.currentReading.map((shelfBook) =>
              el.id === shelfBook.id ? (el.shelf = "currentlyReading") : ""
            );
            this.state.wantToRead.map((shelfBook) =>
              el.id === shelfBook.id ? (el.shelf = "wantToRead") : ""
            );
            this.state.read.map((shelfBook) =>
              el.id === shelfBook.id ? (el.shelf = "read") : ""
            );
            return true;
          });
          this.setState({ searchResults: books });
        })
        .catch((err) => console.log(err));
    } else {
      this.setState({ searchResults: [] });
    }
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
              <SearchPage
                searchHandler={this.searchHandler}
                query={this.state.query}
                searchResults={this.state.searchResults}
                moveToShelf={this.moveToShelf}
              />
            )}
          />
          {/* index route */}
          <Route
            exact
            path="/"
            render={() => (
              <HomePage
                currentReading={this.state.currentReading}
                wantToRead={this.state.wantToRead}
                read={this.state.read}
                moveToShelf={this.moveToShelf}
              />
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default BooksApp;
