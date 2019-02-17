import React, {Component} from 'react';
import './App.css';
import {addSelection, deleteSelection, doSearch, doVenn, clearUnselected} from "../actions"
import {connect} from "react-redux"

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
		selected_movies: state.selected_movies
	}
})

class SearchArea extends Component {

	handleSearch(e, data) {
		// TODO actually search for movie
		if (e.charCode === 13) {
			const {dispatch} = this.props;
			dispatch(doSearch(e.target.value))
			e.target.value = "";
		}
	}

	handleClear(e) {
		const {dispatch} = this.props;
		dispatch(clearUnselected(this.props.selected_movies.selected))
	}


	render() {
		return <div>
			<label htmlFor="m_search">Search Movie or TV show </label><SearchBox onfocus={this.handleSearch.bind(this)}
																				onkeypress={this.handleSearch.bind(this)}/>

			<MovieList clear={this.handleClear.bind(this)} movies={this.props.search_results.movies}/>
		</div>
	}
}

const SearchBox = props => {
	return <input id="m_search" onKeyPress={props.onkeypress} type="text"/>
}

const MovieList =
	(props) => {
		let movies = props.movies.map((p) => {
			return <Movie mid={p.id} key={p.title} title={p.title}/>
		})
		return <div>
			<h2>Movies <button onClick={props.clear}>Clear</button></h2>
			{movies}
		</div>
	}

@connect(state => {
	return {}
})
class Movie extends Component {
	handleCheck(e) {
		const checkbox = e.target;
		const {dispatch} = this.props;
		if (checkbox.checked) {
			dispatch(addSelection(this.props.mid))
		}
		else {
			dispatch(deleteSelection(this.props.mid))
		}
	}

	render() {
		return <div >
			<input onClick={this.handleCheck.bind(this)} type="checkbox"/><span>{this.props.title}</span>
		</div>
	}
}

@connect(state => {
	return {
		selected_movies: state.selected_movies,
		overlap: state.overlap
	}
})
class Venn extends Component {

	handleVenn() {
		const {dispatch} = this.props;
		dispatch(doVenn(this.props.selected_movies.selected))
	}

	render() {
		let table = ""
		if (this.props.overlap.overlap.movies.length) {
			const header = this.props.overlap.overlap.movies.map(m => {
				return <th key={m.id}>{m.title}</th>
			})
			let rows = <tr><td>No overlap</td></tr>
			if (this.props.overlap.overlap.actors.length) {
				rows = this.props.overlap.overlap.actors.map((actor, aidx) => {
					const actor_td = <td key={actor[0].id}><a target="_blank" rel="noopener noreferrer" href={actor[0].url}>{actor[0].actor}</a></td>
					const row = actor.map((role, idx) => {
						return <td key={`${role.character}-${idx}`}>{role.character}</td>
					})
					return <tr key={aidx}>{actor_td}{row}</tr>
				})
			}
			table = <table>
				<thead>
				<tr>
					<th>Actor</th>
					{header}</tr>
				</thead>
				<tbody>{rows}</tbody>
			</table>
		}
		return <div><h2>Character Overlap<button onClick={this.handleVenn.bind(this)}> Calculate</button></h2>

			{table}</div>
	}
}

export default App;
