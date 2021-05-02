import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { Icon, Header, Button, Card, Modal, Form } from "semantic-ui-react";
import { useForm } from "../utils/hooks";
import { LIST_CREATE, TEAM_BY_ID } from "./graphql";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  input: {
    width: "90%",
    padding: "10px 6px",
    outline: "none",
    borderRadius: "4px",
    border: "2px solid rgba(235,235,235,1)",
    transition: "border-color 0.3s",
    "&:focus": {
      border: "2px solid blue",
      transition: "border-color 0.3s",
    },
    marginBottom: "20px",
    fontSize: "1.4em",
  },
});
const NewListCard = ({ board }) => {
  const { id } = board;
  const classes = useStyles();
  const [cookies] = useCookies();
  const [modalOpen, setModalOpen] = useState(false);
  const initialValue = {
    name: "",
    boardID: id,
  };
  const { inputVariables, setInputVariables, onChange, onSubmit } = useForm(
    initialValue,
    () => {
      setModalOpen(false);
      listCreate();
    }
  );
  const [listCreate, { loading }] = useMutation(LIST_CREATE, {
    context: {
      headers: {
        Authorization: cookies.access_token
          ? `Bearer ${cookies.access_token}`
          : "",
      },
    },
    variables: inputVariables,
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

  const modalClose = () => {
    setInputVariables(initialValue);
    setModalOpen(false);
  };

  return (
    <>
      <Card
        style={{
          alignSelf: "flex-start",
          margin: "0 10px",
          minWidth: "300px",
          maxHeight: "calc(100vh - 120px)",
          backgroundColor: "rgba(245, 245, 245, 0.3)",
          cursor: "pointer",
        }}
        onClick={() => setModalOpen(true)}>
        <Card.Content style={{ display: "flex" }}>
          <Icon name="add" style={{ color: "rgba(80,80,80,0.8)" }} />
          <Card.Header>
            <span style={{ fontSize: "0.9em", color: "rgba(80,80,80, 0.8)" }}>
              Add New List
            </span>
          </Card.Header>
        </Card.Content>
      </Card>
      <Modal
        style={{ width: "400px" }}
        open={modalOpen}
        onClose={() => modalClose()}
        onOpen={() => setModalOpen(true)}>
        <Modal.Header>New List</Modal.Header>
        <Modal.Content>
          <form onSubmit={onSubmit}>
            <input
              className={classes.input}
              name="name"
              onChange={onChange}
              onSubmit={onSubmit}
              value={inputVariables.name}
              placeholder="Name"
              autoFocus
            />
            <Button
              type="submit"
              style={{
                color: "white",
                backgroundColor: "rgba(97,189,79, 1)",
              }}
              onSubmit={onSubmit}>
              Create
            </Button>
          </form>
        </Modal.Content>
      </Modal>
    </>
  );
};

export default NewListCard;
