import React from "react";
import { Grid, Icon } from "semantic-ui-react";
import { Typography } from "@material-ui/core";

const Home = () => {
  const BoxColored = () => (
    <div
      style={{
        borderRadius: "5%",
        background: "red",
        width: "100%",
        height: "100%",
        padding: "5px 10px",
      }}
    >
      Team A
    </div>
  );

  const HomeTeamIcon = ({ name, text }) => (
    <div
      style={{
        backgroundColor: "rgba(0,0,0, 0.03)",
        color: "gray",
        margin: "auto 2px auto",
        borderRadius: !text ? "17%" : "5%",
        padding: "0",
        height: "28px",
      }}
    >
      <Icon bordered name={name} style={{ margin: "auto" }} />
      {text && <span style={{ padding: "0 5px" }}>{text}</span>}
    </div>
  );

  return (
    <Grid container>
      <Grid.Column width={4}>asd</Grid.Column>
      <Grid.Column width={12}>
        <Grid columns={4}>
          <Grid.Row>
            <Grid container>
              <Grid.Column width={4}>
                <Icon
                  bordered
                  style={{
                    margin: "auto",
                    backgroundColor: "rgb(2,106,167)",
                    color: "white",
                    borderRadius: "17%",
                  }}
                >
                  T
                </Icon>
                <span> Team A </span>
              </Grid.Column>
              <Grid.Column width={12}>
                <Grid columns={3}>
                  <Grid.Column>
                    <HomeTeamIcon name="book" text="Boards" />
                  </Grid.Column>
                  <Grid.Column>
                    <HomeTeamIcon name="users" text="Member" />
                  </Grid.Column>
                  <Grid.Column>
                    <HomeTeamIcon name="table" text="Table" />
                  </Grid.Column>
                </Grid>
              </Grid.Column>
            </Grid>
          </Grid.Row>
          <Grid.Row style={{ height: "120px" }}>
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
