import React from "react";
import { Grid } from "semantic-ui-react";

const Home = () => {
  const BoxColored = () => (
    <div style={{ background: "red", width: "100%", height: "100%" }}>asd</div>
  );

  return (
    <Grid container>
      <Grid.Column width={4}>asd</Grid.Column>
      <Grid.Column width={12}>
        <Grid columns={4}>
          <Grid.Row style={{ height: "100px" }}>
            <Grid.Column>
              <BoxColored />
            </Grid.Column>
            <Grid.Column>
              <BoxColored />
            </Grid.Column>
            <Grid.Column>
              <BoxColored />
            </Grid.Column>
            <Grid.Column>
              <BoxColored />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Grid.Column>
    </Grid>
  );
};

export default Home;
