const search_url = "/api/search";
const venn_url = "/api/venn";

const recieveSearch = json => ({
	type: "got movie search results",
	movies: json.possibilities,
	receivedAt: Date.now(),
});

export const doSearch = movie_string => {
	return dispatch => {
		return fetch(`${venn_url}?movie=${movie_string}`, { credentials: "same-origin" })
			.then(response => {
				if (response.status >= 400 && response.status < 600) {
					throw new Error("Uhhh... IDK? No  movie");
				}
				return response.json();
			})
			.then(json => {
				dispatch(recieveSearch(json));
			})
			.catch(() => {
				console.log("something went wrong");
			});
	};
};