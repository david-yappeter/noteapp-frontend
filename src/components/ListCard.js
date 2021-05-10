import React, { useState } from "react";
import {
  Button,
  Card,
  Dimmer,
  Header,
  Icon,
  Loader,
  Modal,
} from "semantic-ui-react";
import { Droppable } from "react-beautiful-dnd";
import ListItemDiv from "./ListItemDiv";
import { useMutation } from "@apollo/client";
import { LIST_DELETE, TEAM_BY_ID } from "./graphql";
import { useCookies } from "react-cookie";
import AddListItem from "./AddListItem";

const ListCard = ({ list, teamID, loading: updateLoading }) => {
  const { id, name, list_items, index } = list;
  const [cookies] = useCookies();
  const [modalOpen, setModalOpen] = useState(false);
  const [listDelete, { loading }] = useMutation(LIST_DELETE, {
    context: {
      headers: {
        Authorization: cookies.access_token
          ? `Bearer ${cookies.access_token}`
          : "",
      },
    },
    variables: {
      id: id,
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
  });
  return (
    // <div style={{ backgroundColor: "black", margin: "1px" }}>
    <Card
      draggable
      style={{
        alignSelf: "flex-start",
        margin: "0 10px",
        minWidth: "300px",
        maxHeight: "calc(100vh - 120px)",
        backgroundColor: "#EBECF0",
      }}>
      <Card.Content>
        <Dimmer active={updateLoading} inverted>
          <Loader inverted content="Loading" />
        </Dimmer>
        <Card.Header>
          <span style={{ fontSize: "0.9em", color: "rgba(40,40,40, 0.8)" }}>
            {name}
          </span>
          <Modal
            open={modalOpen}
            onOpen={() => setModalOpen(true)}
            onClose={() => setModalOpen(false)}
            style={{ width: "400px" }}>
            <Modal.Header>{`Delete List '${name}'`}</Modal.Header>
            <Modal.Content>
              <Header style={{ color: "rgba(60,60,60, 0.8)" }}>
                Are you sure ?
              </Header>
            </Modal.Content>
            <Modal.Actions
              style={{ display: "flex", alignItems: "flex-start" }}>
              <Button
                style={{ color: "white", backgroundColor: "red" }}
                onClick={() => setModalOpen(false)}>
                Cancel
              </Button>
              <Button
                style={{
                  color: "white",
                  backgroundColor: "rgba(97,189,79, 1)",
                }}
                onClick={() => {
                  setModalOpen(false);
                  listDelete();
                }}>
                Do it
              </Button>
            </Modal.Actions>
          </Modal>
        </Card.Header>
      </Card.Content>
      <Card.Content style={{ overflowY: "auto" }}>
        <Droppable droppableId={`${id}`}>
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={{ minHeight: "15px" }}>
              {list_items.map((listItem, index) => (
                <ListItemDiv
                  teamID={teamID}
                  listItem={listItem}
                  index={index}
                  key={`list_item_index_${index}`}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </Card.Content>
      <Card.Content>
        <AddListItem list={list} teamID={teamID} />
      </Card.Content>
    </Card>
    /* </div> */
  );
};
export default ListCard;
