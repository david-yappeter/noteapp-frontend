import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { Button, Form, Header, Icon, Message } from "semantic-ui-react";
import { useForm } from "../utils/hooks";
import { TEAM_ADD_MEMBER_BY_EMAIL, TEAM_BY_ID } from "./graphql";

const InviteMember = ({ teamID }) => {
  const [cookies] = useCookies();
  const [errors, setErrors] = useState(null);
  const initialState = {
    email: "",
  };
  const { inputVariables, setVariables, onChange, onSubmit } = useForm(
    initialState,
    () => {
      setErrors(null);
      addMember({
        variables: {
          teamID: teamID,
          email: inputVariables.email,
        },
      });
    }
  );
  const [addMember, { loading }] = useMutation(TEAM_ADD_MEMBER_BY_EMAIL, {
    context: {
      headers: {
        Authorization: cookies.access_token
          ? `Bearer ${cookies.access_token}`
          : "",
      },
    },
    onError(err) {
      setErrors({
        message: err.graphQLErrors[0].message,
      });
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
    <div style={{ width: "250px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}>
        <Header as="h5">Add Member</Header>
      </div>
      <hr style={{ marginBottom: "15px" }} />
      <Form onSubmit={onSubmit}>
        <Form.Field>
          <label>
            <Icon name="user" style={{ marginRight: "15px" }} />
            <Header as="h5" style={{ display: "inline" }}>
              Enter Email Address
            </Header>
          </label>
          <input
            type="email"
            name="email"
            value={inputVariables.email}
            placeholder="Email . ."
            autoFocus
            onChange={onChange}
            onSubmit={onSubmit}
          />
        </Form.Field>
        <Button
          fluid
          style={{
            marginTop: "15px",
            backgroundColor: "rgba(97,189,79, 1)",
            color: "white",
          }}
          content={"Add to Team"}
          onSubmit={onSubmit}
        />
      </Form>
      {errors && <Message error list={[errors.message]} />}
    </div>
  );
};

export default InviteMember;
