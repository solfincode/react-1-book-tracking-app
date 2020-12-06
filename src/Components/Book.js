import React, { Component } from "react";

class Book extends Component {
  state = {
    shelf: "",
  };
  componentDidMount() {
    this.setState({ shelf: this.props.shelf });
  }
  //handler
  moveToShelf = () => {
    this.props.moveToHandler(this.state.shelf);
  };
  handleChange = (e) => {
    this.setState({ shelf: e.target.value });
  };

  render() {
    return (
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: "url(" + this.props.img + ")",
            }}
          ></div>
          <div className="book-shelf-changer">
            <form onSubmit={this.moveToShelf}>
              <select
                id="shelf-selection"
                value={this.state.shelf}
                onChange={this.handleChange}
              >
                <option value="move" disabled>
                  Move to...
                </option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </form>
          </div>
        </div>
        <div className="book-title">{this.props.title}</div>
        <div className="book-authors">{this.props.author}</div>
      </div>
    );
  }
}

export default Book;
