import { useMutation } from "@apollo/client";
import { makeStyles } from "@material-ui/core/styles";
import React, { useState, useRef, useEffect } from "react";
import { useCookies } from "react-cookie";
import { Header, Modal, Icon, Form } from "semantic-ui-react";
import { ME, BOARD_CREATE } from "./graphql";

const useStyles = makeStyles({
  newBoard: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "5%",
    background: "rgba(30,30,30, 0.5)",
    width: "100%",
    height: "100%",
    padding: "5px 10px",
    transition: "all 0.3s",
    "&:hover": {
      backgroundColor: "rgba(20,20,20, 0.7)",
      transition: "all 0.3s",
    },
  },
});

const NewBoard = ({ team }) => {
  const classes = useStyles();
  const initialValue = {
    name: "",
  };
  const [cookies] = useCookies();
  const [modalOpen, setModalOpen] = useState(false);
  const [boardInput, setBoardInput] = useState(initialValue);
  const [boardCreate, { loading }] = useMutation(BOARD_CREATE, {
    context: {
      headers: {
        Authorization: cookies.access_token
          ? `Bearer ${cookies.access_token}`
          : "",
      },
    },
    refetchQueries: [
      {
        query: ME,
        context: {
          headers: {
            Authorization: cookies.access_token
              ? `Bearer ${cookies.access_token}`
              : "",
          },
        },
      },
    ],
  });

  const modalClose = () => {
    setModalOpen(false);
    setBoardInput(initialValue);
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setBoardInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    boardCreate({
      variables: {
        ...boardInput,
        teamID: team.id,
      },
    });
    setBoardInput(initialValue);
  };

  return (
    <Modal
      open={modalOpen}
      trigger={
        <div
          onClick={() => {
            setModalOpen(true);
          }}
          className={classes.newBoard}>
          <Icon name="plus" size="big" style={{ transform: "scale(0.8)" }} />
        </div>
      }
      onClose={() => modalClose()}
      onOpen={() => setModalOpen(true)}
      style={{ width: "calc(250px + 20vw)" }}>
      <Modal.Header>
        <Header as="h3">New Board</Header>
        <hr style={{ marginBottom: "10px" }} />
        <Modal.Content>
          <Form onSubmit={onSubmit} loading={loading}>
            <Form.Field>
              <label> Enter Board Name</label>
              <input
                required
                onChange={onChange}
                name="name"
                value={boardInput.name}
                autoFocus
                placeholder="Name"
              />
            </Form.Field>
            <Form.Button
              onSubmit={onSubmit}
              style={{ color: "white", backgroundColor: "rgba(97,189,79, 1)" }}>
              Create
            </Form.Button>
          </Form>
        </Modal.Content>
      </Modal.Header>
    </Modal>
  );
};

export default NewBoard;
