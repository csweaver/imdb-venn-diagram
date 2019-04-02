import { Container, Icon, Segment, Grid } from "semantic-ui-react";
import React from "react";

export function Footer() {
  return (
    <Segment vertical id="footer">
      <Container textAlign="center" id="footer-container">
        <Grid stackable>
          <Grid.Row>
            <Grid.Column width={16}>
              <p>
                <Icon name="github square" />
                <a href="https://github.com/csweaver/cast_overlap">source</a> |
                © 2019 - 2020 &nbsp; Charlotte Weaver
              </p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Segment>
  );
}
