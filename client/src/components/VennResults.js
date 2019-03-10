import { connect } from "react-redux";
import React, { Component } from "react";
import { doVenn } from "../actions";
import { Header, Button } from "semantic-ui-react";

@connect(state => {
  return {
    movies: state.movies,
    overlap: state.overlap
  };
})
class Venn extends Component {
  handleVenn() {
    const { dispatch } = this.props;
    dispatch(doVenn(this.props.movies.chosen));
  }

  render() {
    let table = "";
    let disableSearch = this.props.movies.chosen.length < 2;
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
      <div className="section">
        <Header color="teal" as="h2">
          Character Overlap
          <Button disabled={disableSearch} onClick={this.handleVenn.bind(this)}>
            {" "}
            Calculate
          </Button>
        </Header>

        {table}
      </div>
    );
  }
}

export { Venn };
