import React from "react";
//component
import BookShelf from "./BookShelf";
import OpenSearch from "./OpenSearch";

function HomePage(props) {
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          {/* currently reading section */}
          <BookShelf
            bookData={props.currentReading}
            bookShelfName="Currently Reading"
            moveToShelf={props.moveToShelf}
          />
          {/* want to read section */}
          <BookShelf
            bookData={props.wantToRead}
            bookShelfName="Want to Read"
            moveToShelf={props.moveToShelf}
          />
          {/* read section */}
          <BookShelf
            bookData={props.read}
            bookShelfName="Read"
            moveToShelf={props.moveToShelf}
          />
        </div>
      </div>
      <OpenSearch />
    </div>
  );
}

export default HomePage;
