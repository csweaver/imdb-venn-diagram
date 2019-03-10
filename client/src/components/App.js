import React, { Component } from "react";
import "./App.css";
import { Venn } from "./VennResults";
import { SearchArea } from "./Search";
import { Container, Header } from "semantic-ui-react";
import { MovieList } from "./Movie";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Container>
          <Header as="h1" dividing color="teal">
            IMDB Venn Diagram
          </Header>
          <p>
            Think of it like a venn diagram. Pick at least two movies and then
            figure out which actors were in all of them
          </p>
          <SearchArea />
          <MovieList />
          <Venn />
        </Container>
      </div>
    );
  }
}

export default App;
