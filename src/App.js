import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'

import MyBookShelf from './NewComponents/MyBookShelf'
import SearchBook from './NewComponents/SearchBook'

import './App.css'

class BooksApp extends React.Component {
  state = {
    query: '',
    books: []  
  }
  // initiate request to fetch all books from the BooksAPI library
  componentDidMount() {
    this.updateBooks()
  }

  updateBooks = () => {
    BooksAPI.getAll().then((books) => {
      this.setState({books: books})
    })
  }

  // update books to be moved from each shelf
  moveBook = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      this.updateBooks()
    })
  }

  render() {
    const {books, query, searchedBooks} = this.state
    return (
      <div className="app">
        {/*Route uses the router-dom to direct paths*/}
        <Route exact path='/' render={() => (
          <MyBookShelf 
            books={books} 
            moveBook={this.moveBook}
        /> 
        )} />

        <Route path='/search' render={() => (
          <SearchBook 
            moveBook={this.moveBook}
            books={this.state.books}
            searchedBooks={searchedBooks}
            query={query}
         /> 
        )} />     
              
      </div>
    )
  }
}

export default BooksApp

