import React, { useState } from "react";
import { Grid, Icon, Menu, Header, Accordion } from "semantic-ui-react";
import { useToken } from "../utils/hooks";
import "./../App.css";

const Home = () => {
  const [activeAccord, setActiveAccord] = useState(0);
  const [activeItem, setActiveItem] = useState("boards");
  const { user, loading, called } = useToken();
  const BoxColored = ({ board: { name } }) => (
    <div
      style={{
        borderRadius: "5%",
        background: "red",
        width: "100%",
        height: "100%",
        padding: "5px 10px",
      }}
    >
      {name}
    </div>
  );

  const HomeTeamIcon = ({ name, text }) => (
    <div
      style={{
        backgroundColor: "rgba(0,0,0, 0.03)",
        color: "gray",
        margin: "auto 5px",
        borderRadius: !text ? "17%" : "5%",
        paddingRight: "5px",
        height: "28px",
        border: "solid 1px rgb(222,222,222)",
      }}
    >
      <Icon bordered name={name} style={{ margin: "auto" }} />
      {text && <span style={{ padding: "0 5px" }}>{text}</span>}
    </div>
  );

  const teamInitial = (name) => {
    return name.split(" ")[0].charAt(0).toUpperCase();
  };

  const handleAccord = (e, titleProps) => {
    const { index } = titleProps;
    const newAccord = activeAccord === index ? -1 : index;

    setActiveAccord(newAccord);
  };

  const SingleTeam = ({ team: { name, members, boards } }) => (
    <>
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
              {teamInitial(name)}
            </Icon>
            <span> {name}</span>
          </Grid.Column>
          <Grid.Column width={12}>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
              }}
            >
              <HomeTeamIcon name="book" text="Boards" />
              <HomeTeamIcon name="users" text={`Members (${members.length})`} />
            </div>
          </Grid.Column>
        </Grid>
      </Grid.Row>
      <Grid.Row style={{ height: "120px" }}>
        {boards.map((board, index) => (
          <Grid.Column key={`board_index_${index}`}>
            <BoxColored board={board} />
          </Grid.Column>
        ))}
      </Grid.Row>
    </>
  );

  const SidebarMenuItem = ({ type, children, iconName }) => {
    return (
      <Menu.Item active={activeItem === type}>
        {iconName && (
          <Icon
            name={iconName}
            style={{ float: "left", marginRight: "10px", marginLeft: "-5px" }}
          />
        )}
        <span>{children}</span>
      </Menu.Item>
    );
  };

  const SidebarTeamMenu = ({ team: { name } }) => {
    return (
      <Menu.Item>
        <Accordion>
          <Accordion.Title
            active={activeAccord === 0}
            index={0}
            onClick={handleAccord}
          >
            <Icon
              bordered
              style={{
                backgroundColor: "rgb(2,106,167)",
                transform: "translateY(-25%)",
                float: "left",
                marginRight: "10px",
                marginLeft: "-5px",
              }}
            >
              {teamInitial(name)}
            </Icon>
            {name}
            <Icon
              name="dropdown"
              style={{
                float: "right",
              }}
            />
          </Accordion.Title>
          <Accordion.Content active={activeAccord === 0}>
            <Menu secondary fluid vertical> 
              <Menu.Item>
                asdasd
              </Menu.Item>
              <Menu.Item>
                asdasd
              </Menu.Item>
              <Menu.Item>
                asdasd
              </Menu.Item>
            </Menu>
          </Accordion.Content>
        </Accordion>
      </Menu.Item>
    );
  };

  return (
    <Grid container>
      <Grid.Column width={4}>
        <Menu fluid secondary vertical>
          <SidebarMenuItem type="boards" iconName="book">
            Boards
          </SidebarMenuItem>
        </Menu>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            paddingRight: "20px",
          }}
        >
          <Header as="span" content="Teams" />
          <Icon link name="add" />
        </div>
        <Menu fluid vertical>
          {called &&
            !loading &&
            user?.me.teams.map((team, index) => (
              <SidebarTeamMenu
                team={team}
                key={`sidebar_team_menu_index_${index}`}
              />
            ))}
        </Menu>
      </Grid.Column>
      <Grid.Column width={12}>
        <Grid columns={4}>
          {called &&
            !loading &&
            user?.me.teams.map((team, index) => (
              <SingleTeam team={team} key={`team_index_${index}`} />
            ))}
        </Grid>
      </Grid.Column>
    </Grid>
  );
};

export default Home;
