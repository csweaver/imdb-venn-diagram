import React, { Component } from "react";
import { connect } from "react-redux";
import { addSelection, deleteSelection } from "../actions";

export const MovieList = props => {
  let movies = props.movies.map(p => {
    return <Movie mid={p.id} key={p.title} title={p.title} />;
  });
  return (
    <div>
      <h2>
        Movies <button onClick={props.clear}>Clear</button>
      </h2>
      {movies}
    </div>
  );
};

@connect(state => {
  return {};
})
class Movie extends Component {
  handleCheck(e) {
    const checkbox = e.target;
    const { dispatch } = this.props;
    if (checkbox.checked) {
      dispatch(addSelection(this.props.mid));
    } else {
      dispatch(deleteSelection(this.props.mid));
    }
  }

  render() {
    return (
      <div>
        <input onClick={this.handleCheck.bind(this)} type="checkbox" />
        <span>{this.props.title}</span>
      </div>
    );
  }
}
