import { useLazyQuery, useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import {
  Button,
  Container,
  Grid,
  Header,
  Icon,
  Modal,
  Search,
} from "semantic-ui-react";
import { useToken } from "../utils/hooks";
import { REMOVE_MEMBER, TEAM_BY_ID } from "./graphql/index";

const Members = (props) => {
  const { teamID } = props.match.params;
  const [cookies] = useCookies();
  const [modalOpen, setModalOpen] = useState(false);
  const { user: meUser, loading: userLoading, called: userCalled } = useToken();
  const [sectionActive, setSectionActive] = useState(0);
  const [
    removeMember,
    {
      loading: removeMemberLoading,
      called: removeMemberCalled,
      data: removeMemberData,
    },
  ] = useMutation(REMOVE_MEMBER, {
    context: {
      headers: {
        Authorization: cookies.access_token
          ? `Bearer ${cookies.access_token}`
          : "",
      },
    },
    refetchQueries: [
      {
        query: TEAM_BY_ID,
        context: {
          headers: {
            Authorization: cookies.access_token
              ? `Bearer ${cookies.access_token}`
              : "",
          },
        },
        variables: props.match.params,
      },
    ],
  });
  const [
    teamById,
    { loading: teamByIdLoading, called: teamByIdCalled, data: teamByIdData },
  ] = useLazyQuery(TEAM_BY_ID, {
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

  const getInitial = (nameString) => {
    const fullName = nameString.split(" ");
    const initials =
      fullName.length >= 2
        ? fullName[0].charAt(0) + fullName[1].charAt(0)
        : fullName[0].charAt(0);
    return initials.toUpperCase();
  };

  const RemoveMemberConfirmation = ({
    handleRemoveMember,
    name,
    email,
    trigger,
  }) => (
    <Modal
      style={{ width: "500px" }}
      onClose={() => setModalOpen(false)}
      onOpen={() => setModalOpen(true)}
      open={modalOpen}
      trigger={trigger}>
      <Modal.Header>Remove Member</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Header as="h4">
            Are you sure to remove {`${name} (${email})`}?
          </Header>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color="black" onClick={() => setModalOpen(false)}>
          Cancel
        </Button>
        <Button
          content="Do it"
          labelPosition="right"
          icon="checkmark"
          style={{ backgroundColor: "red" }}
          onClick={() => {
            setModalOpen(false);
            handleRemoveMember();
          }}
          positive
        />
      </Modal.Actions>
    </Modal>
  );

  const MembersList = ({ member: { id, name, email }, teamID }) => {
    const handleRemoveMember = () => {
      removeMember({
        variables: {
          teamID: teamID,
          userID: id,
        },
      });
    };
    return (
      <>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: "14px 0",
          }}>
          <div style={{ display: "flex" }}>
            <Icon
              circular
              style={{
                float: "left",
                alignSelf: "center",
                marginRight: "15px",
                transform: "scale(1.4)",
              }}>
              {getInitial(name)}
            </Icon>
            <span
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}>
              <Header
                size="small"
                style={{ margin: "0", fontWeight: "bolder" }}>
                {name}
              </Header>
              <Header as="h5" style={{ margin: "0", fontWeight: "normal" }}>
                {email}
              </Header>
            </span>
          </div>
          <div>
            <RemoveMemberConfirmation
              handleRemoveMember={handleRemoveMember}
              name={name}
              email={email}
              trigger={
                <Button
                  style={{
                    width: "120px",
                    backgroundColor: "red",
                    color: "white",
                  }}
                  onClick={() => setModalOpen(false)}>
                  <Icon name="x" style={{ float: "left" }} />
                  {meUser?.me.id === id ? "Leave" : "Remove"}
                </Button>
              }
            />
          </div>
        </div>
        <hr style={{ border: "1px solid rgba(240,240,240, 0.8)" }} />
      </>
    );
  };

  const MembersSection = ({ members, teamID }) => {
    return (
      <Container style={{ paddingTop: "10px" }}>
        <Header>Members ({members.length})</Header>
        <Header as="h5" style={{ margin: "0 0 20px", fontWeight: "normal" }}>
          members can view and join all Workspace visible boards and create new
          boards in the Workspace.
        </Header>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "20px",
          }}>
          <Search />
          <Button
            style={{ color: "white", backgroundColor: "rgba(97,189,79, 1)" }}>
            <Icon name="user plus" />
            Invite Member
          </Button>
        </div>
        <hr />
        {members.map((member) => (
          <MembersList member={member} teamID={teamID} />
        ))}
      </Container>
    );
  };

  if (!teamByIdCalled || (teamByIdCalled && teamByIdLoading)) {
    return <h2> Loading . . </h2>;
  }

  const { team } = teamByIdData;

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
        {sectionActive === 1 && (
          <MembersSection members={team.members} teamID={team.id} />
        )}
      </div>
    </>
  );
};

export default Members;
