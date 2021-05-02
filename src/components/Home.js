import { makeStyles } from "@material-ui/core/styles";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Grid, Icon, Menu, Header, Accordion } from "semantic-ui-react";
import { useToken } from "../utils/hooks";
import "./../App.css";
import BoardDelete from "./BoardDelete";
import HeaderComponent from "./HeaderComponent";
import NewBoard from "./NewBoard";
import NewTeam from "./NewTeam";

const useStyles = makeStyles({
  homeBoard: {
    position: "relative",
    borderRadius: "5%",
    background: "rgba(50,50,50, 0.4)",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    padding: "5px 10px",
    color: "black",
    transition: "background-color 0.3s",
    transition: "display 1s",
    "&:hover": {
      backgroundColor: "rgba(25,25,25, 0.7)",
      transition: "background-color 0.3s",
    },
  },
  iconBoxHover: {
    opacity: "0",
    position: "absolute",
    top: "0",
    left: "0",
    height: "100%",
    width: "100%",
    "&:hover": {
      opacity: "unset",
      transition: "all 0.5s",
    },
  },
});

const Home = () => {
  const classes = useStyles();
  const [activeAccord, setActiveAccord] = useState(-1);
  const [activeItem, setActiveItem] = useState("boards");
  const { user, loading, called } = useToken();
  // const [setModalOpen, BoardDeleteComponent] = BoardDelete(board)

  const sidebarTeamItems = (team) => {
    return [
      {
        name: "book",
        text: "Boards",
        link: `/team/${team.id}`,
      },
      {
        name: "users",
        text: "Members",
        link: `/team/${team.id}`,
      },
    ];
  };

  const singleTeamItems = (team, members) => {
    return [
      {
        name: "book",
        text: "Boards",
        link: `/team/${team.id}`,
      },
      {
        name: "users",
        text: `Members (${members.length})`,
        link: `/team/${team.id}`,
      },
    ];
  };

  const BoxColored = ({ board, link }) => {
    const { name } = board;
    return (
      <Link to={link} target="_blank">
        <div className={classes.homeBoard}>
          {name}
          <div className={classes.iconBoxHover}>
            <BoardDelete board={board} />
          </div>
        </div>
      </Link>
    );
  };

  const HomeTeamIcon = ({ name, text }) => (
    <div
      style={{
        backgroundColor: "rgba(200,200,200, 0.8)",
        color: "black",
        margin: "auto 5px",
        borderRadius: !text ? "17%" : "5%",
        paddingRight: "5px",
        height: "28px",
        border: "solid 1px rgb(222,222,222)",
      }}>
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

  const SingleTeam = ({ team }) => {
    const { id, name, members, boards } = team;
    return (
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
                }}>
                {teamInitial(name)}
              </Icon>
              <span
                style={{
                  color: "black",
                  marginLeft: "10px",
                }}>
                {name}
              </span>
            </Grid.Column>
            <Grid.Column width={12}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                }}>
                {singleTeamItems(team, members).map((item, index) => (
                  <Link
                    to={item.link}
                    onClick={() =>
                      localStorage.setItem("teamSectionSelection", index)
                    }>
                    <HomeTeamIcon name={item.name} text={item.text} />
                  </Link>
                ))}
              </div>
            </Grid.Column>
          </Grid>
        </Grid.Row>
        {boards.map((board, index) => (
          <Grid.Column key={`board_index_${index}`} style={{ height: "120px" }}>
            <BoxColored board={board} link={`/team/${id}/board/${board.id}`} />
          </Grid.Column>
        ))}
        <Grid.Column style={{ height: "120px" }}>
          <NewBoard team={team} />
        </Grid.Column>
      </>
    );
  };

  const SidebarMenuItem = ({ name, children, iconName }) => {
    const handleClick = (e, { name }) => {
      setActiveItem(name);
    };
    return (
      <Menu.Item
        name={name}
        active={activeItem === name}
        onClick={handleClick}
        style={{ backgroundColor: "rgba(255,255,255,1)" }}>
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

  const SidebarTeamAccordion = ({ icon, text, link, index }) => (
    <Link
      to={link}
      onClick={() => {
        localStorage.setItem("teamSectionSelection", index);
      }}>
      <Menu.Item style={{ marginTop: "10px" }} onClick={() => {}}>
        {icon}
        {text}
      </Menu.Item>
    </Link>
  );

  const SidebarTeamMenu = ({ team, index }) => {
    const { name, members } = team;
    return (
      <Menu.Item>
        <Accordion>
          <Accordion.Title
            active={activeAccord === index}
            index={index}
            onClick={handleAccord}>
            <Icon
              bordered
              style={{
                backgroundColor: "rgb(2,106,167)",
                transform: "translateY(-25%)",
                float: "left",
                marginRight: "10px",
                marginLeft: "-5px",
              }}>
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
          <Accordion.Content active={activeAccord === index}>
            <Menu secondary fluid vertical>
              {sidebarTeamItems(team).map(({ name, text, link }, index) => (
                <SidebarTeamAccordion
                  icon={
                    <Icon
                      name={name}
                      style={{
                        float: "left",
                        marginRight: "10px",
                      }}
                    />
                  }
                  text={text}
                  link={link}
                  index={index}
                />
              ))}
            </Menu>
          </Accordion.Content>
        </Accordion>
      </Menu.Item>
    );
  };

  return (
    <>
      <HeaderComponent />
      <Grid container style={{ marginTop: "50px" }}>
        <Grid.Column width={4}>
          <Menu fluid secondary vertical>
            <SidebarMenuItem name="boards" iconName="book">
              Boards
            </SidebarMenuItem>
          </Menu>
          <div
            style={{
              height: "30px",
              display: "flex",
              justifyContent: "space-between",
              paddingRight: "10px",
            }}>
            <Header
              as="span"
              content="Teams"
              style={{ margin: "0", alignSelf: "center", color: "black" }}
            />
            <NewTeam />
          </div>
          <Menu fluid vertical>
            {called &&
              !loading &&
              user?.me.teams.map((team, index) => (
                <SidebarTeamMenu
                  team={team}
                  index={index}
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
    </>
  );
};

export default Home;
