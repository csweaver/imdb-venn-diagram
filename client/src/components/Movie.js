import React, { Component } from "react";
import { connect } from "react-redux";
import {
  addChosenForVenn,
  clearUnchosen,
  clearAll,
  removeChosenForVenn
} from "../actions";
import { Header, Button, List } from "semantic-ui-react";

@connect(state => {
  return { movies: state.movies };
})
class MovieList extends Component {
  handleClearUnselected = e => {
    const { dispatch } = this.props;
    dispatch(clearUnchosen());
  };
  handleClearAll = e => {
    const { dispatch } = this.props;
    dispatch(clearAll());
  };

  render() {
    let movies = this.props.movies.selected.map(p => {
      const selected = this.props.movies.chosen.includes(p.id);
      return (
        <Movie
          mid={p.id}
          key={`${p.title}_movie`}
          title={p.title}
          selected={selected}
        />
      );
    });
    if (!movies.length) movies = "please search for a movie";
    return (
      <div className="section">
        <Header color="teal" as="h2">
          Movies{" "}
          <Button className="section-button" onClick={this.handleClearAll}>
            Clear All
          </Button>
          <Button
            className="section-button"
            onClick={this.handleClearUnselected}
          >
            Clear Unselected
          </Button>
        </Header>
        <List divided inverted relaxed>
          {movies}
        </List>
      </div>
    );
  }
}

@connect(state => {
  return {};
})
class Movie extends Component {
  handleCheck(e) {
    const checkbox = e.target;
    const { dispatch } = this.props;
    if (checkbox.checked) {
      dispatch(addChosenForVenn(this.props.mid));
    } else {
      dispatch(removeChosenForVenn(this.props.mid));
    }
  }

  render() {
    return (
      <List.Item>
        <input
          onClick={this.handleCheck.bind(this)}
          defaultChecked={this.props.selected}
          type="checkbox"
        />
        {this.props.title}
      </List.Item>
    );
  }
}

export { MovieList };
