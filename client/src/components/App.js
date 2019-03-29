import React, { Component } from "react";
import "./App.css";
import { Venn } from "./VennResults";
import { SearchArea } from "./Search";
import { Container, Header } from "semantic-ui-react";
import { MovieList } from "./Movie";

class App extends Component {
  render() {
    return (
      <div id={"app"} className="App">
        <Container id={"container"}>
          <Header as="h1" dividing color="teal">
            IMDB Venn Diagram
          </Header>
          <p>
            Figure out which actors overlap in the movies and TV shows that you
            watch? Think of it like the center of a venn diagram. Search for and
            select two or more movies/tv shows/video games and then calculate
            the overlap; sometimes it can surprise you.
          </p>
          <p>Suggested searches:</p>
          <ul>
            <li>
              {" "}
              <i>Early vs. Late Wes Anderson </i>
              The Royal Tenenbaums & Isle of Dogs (3 actors)
            </li>
            <li>
              <i>From Baltimore to Westeros </i>"The Wire" & "Game of Thrones (1
              actor)
            </li>
            <li>
              <i>A spinoff with doppelgangers </i>
              "Grey's Anatomy" &"Private Practice" (302 actors but not in the
              same roles)
            </li>
          </ul>
          <SearchArea />
          <MovieList />
          <Venn />
        </Container>
      </div>
    );
  }
}

export default App;
