import React, { useRef, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Dimmer, Form, Icon, Loader } from "semantic-ui-react";
import { useForm, useOutsideAlerter } from "../utils/hooks";
import { useMutation } from "@apollo/client";
import { LIST_ITEM_CREATE, TEAM_BY_ID } from "./graphql";
import { useCookies } from "react-cookie";

const useStyles = makeStyles({
  addCard: {
    padding: "5px",
    borderRadius: "4px",
    color: "rgba(100,100,100, 0.9)",
    "&:hover": {
      backgroundColor: "rgba(210,210,210, 0.8)",
    },
  },
  button: {
    width: "40%",
    margin: "10px 0 0",
    padding: "10px 6px",
    outline: "none",
    borderRadius: "4px",
    border: "0",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
    backgroundColor: "rgb(90,172,68)",
    "&:hover": {
      backgroundColor: "rgb(100,182,78)",
    },
  },
});

const AddListItem = ({ list, teamID }) => {
  const classes = useStyles();
  const [cookies] = useCookies();
  const initialValue = {
    name: "",
  };
  const { inputVariables, setInputVariables, onChange, onSubmit } = useForm(
    initialValue,
    () => {
      listItemCreate({
        variables: {
          name: inputVariables.name,
          listID: list.id,
        },
      });
    }
  );
  const [listItemCreate, { loading }] = useMutation(LIST_ITEM_CREATE, {
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
  });
  const wrapperRef = useRef(null);
  const [open, setOpen] = useState(false);
  useOutsideAlerter(wrapperRef, (e) => {
    if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
      setOpenFalse();
    }
  });

  const setOpenFalse = () => {
    setOpen(false);
    setInputVariables(initialValue);
  };

  return (
    <>
      <Dimmer active={loading} inverted>
        <Loader inverted />
      </Dimmer>
      {open ? (
        <div ref={wrapperRef}>
          <Form onSubmit={onSubmit}>
            <input
              name="name"
              placeholder="Enter name for this item..."
              style={{ resize: "none" }}
              rows="3"
              autoFocus
              onChange={onChange}
              onSubmit={onSubmit}
              value={inputVariables.name}
              disabled={loading}
              required
            />
            <button
              type="submit"
              className={classes.button}
              onSubmit={onSubmit}
              disabled={loading}>
              Create
            </button>
          </Form>
        </div>
      ) : (
        <div
          className={classes.addCard}
          ref={wrapperRef}
          onClick={() => setOpen(true)}>
          <Icon name="add" style={{ marginRight: "15px" }} />
          <span style={{ fontSize: "0.9em" }}>Add a Card</span>
        </div>
      )}
    </>
  );
};

export default AddListItem;
