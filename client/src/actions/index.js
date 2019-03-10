const search_url = "http://localhost:5000/api/search";
const venn_url = "http://localhost:5000/api/venn";

const recieveSearch = json => ({
  type: "got movie search results",
  movies: json.possibilities,
  receivedAt: Date.now()
});

export const doSearch = movie_string => {
  return dispatch => {
    console.log(`${search_url}?title=${movie_string}`);
    return fetch(`${search_url}?title=${movie_string}`, {
      credentials: "same-origin"
    })
      .then(response => {
        if (response.status >= 400 && response.status < 600) {
          throw new Error("Uhhh... IDK? No  movie");
        }
        return response.json();
      })
      .then(json => {
        dispatch(recieveSearch(json));
      })
      .catch(e => {
        console.log(e);
        console.log("something went wrong");
      });
  };
};

export const clearSearchResults = () => ({
  type: "clear movie search results"
});

export const addSelection = movie => ({
  type: "add movie to selection",
  selected: movie
});

export const addChosenForVenn = movie_id => ({
  type: "add movie to chosen for venn",
  chosen: movie_id
});

export const removeChosenForVenn = movie_id => ({
  type: "remove movie from chosen for venn",
  unchosen: movie_id
});

export const doVenn = movie_list => {
  return dispatch => {
    let movie_params = movie_list.map(movie => `movies=${movie}`);
    movie_params = movie_params.join("&");
    console.log(`${venn_url}?${movie_params}`);
    return fetch(`${venn_url}?${movie_params}`, { credentials: "same-origin" })
      .then(response => {
        if (response.status >= 400 && response.status < 600) {
          throw new Error("Uhhh... IDK? No  movie");
        }
        return response.json();
      })
      .then(json => {
        console.log(json);
        dispatch(recieveVenn(json));
      })
      .catch(e => {
        console.log(e);
        console.log("something went wrong");
      });
  };
};

const recieveVenn = json => ({
  type: "got venn results",
  results: json,
  receivedAt: Date.now()
});

export const clearUnchosen = () => ({
  type: "clear all unchosen movies"
});

export const clearAll = () => ({
  type: "clear all selected movies"
});
