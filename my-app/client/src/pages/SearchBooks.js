import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";
import SearchResult from "../components/SearchResult";

class SearchBooks extends Component {
  //this creates state
  state = {
    search: "",
    books: [],
    error: "",
    message: ""
  };

  //this takes the  value of what's typed into in th search bar
  handleInputChange = event => {
    this.setState({ search: event.target.value });
  };

  //function for the submit button of the search form
  handleForxmSubmit = event => {
    event.preventDefault();
    // this connects to the google book api with the search value
    API.getGoogleSearchBooks(this.state.search)
      .then(res => {
        if (res.data.items === "error") {
          throw new Error(res.data.items);
        } else {
          let results = res.data.items;
          //map through the array
          results = results.map(result => {
            //stores book info in new object
            result = {
              key: result.id,
              id: result.id,
              title: result.volumeInfo.title,
              author: result.volumeInfo.authors,
              description: result.volumeInfo.description,
              image: result.volumeInfo.imageLinks.thumbnail,
              link: result.volumeInfo.infoLink
            };
            return result;
          });
          // resets the state of the empty books array
          this.setState({ books: results, error: "" });
        }
      })
      .catch(err => this.setState({ error: err.items }));
  };

  handleSavedButton = event => {
    // console.log(event)
    event.preventDefault();
    console.log(this.state.books);
    let savedBooks = this.state.books.filter(
      book => book.id === event.target.id
    );
    savedBooks = savedBooks[0];
    API.saveBook(savedBooks)
      .then(this.setState({ message: alert("Your book is saved") }))
      .catch(err => console.log(err));
  };
  render() {
    return (
      <Container>
        <Jumbotron>
          <h1 className='text-white'>
            Find Your Favorite Books with the GoogleBooks API
          </h1>
        </Jumbotron>
        <Container>
          <Row>
            <Col size='12'>
              <SearchForm
                handleFormSubmit={this.handleFormSubmit}
                handleInputChange={this.handleInputChange}
              />
            </Col>
          </Row>
        </Container>
        <br></br>
        <Container>
          <SearchResult
            books={this.state.books}
            handleSavedButton={this.handleSavedButton}
          />
        </Container>
      </Container>
    );
  }
}

export default SearchBooks;
