import React, { Component } from "react"
import { Link } from 'react-router-dom'
import * as BooksAPI from '../BooksAPI'
import Book from "./Book"

class SearchBook extends Component {
  state = {
    query: "",
    searchForBooks: []
  };

  updateQuery = query => {
    this.setState({ query: query });
    this.updatesearchForBooks(query)
  };
  // fetch the books from the BooksAPI and update the searchForBooks array
  updatesearchForBooks = (query) => {  
    if(query) {
      BooksAPI.search(query).then((searchForBooks) => {
        if (searchForBooks.error) {
          this.setState({searchForBookst: [] })
        } else {
          this.setState({ searchForBooks: searchForBooks })
        }
      })
    } else {
      this.setState({ searchForBooks: [] })
    }
  }

  render() {
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
            value={this.state.query}
            onChange={(event) => this.updateQuery(event.target.value)} />
            
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid" >
          {/**map through searchForBook array */}
          {this.state.searchForBooks.map(searchForBooks => {
            /**a new constant is declared to be assigned on the books in the 
              * search list that doesn't exist main book shelf 
              */
            let bookInSearchShelf = 'none'
            this.props.books.map(book => (
                book.id === searchForBooks.id ? 
                bookInSearchShelf = book.shelf : ''
              ))

            return(
              <li key={searchForBooks.id}>
              <Book 
                book={searchForBooks}
                moveBook={this.props.moveBook}
                currentBookShelf={bookInSearchShelf}
              />
              </li> 
            ) 
            })            
          }
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchBook
