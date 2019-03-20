import React, { Component } from "react";
import { connect } from "react-redux";
import {
  addChosenForVenn,
  clearUnchosen,
  clearAll,
  removeChosenForVenn
} from "../actions";
import { Header, Button, List, Checkbox } from "semantic-ui-react";

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
          kind={p.kind}
          selected={selected}
        />
      );
    });
    if (!movies.length) movies = "please search for a movie";
    return (
      <div className="section">
        <Header color="teal" as="h2">
          Movies{" "}
          <Button
            basic
            className="section-button"
            onClick={this.handleClearAll}
          >
            Remove All
          </Button>
          <Button
            basic
            className="section-button"
            onClick={this.handleClearUnselected}
          >
            Remove Unselected
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
  state = { checked: false };

  handleCheck(e) {
    const { dispatch } = this.props;
    this.setState({ checked: !this.state.checked });
    if (this.state.checked) {
      dispatch(addChosenForVenn(this.props.mid));
    } else {
      dispatch(removeChosenForVenn(this.props.mid));
    }
  }

  render() {
    const label = `${this.props.title} - ${this.props.kind}`;
    return (
      <List.Item>
        <Checkbox
          onClick={this.handleCheck.bind(this)}
          label={label}
          defaultChecked={this.props.selected}
        />
      </List.Item>
    );
  }
}

export { MovieList };
