import React from "react"
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Book from "./Book"

//function MyBookShelf(props) {
  
const MyBookShelf = ({ books, moveBook}) => {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
          <div className="bookshelf">
              <h2 className="bookshelf-title">Want to Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid"> 

                {/*
                  * filter the index in the books array to match existing books 
                  * on the shelves and if true it keeps and filter out if it's not. 
                  * It then maps out the matches and return them.
                */}            
                {books.filter(book => book.shelf === 'wantToRead').map(book => (
                    <li key={book.id}>
                        <Book 
                            book={book}
                            moveBook={moveBook}
                            currentBookShelf='wantToRead'
                        />
                    </li>
                  ))                         
                }                                                    
                </ol>
              </div>
            </div>
            <div className="bookshelf">
            <h2 className="bookshelf-title">Currently Reading</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">            
                {books.filter(book => book.shelf === 'currentlyReading').map(book => (
                    <li key={book.id}>
                        <Book 
                            book={book}
                            moveBook={moveBook}
                            currentBookShelf='currentlyReading'
                        />
                    </li>
                  ))                         
                } 
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                {books.filter(book => book.shelf === 'read').map(book => (
                    <li key={book.id}>
                        <Book 
                            book={book}
                            moveBook={moveBook}
                            currentBookShelf='read'
                        />
                    </li>
                  ))                         
                } 
                </ol>
              </div>
            </div>
          </div>
        </div>
        <div className="open-search">
          <Link
            to='/search'          
          >Add a book
          </Link>
        </div>
      </div>
    );
  
}

MyBookShelf.propTypes = {
	books: PropTypes.array.isRequired,
	moveBook: PropTypes.func.isRequired,
}

export default MyBookShelf
