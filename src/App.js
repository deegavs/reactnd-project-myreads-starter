import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'

import MyBookShelf from './NewComponents/MyBookShelf'
import SearchBook from './NewComponents/SearchBook'

import './App.css'

class BooksApp extends React.Component {
  state = {
    books: []  
  }
  // initiate request to fetch all books from the BooksAPI library
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({books: books})
    })
  }
  // update books to be moved from each shelf
  moveBook = (book, shelf) => {
    BooksAPI.update(book, shelf)

    BooksAPI.getAll().then((books) => {
      this.setState({books: books})
    })
  }

  render() {
    return (
      <div className="app">
        {/*Route uses the router-dom to direct paths*/}
        <Route exact path='/' render={() => (
          <MyBookShelf books={this.state.books} 
          moveBook={this.moveBook}
        /> 
        )} />

        <Route path='/search' render={() => (
          <SearchBook 
          moveBook={this.moveBook}
          books={this.state.books}
         /> 
        )} />     
              
      </div>
    )
  }
}

export default BooksApp

