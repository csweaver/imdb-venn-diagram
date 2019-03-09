import React, { Component } from "react";
import { connect } from "react-redux";
import { clearUnselected, doSearch } from "../actions";
import { MovieList } from "./Movie";

@connect(state => {
  return {
    search_results: state.search_results,
    selected_movies: state.selected_movies
  };
})
export class SearchArea extends Component {
  handleSearch(e, data) {
    // TODO actually search for movie
    if (e.charCode === 13) {
      const { dispatch } = this.props;
      dispatch(doSearch(e.target.value));
      e.target.value = "";
    }
  }

  handleClear(e) {
    const { dispatch } = this.props;
    dispatch(clearUnselected(this.props.selected_movies.selected));
  }

  render() {
    return (
      <div>
        <label htmlFor="m_search">Search Movie or TV show </label>
        <SearchBox
          onfocus={this.handleSearch.bind(this)}
          onkeypress={this.handleSearch.bind(this)}
        />

        <MovieList
          clear={this.handleClear.bind(this)}
          movies={this.props.search_results.movies}
        />
      </div>
    );
  }
}

const SearchBox = props => {
  return <input id="m_search" onKeyPress={props.onkeypress} type="text" />;
};
