import React, { Component } from "react";
import { connect } from "react-redux";
import { clearUnchosen, doSearch, addSelection } from "../actions";
import { MovieList } from "./Movie";
import { Search } from "semantic-ui-react";

@connect(state => {
  return {
    search_results: state.search_results,
    selected_movies: state.selected_movies,
    chosen_movies: state.chosen_movies
  };
})
class SearchArea extends Component {
  handleSearch(e, data) {
    console.log("here i am");
    if (e.charCode === 13) {
      const { dispatch } = this.props;
      dispatch(doSearch(e.target.value));
      e.target.value = "";
    }
  }

  handleClear(e) {
    const { dispatch } = this.props;
    dispatch(clearUnchosen(this.props.chosen_movies.chosen));
  }

  handleSelect(e, { result }) {
    const { dispatch } = this.props;
    console.log("Select", result);
    dispatch(addSelection(result));
  }

  render() {
    return (
      <div>
        <label htmlFor="m_search">Search Movie or TV show </label>
        <SearchBox
          searchfunc={this.handleSearch.bind(this)}
          selectfunc={this.handleSelect.bind(this)}
          results={this.props.search_results.movies}
        />

        <MovieList
          clear={this.handleClear.bind(this)}
          movies={this.props.selected_movies.selected}
        />
      </div>
    );
  }
}

const SearchBox = props => {
  // TODO loading, reset on select
  return (
    <Search
      size="large"
      onResultSelect={props.selectfunc}
      onKeyPress={props.searchfunc}
      results={props.results}
      resultRenderer={ResultsRender}
    />
  );
};

const ResultsRender = props => {
  return <span>{props.title}</span>;
};

export { SearchArea };
