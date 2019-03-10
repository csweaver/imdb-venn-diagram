/**
 * Created by weaverc10 on 2/16/19.
 */
import { combineReducers } from "redux";

const search_results = (state = { movies: [] }, action) => {
  if (action.type === "got movie search results") {
    let movies = state.movies;
    movies = movies.concat(action.movies);
    return {
      ...state,
      movies
    };
  } else if (action.type === "clear movie search results") {
    const movies = [];
    return { ...state, movies };
  } else {
    return state;
  }
};

const movies = (state = { selected: [], chosen: [] }, action) => {
  if (action.type === "add movie to selection") {
    let selected = state.selected;
    let chosen = state.chosen;
    selected.push(action.selected);
    chosen.push(action.selected.id);
    return {
      ...state,
      selected,
      chosen
    };
  } else if (action.type === "remove movie from selection") {
    let selected = state.selected;
    selected = selected.filter(val => {
      return val.id !== action.deselected;
    });

    return {
      ...state,
      selected
    };
  } else if (action.type === "add movie to chosen for venn") {
    let chosen = state.chosen;
    chosen.push(action.chosen);
    return {
      ...state,
      chosen
    };
  } else if (action.type === "remove movie from chosen for venn") {
    let chosen = state.chosen;
    chosen = chosen.filter(val => {
      return val !== action.unchosen;
    });
    return {
      ...state,
      chosen
    };
  } else {
    return state;
  }
};

const overlap = (state = { overlap: { movies: [], actors: [] } }, action) => {
  if (action.type === "got venn results") {
    return {
      ...state,
      overlap: action.results
    };
  } else {
    return state;
  }
};

export const rootReducer = combineReducers({
  search_results,
  movies,
  overlap
});
