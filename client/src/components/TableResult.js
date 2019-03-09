import { connect } from "react-redux";
import React, { Component } from "react";
import { doVenn } from "../actions";

@connect(state => {
  return {
    selected_movies: state.selected_movies,
    overlap: state.overlap
  };
})
export class Venn extends Component {
  handleVenn() {
    const { dispatch } = this.props;
    dispatch(doVenn(this.props.selected_movies.selected));
  }

  render() {
    let table = "";
    if (this.props.overlap.overlap.movies.length) {
      const header = this.props.overlap.overlap.movies.map(m => {
        return <th key={m.id}>{m.title}</th>;
      });
      let rows = (
        <tr>
          <td>No overlap</td>
        </tr>
      );
      if (this.props.overlap.overlap.actors.length) {
        rows = this.props.overlap.overlap.actors.map((actor, aidx) => {
          const actor_td = (
            <td key={actor[0].id}>
              <a target="_blank" rel="noopener noreferrer" href={actor[0].url}>
                {actor[0].actor}
              </a>
            </td>
          );
          const row = actor.map((role, idx) => {
            return <td key={`${role.character}-${idx}`}>{role.character}</td>;
          });
          return (
            <tr key={aidx}>
              {actor_td}
              {row}
            </tr>
          );
        });
      }
      table = (
        <table>
          <thead>
            <tr>
              <th>Actor</th>
              {header}
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
      );
    }
    return (
      <div>
        <h2>
          Character Overlap
          <button onClick={this.handleVenn.bind(this)}> Calculate</button>
        </h2>

        {table}
      </div>
    );
  }
}
