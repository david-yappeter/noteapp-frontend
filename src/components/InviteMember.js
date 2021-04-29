import React from "react";
import { Button, Form, Header, Icon } from "semantic-ui-react";

const InviteMember = () => {
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
      <Form>
        <Form.Field>
          <label>
            <Icon name="user" style={{ marginRight: "15px" }} />
            <Header as="h5" style={{ display: "inline" }}>
              Enter Email Address
            </Header>
          </label>
          <input placeholder="Email . ." autoFocus />
        </Form.Field>
        <Button
          fluid
          style={{
            marginTop: "15px",
            backgroundColor: "rgba(97,189,79, 1)",
            color: "white",
          }}
          content={"Add to Team"}
        />
        {/* </div> */}
      </Form>
    </div>
  );
};

export default InviteMember;
