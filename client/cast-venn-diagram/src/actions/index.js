const search_url = "http://localhost:5000/api/search";
const venn_url = "http://localhost:5000/api/venn";

const recieveSearch = json => ({
	type: "got movie search results",
	movies: json.possibilities,
	receivedAt: Date.now(),
});

export const doSearch = movie_string => {
	return dispatch => {
		console.log(`${search_url}?title=${movie_string}`)
		return fetch(`${search_url}?title=${movie_string}`, { credentials: "same-origin" })
			.then(response => {
				if (response.status >= 400 && response.status < 600) {
					throw new Error("Uhhh... IDK? No  movie");
				}
				return response.json();
			})
			.then(json => {
				dispatch(recieveSearch(json));
			})
			.catch((e) => {
				console.log(e)
				console.log("something went wrong");
			});
	};
};

export const addSelection = movie_id => ({
	type:"add movie to selection",
	selected: movie_id
})

export const deleteSelection = movie_id => ({
	type:"remove movie from selection",
	deselected: movie_id
})

export const doVenn = movie_list => {
	return dispatch => {
		let movie_params = movie_list.map(movie => `movies=${movie}`)
		movie_params = movie_params.join("&")
		return fetch(`${venn_url}?${movie_params}`, { credentials: "same-origin" })
			.then(response => {
				if (response.status >= 400 && response.status < 600) {
					throw new Error("Uhhh... IDK? No  movie");
				}
				return response.json();
			})
			.then(json => {
				dispatch(recieveVenn(json));
			})
			.catch((e) => {
				console.log(e)
				console.log("something went wrong");
			});
	};
};

const recieveVenn = json => ({
	type: "got venn results",
	results: json,
	receivedAt: Date.now(),
});

export const clearUnselected = movie_list => ({
	type: "clear unselected",
	currently_selected: movie_list,
})