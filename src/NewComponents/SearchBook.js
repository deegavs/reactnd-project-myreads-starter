import React from "react"
import { Link } from 'react-router-dom'
import * as BooksAPI from '../BooksAPI'
import PropTypes from 'prop-types'
import Book from "./Book"

class SearchBook extends React.Component {
  constructor (props) {
  super (props)
    this.state = {
      query: "",
      books: [],
      searchedBooks: []
    } 
  }
  updateQuery = query => {
    this.setState({ query: query });
    //this.updatesearchForBooks(query)
    if(query) {
      BooksAPI.search(query).then((searchedBooks) => {
        if (searchedBooks.length) {
          this.setState({searchedBooks})
        } else {
          this.setState({ searchedBooks: [] })
        }
      })
    } else {
      this.setState({ searchedBooks: [] })
    }
  }

  clearQuery = () => {
    this.setState({query: ''})
  }

  render() {
    const { query, searchedBooks} = this.state
    const {books} = this.props
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link
            to='/'
            className="close-search"
            >Close
            </Link>

          <div className="search-books-input-wrapper">
            
            <input type="text" placeholder="Search by title or author" 
            value={query}
            onChange={(event) => this.updateQuery(event.target.value, searchedBooks)} />
            
          </div>
        </div>
        {searchedBooks.length !== 0 && query.length !== 0 && (
              <div className="search-books-results">
              <ol className="books-grid" >
              {/**map through searchForBook array */}
              {searchedBooks.map(searchedBooks => {
                /**a new constant is declared to be assigned on the books in the 
                  * search list that doesn't exist main book shelf 
                  */
                let bookInSearchShelf = 'none'
                  books.map(book => (
                    book.id === searchedBooks.id ? 
                    bookInSearchShelf = book.shelf : 'none'
                  ))

                return(
                  <li key={searchedBooks.id}>
                  <Book 
                    book={searchedBooks}
                    moveBook={this.props.moveBook}
                    currentBookShelf={bookInSearchShelf}
                  />
                  </li> 
                ) 
                })            
              }
              </ol>
            </div>
            )}
            {searchedBooks.length === 0 && query.length !== 0 && (
              <div className="no-data">
                <h3>Sorry! no book found</h3>
              </div>

            )}

          </div>

    );
  }
}

SearchBook.propTypes = {
  books: PropTypes.array.isRequired,
  query: PropTypes.string.isRequired
}

export default SearchBook
