import React, { Component } from "react";
import "./App.css";
import { Venn } from "./TableResult";
import { SearchArea } from "./Search";

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>IMDB Venn Diagram</h1>
        <p>Which actors are in other movies?</p>
        <SearchArea />
        <Venn />
      </div>
    );
  }
}

export default App;
