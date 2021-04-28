import { useLazyQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import { Container, Grid, Header, Icon } from "semantic-ui-react";
import { TEAM_BY_ID } from "./graphql/index";

const Members = (props) => {
  const { teamID } = props.match.params;
  const [cookies] = useCookies();
  const [sectionActive, setSectionActive] = useState(0);
  const [teamById, { loading, called, data }] = useLazyQuery(TEAM_BY_ID, {
    context: {
      headers: {
        Authorization: cookies.access_token
          ? `Bearer ${cookies.access_token}`
          : "",
      },
    },
    variables: props.match.params,
  });

  const sectionItems = [
    {
      icon: "book",
      text: "Boards",
    },
    {
      icon: "users",
      text: "Members",
    },
  ];

  useEffect(() => {
    teamById();
  }, []);

  const BoxColored = ({ board: { name }, link }) => (
    <Link to={link} target="_blank">
      <div
        style={{
          borderRadius: "5%",
          background: "red",
          width: "100%",
          height: "100%",
          padding: "5px 10px",
          color: "black",
        }}>
        {name}
      </div>
    </Link>
  );

  const Section = ({ icon, text, index }) => {
    const handleClick = () => {
      setSectionActive(index);
    };
    return (
      <div
        //rgb(193,199,208)
        style={{
          fontWeight: "bold",
          border: "1px solid rgba(200,200,200,0.8)",
          borderBottom: "none",
          padding: "5px 10px",
          margin: " 0 7px",
          backgroundColor:
            sectionActive === index
              ? "rgba(255,255,255,1)"
              : "rgba(223,225,230, 1)",
        }}
        onClick={handleClick}>
        {icon && (
          <Icon name={icon} size="small" style={{ marginRight: "5px" }} />
        )}
        {text}
      </div>
    );
  };

  const TeamLogo = ({ teamName }) => {
    return (
      <Icon
        bordered
        size="huge"
        style={{
          borderRadius: "10px",
          borderWidth: "0",
          background: "linear-gradient(to bottom, red, orange",
          color: "white",
          transform: "scale(0.7)",
        }}>
        {teamName.charAt(0)}
      </Icon>
    );
  };

  const BoardsSection = ({ boards }) => {
    return (
      <Grid container columns={4} style={{ margin: "0", height: "120px" }}>
        {boards.map((board, index) => (
          <Grid.Column key={`board_section_grid_id_${index}`}>
            <BoxColored
              board={board}
              link={`/team/${teamID}/board/${board.id}`}
            />
          </Grid.Column>
        ))}
      </Grid>
    );
  };

  const MembersSection = ({ members }) => {
    console.log(members);
    return (
      <Container>
        <Header>Members {members}</Header>
      </Container>
    );
  };

  if (!called || (called && loading)) {
    return <h2> Loading . . </h2>;
  }

  const { team } = data;
  console.log(team);

  return (
    <>
      <div
        style={{
          display: "flex",
          position: "relative",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgba(244,245,247, 1)",
          height: "220px",
        }}>
        <TeamLogo teamName={team?.name} />
        <Header
          content={team.name}
          size="large"
          style={{ margin: "0", padding: "0" }}
        />
        <div
          style={{
            bottom: "0",
            display: "flex",
            position: "absolute",
          }}>
          {sectionItems.map((section, index) => (
            <Section
              icon={section.icon}
              text={section.text}
              key={`section_id_${index}`}
              index={index}
            />
          ))}
        </div>
      </div>
      <div>{sectionActive === 0 && <BoardsSection boards={team.boards} />}</div>
      <div>
        {sectionActive === 1 && <MembersSection members={team.members} />}
      </div>
    </>
  );
};

export default Members;
