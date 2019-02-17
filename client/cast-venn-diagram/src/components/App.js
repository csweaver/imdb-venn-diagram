import React, {Component} from 'react';
import './App.css';
import {doSearch} from "./actions"

class App extends Component {
	render() {
		return (
			<div className="App">
				<h1>IMDB Venn Diagram</h1>
				<p>
					Which actors are in other movies?
				</p>
				<SearchArea />
				<Venn />
			</div>
		);
	}
}
@connect(state => {
	return {
		search_results: state.search_results,
	}
})

class SearchArea extends Component {
	
	handleSearch(e, data) {
		// TODO actually search for movie
		if(e.charCode === 13) {
			const { dispatch } = this.props;
			dispatch(doSearch(e.target.value))
			e.target.value = "";
		}

	}
	
	render() {
		return <div>
			<label htmlFor="m_search">Search Movie or TV show</label><SearchBox onfocus={this.handleSearch.bind(this)} onkeypress={this.handleSearch.bind(this)} />
			<MovieList movies={this.state.movies}/>
		</div>
	}
}

const SearchBox = props => {
		return <input id="m_search" onKeyPress={props.onkeypress} type="text"/>
}

const MovieList = (props) => {
	let movies = props.movies.map((p) => {
		return <Movie key={p.title} title={p.title}/>
	})
	return <div>
		Movies
		{movies}
	</div>
}

const Movie = props => {
	return <div>
		<input type="checkbox"/><span>{props.title}</span>
	</div>
}

const Venn = props => {
	return <div>Character Overlap</div>
}
export default App;
