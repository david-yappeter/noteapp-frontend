import { useMutation } from "@apollo/client";
import { Modal, Icon, Header, Button } from "semantic-ui-react";
import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { BOARD_DELETE, TEAM_BY_ID } from "./graphql";

const BoardDelete = ({ board }) => {
  const [cookies] = useCookies();
  const [modalOpen, setModalOpen] = useState(false);
  const [boardDelete, { loading }] = useMutation(BOARD_DELETE, {
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
        variables: {
          teamID: board.team_id,
        },
      },
    ],
  });

  const handleDeleteBoard = (e) => {
    e.preventDefault();
    boardDelete({
      variables: {
        id: board.id,
      },
    });
    setModalOpen(false);
  };

  return (
    <>
      <Icon
        name="trash"
        style={{
          transform: "translateX(-50%) translateY(-80%)",
          position: "absolute",
          zIndex: "10",
          right: "0",
          bottom: "0",
        }}
        onClick={(e) => {
          e.preventDefault();
          setModalOpen(true);
        }}
      />
      <Modal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
        }}
        onOpen={() => setModalOpen(true)}
        style={{ width: "400px" }}>
        <Modal.Header>
          <Header as="h3">Delete Board '{"  " + board.name}'</Header>
          <hr />
          <Modal.Content>
            <label style={{ fontSize: "0.8em" }}> Are you sure ?</label>
          </Modal.Content>
          <Modal.Actions style={{ marginTop: "20px" }}>
            <Button
              onClick={() => {
                setModalOpen(false);
              }}
              style={{ color: "white", backgroundColor: "red" }}>
              Cancel
            </Button>
            <Button
              onClick={handleDeleteBoard}
              style={{ color: "white", backgroundColor: "rgba(97,189,79, 1)" }}>
              Do it
            </Button>
          </Modal.Actions>
        </Modal.Header>
      </Modal>
    </>
  );
};

export default BoardDelete;
