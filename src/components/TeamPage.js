import { useLazyQuery, useMutation } from "@apollo/client";
import React, { useEffect, useRef, useState } from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import {
  Button,
  Container,
  Grid,
  Header,
  Icon,
  Modal,
  Popup,
  Search,
} from "semantic-ui-react";
import { useToken } from "../utils/hooks";
import { UserSearchReducer } from "../utils/reducer";
import { REMOVE_MEMBER, TEAM_BY_ID } from "./graphql/index";
import HeaderComponent from "./HeaderComponent";
import InviteMember from "./InviteMember";
import NewBoard from "./NewBoard";
import TeamHeader from "./TeamHeader";
import UserSearch from "./UserSearch";

const Members = (props, selectSection) => {
  const { teamID } = props.match.params;
  const [cookies] = useCookies();
  const [modalOpen, setModalOpen] = useState(false);
  const { value: state } = UserSearchReducer();
  const { user: meUser, loading: userLoading, called: userCalled } = useToken();
  const [sectionActive, setSectionActive] = useState(
    localStorage.getItem("teamSectionSelection") != undefined
      ? parseInt(localStorage.getItem("teamSectionSelection"))
      : 0
  );
  const { loading: searchLoading, results, value: searchVal } = state;
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

  useEffect(() => {
    teamById();
  }, []);

  if (!teamByIdCalled || (teamByIdCalled && teamByIdLoading)) {
    return <h2> Loading . . </h2>;
  }

  const { team } = teamByIdData;
  const { owner_id: ownerID, members } = team;

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

  const BoardsSection = ({ boards }) => {
    return (
      <Grid container columns={4} style={{ margin: "0" }}>
        {boards.map((board, index) => (
          <Grid.Column
            key={`board_section_grid_id_${index}`}
            style={{ height: "120px" }}>
            <BoxColored
              board={board}
              link={`/team/${teamID}/board/${board.id}`}
            />
          </Grid.Column>
        ))}

        <Grid.Column style={{ height: "120px" }}>
          <NewBoard team={team} />
        </Grid.Column>
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
            {id === ownerID && (
              <Header
                as="h4"
                style={{
                  margin: "0",
                  display: "inline",
                  alignSelf: "center",
                  marginLeft: "20px",
                }}>
                (Owner)
              </Header>
            )}
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
          <UserSearch users={members} />
          <Popup
            content={<InviteMember />}
            trigger={
              <Button
                style={{
                  color: "white",
                  backgroundColor: "rgba(97,189,79, 1)",
                }}>
                <Icon name="user plus" />
                Invite Member
              </Button>
            }
            on="click"
            position="bottom center"
          />
        </div>
        <hr />
        {searchLoading || !results ? console.log("aa") : console.log("bb")}
        {searchLoading || searchVal === ""
          ? members.map((member) => (
              <MembersList member={member} teamID={teamID} />
            ))
          : results.map(({ user: member }) => (
              <MembersList member={member} teamID={teamID} />
            ))}
      </Container>
    );
  };

  return (
    <>
      <HeaderComponent />
      <TeamHeader
        team={team}
        sectionActive={sectionActive}
        setSectionActive={setSectionActive}
      />
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
