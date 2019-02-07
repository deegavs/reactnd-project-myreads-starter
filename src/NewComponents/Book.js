import React from "react"
import PropTypes from 'prop-types'

const Book = ({moveBook, currentBookShelf, book}) => {

    let booksThumbnail = book.imageLinks ? 
      book.imageLinks.thumbnail: ''
    return (
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url("${booksThumbnail}")` 
              }}>
        </div>
        <div className="book-shelf-changer">
            <select 
              value={currentBookShelf}
              onChange={(event) => moveBook(
                book, event.target.value
              )}
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
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{book.authors}</div>
      </div>
    );
  
}

Book.propTypes = {
	book: PropTypes.object.isRequired,
	moveBook: PropTypes.func.isRequired,
	currentBookShelf: PropTypes.string.isRequired
};

export default Book
