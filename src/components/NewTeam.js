import { useMutation } from "@apollo/client";
import { makeStyles } from "@material-ui/core/styles";
import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { Form, Icon, Modal, Header, Label } from "semantic-ui-react";
import { TEAM_CREATE, ME } from "./graphql";

const useStyles = makeStyles({
  triggerButton: {
    alignSelf: "center",
    "&:hover": {
      backgroundColor: "rgba(200,200,200,0.8)",
    },
  },
});

const NewTeam = () => {
  const classes = useStyles();
  const initialValue = {
    name: "",
  };
  const [cookies] = useCookies();
  const [modalOpen, setModalOpen] = useState(false);
  const [teamInput, setTeamInput] = useState(initialValue);
  const [teamCreate, { loading }] = useMutation(TEAM_CREATE, {
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
    setTeamInput(initialValue);
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setTeamInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    teamCreate({
      variables: teamInput,
    });
    setTeamInput(initialValue);
  };

  return (
    <Modal
      onClose={() => modalClose()}
      onOpen={() => setModalOpen(true)}
      trigger={
        <Label className={classes.triggerButton}>
          <Icon name="plus" style={{ padding: "0", margin: "0" }} />
        </Label>
      }
      style={{ width: "500px" }}>
      <Modal.Header>
        <Header as="h3">New Team</Header>
      </Modal.Header>
      <Modal.Content>
        <Form onSubmit={onSubmit} loading={loading}>
          <Form.Field>
            <label> Enter Team Name</label>
            <input
              autoFocus
              value={teamInput.name}
              onChange={onChange}
              onSubmit={onSubmit}
              name="name"
            />
          </Form.Field>
          <Form.Button
            onSubmit={onSubmit}
            style={{ color: "white", backgroundColor: "rgba(97,189,79, 1)" }}>
            Create
          </Form.Button>
        </Form>
      </Modal.Content>
    </Modal>
  );
};

export default NewTeam;
