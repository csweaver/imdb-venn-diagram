/**
 * Created by weaverc10 on 2/16/19.
 */
import { combineReducers } from "redux";

const basic = (state = {}, action) => {
	if (action.type === "basic type") {
		return {
			...state,
		};
	} else {
		return state;
	}
}

const search_results = (state = {movies:[]}, action) => {
	if (action.type === "got movie search results") {
		return {
			movies: action.movies,
			...state,
		};
	} else {
		return state;
	}
}

default export const rootReducer = combineReducers({
	basic,
	search_results,
});