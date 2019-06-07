import { connect } from "react-redux";
import React, { Component } from "react";
import { doVenn } from "../actions";
import { Header, Button, Table } from "semantic-ui-react";

@connect(state => {
  return {
    movies: state.movies,
    overlap_movies: state.overlap.movies,
    overlap_actors: state.overlap.actors,
    loading: state.overlap.loading
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
    if (this.props.overlap_movies.length) {
      const col_width = Math.floor(14 / this.props.overlap_movies.length);
      const header = this.props.overlap_movies.map(m => {
        return (
          <Table.HeaderCell width={`${col_width}`} key={m.id}>
            <img alt={m.title} src={m.image} height="54" width="40" />{" "}
            <a target="_blank" rel="noopener noreferrer" href={m.url}>
              {m.title}
            </a>{" "}
            - {m.kind}
          </Table.HeaderCell>
        );
      });
      let rows = (
        <Table.Row>
          <Table.Cell>No overlap</Table.Cell>
        </Table.Row>
      );
      if (this.props.overlap_actors.length) {
        rows = this.props.overlap_actors.map((actor, aidx) => {
          const actor_td = (
            <Table.Cell key={actor.id}>
              <a target="_blank" rel="noopener noreferrer" href={actor.url}>
                {actor.name}
              </a>
            </Table.Cell>
          );
          const row = actor.roles.map((role, idx) => {
            return (
              <Table.Cell key={`${role.character}-${idx}`}>
                {role.character}
              </Table.Cell>
            );
          });
          return (
            <Table.Row key={aidx}>
              {actor_td}
              {row}
            </Table.Row>
          );
        });
      }
      table = (
        <Table color="teal" compact celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell width={2}>Actor</Table.HeaderCell>
              {header}
            </Table.Row>
          </Table.Header>
          <Table.Body>{rows}</Table.Body>
        </Table>
      );
    }
    return (
      <div className="section">
        <Header color="teal" as="h2">
          Character Overlap
          <Button
            className="section-button"
            color={"teal"}
            disabled={disableSearch}
            loading={this.props.loading}
            onClick={this.handleVenn.bind(this)}
          >
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
