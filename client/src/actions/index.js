const base_url = window.location.hostname.includes("localhost")
  ? "http://localhost:5000/api"
  : window.location.href + "api";
const search_url = `${base_url}/search`;
const venn_url = `${base_url}/venn`;
const select_url = `${base_url}/select`;

const recieveSearch = json => ({
  type: "got movie search results",
  movies: json.possibilities,
  receivedAt: Date.now()
});

const startSearch = () => ({
  type: "start searching for movie"
});

const failedSearch = () => ({
  type: "failed searching for movie"
});

export const doSearch = movie_string => {
  return dispatch => {
    dispatch(startSearch);
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
        dispatch(clearSearchResults());
        dispatch(recieveSearch(json));
      })
      .catch(e => {
        dispatch(failedSearch());
        console.log(e);
        console.log("something went wrong");
      });
  };
};

export const clearSearchResults = () => ({
  type: "clear movie search results"
});

export const addSelection = movie => {
  return dispatch => {
    dispatch(prefetchMovie(movie.id));
    dispatch(addMovieToSelected(movie));
  };
};

const addMovieToSelected = movie => ({
  type: "add movie to selection",
  selected: movie
});

const prefetchMovie = movie => {
  return dispatch => {
    console.log(`${select_url}?movie=${movie}`);
    return fetch(`${select_url}?movie=${movie}`, {
      credentials: "same-origin"
    })
      .then(response => {
        return {
          type: "prefetch movie",
          movie: movie
        };
      })
      .catch(e => {
        console.log(e);
        console.log("something went wrong with prefetch");
      });
  };
};

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
    dispatch(startVenn());
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
        dispatch(failedVenn());
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

const startVenn = () => ({
  type: "start venn"
});

const failedVenn = () => ({
  type: "failed venn"
});

export const clearUnchosen = () => ({
  type: "clear all unchosen movies"
});

export const clearAll = () => ({
  type: "clear all selected movies"
});
