import React, { Component } from "react";

class Book extends Component {
  //handler
  handleChange = (e) => {
    const shelf = e.target.value;
    const book = this.props.book;
    this.props.moveToShelf(book, shelf);
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
            <select
              id="shelf-selection"
              value={this.props.shelf}
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
          </div>
        </div>
        <div className="book-title">{this.props.title}</div>
        <div className="book-authors">
          {this.props.authors && this.props.authors.join(",")}
        </div>
      </div>
    );
  }
}

export default Book;
