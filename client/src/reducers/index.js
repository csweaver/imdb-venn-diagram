/**
 * Created by weaverc10 on 2/16/19.
 */
import { combineReducers } from "redux";

const basic = (state = {}, action) => {
  if (action.type === "basic type") {
    return {
      ...state
    };
  } else {
    return state;
  }
};

const search_results = (state = { movies: [] }, action) => {
  if (action.type === "got movie search results") {
    let movies = state.movies;
    movies = movies.concat(action.movies);
    return {
      ...state,
      movies
    };
  } else {
    return state;
  }
};

const selected_movies = (state = { selected: [] }, action) => {
  if (action.type === "add movie to selection") {
    let selected = state.selected;
    selected.push(action.selected);
    return {
      ...state,
      selected
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
  } else {
    return state;
  }
};

const chosen_movies = (state = { chosen: [] }, action) => {
  if (action.type === "add movie to chosen for venn") {
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
  } else if (action.type === "clear unchosen") {
    let chosen = [];
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
  basic,
  search_results,
  selected_movies,
  chosen_movies,
  overlap
});
