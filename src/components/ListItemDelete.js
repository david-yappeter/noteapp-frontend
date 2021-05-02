import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { Button, Header, Icon, Modal } from "semantic-ui-react";
import { LIST_ITEM_DELETE, TEAM_BY_ID } from "./graphql";

const ListItemDelete = ({ listItem, teamID }) => {
  const [cookies] = useCookies();
  const [modalOpen, setModalOpen] = useState(false);
  const [listItemDelete, { loading }] = useMutation(LIST_ITEM_DELETE, {
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
          teamID: teamID,
        },
      },
    ],
    variables: {
      id: listItem.id,
    },
  });

  return (
    <>
      <Icon
        name="trash"
        onClick={(e) => {
          e.preventDefault();
          setModalOpen(true);
        }}
        style={{
          cursor: "pointer",
          alignSelf: "center",
        }}
      />
      <Modal
        style={{ width: "400px" }}
        open={modalOpen}
        onOpen={() => setModalOpen(true)}
        onClose={() => setModalOpen(false)}>
        <Modal.Header>Delete List Item '{`${listItem.name}`}'</Modal.Header>
        <Modal.Content>
          <Header>Are you sure ?</Header>
          <Button
            style={{ backgroundColor: "red", color: "white" }}
            onClick={() => setModalOpen(false)}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              setModalOpen(false);
              listItemDelete();
            }}
            style={{
              backgroundColor: "rgb(90,172,68)",
              color: "white",
            }}>
            Do it
          </Button>
        </Modal.Content>
      </Modal>
    </>
  );
};

export default ListItemDelete;
