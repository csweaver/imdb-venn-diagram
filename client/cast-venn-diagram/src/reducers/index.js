/**
 * Created by weaverc10 on 2/16/19.
 */
import {combineReducers} from "redux";

const basic = (state = {}, action) => {
	if (action.type === "basic type") {
		return {
			...state,
		};
	} else {
		return state;
	}
}

const search_results = (state = {movies: []}, action) => {
	if (action.type === "got movie search results") {
		let movies = state.movies
		movies = movies.concat(action.movies)
		return {
			...state,
			movies
		};
	}
	else if (action.type === "clear unselected") {
		const movies = state.movies.filter(movie => {
			console.log(movie.id, action.currently_selected.includes(movie.id))
			    return action.currently_selected.includes(movie.id)
		})
		return {
			...state,
			movies: movies,
		};
	}
	else {
		return state;
	}
}

const selected_movies = (state = {selected: []}, action) => {
	if (action.type === "add movie to selection") {
		let selected = state.selected
		selected.push(action.selected)
		return {
			...state,
			selected,
		};
	}
	else if (action.type === "remove movie from selection") {
		let selected = state.selected
		selected = selected.filter((val) => {
			return 	val !== action.deselected
		})
		return {
			...state,
			selected,
		};
	} else {
		return state;
	}

}

const overlap = (state = {overlap: {movies: [], actors: []}}, action) => {
	if (action.type === "got venn results") {
		return {
			...state,
			overlap: action.results,
		};
	} else {
		return state;
	}
}


export const rootReducer = combineReducers({
	basic,
	search_results,
	selected_movies,
	overlap,
});