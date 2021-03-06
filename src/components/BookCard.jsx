//this componenet is the book card shown when searching for books

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class BookCard extends Component {
  //remove book from favorites in redux store
  removeBook = () => {
    let book = this.props.bookInfo;
    book.isFavorite = false;
    this.props.dispatch({ type: 'REMOVE_BOOK', book: book });
  };

  render() {
    const { volumeInfo } = this.props.bookInfo;
    const { title } = this.props.bookInfo.volumeInfo;

    /** format properties from API to show the way they're intended */
    const thumbNail =
      volumeInfo.hasOwnProperty('imageLinks') === false
        ? 'https://vignette.wikia.nocookie.net/pandorahearts/images/a/ad/Not_available.jpg/revision/latest?cb=20141028171337'
        : volumeInfo.imageLinks.thumbnail;
    const publishYear =
      volumeInfo.hasOwnProperty('publishedDate') === false
        ? (volumeInfo['publishedDate'] = '0000')
        : volumeInfo.publishedDate;
    const description =
      volumeInfo.hasOwnProperty('description') === false
        ? 'No description'
        : volumeInfo.description.substring(0, 150) +
          '...'; /** truncate description */
    const authors =
      volumeInfo.hasOwnProperty('authors') === false
        ? 'Not available'
        : volumeInfo.authors[0];
    return (
      <div className="book-card-container">
        <img className="book-card-image" src={thumbNail} alt="" />
        <div className="book-card-description">
          <h2>{title}</h2>
          <h3>Author: {authors}</h3>
          <p>
            Published:
            {publishYear === '0000'
              ? 'Not available'
              : publishYear.substring(0, 4)}
          </p>
          <p>{description}</p>
        </div>
        <div className="book-card-button">
          <Link to={`/book/${this.props.bookInfo.id}`}>
            <button>More info</button>
          </Link>
          {this.props.bookInfo.isFavorite === true && (
            <button onClick={this.removeBook}>Remove from Favorites</button>
          )}
        </div>
      </div>
    );
  }
}

//get state from store
const mapStateToProps = state => {
  return {
    favorites: state.generalReducers.favorites,
  };
};

export default connect(mapStateToProps)(BookCard);
