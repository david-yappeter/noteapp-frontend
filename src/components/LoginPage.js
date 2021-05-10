import { Card, Dimmer, Loader, Message } from "semantic-ui-react";
import React, { useState } from "react";
import logo from "./../images/logo black crop.png";
import { makeStyles } from "@material-ui/core/styles";
import { useMutation } from "@apollo/client";
import { LOGIN } from "./graphql";
import { useCookies } from "react-cookie";
import { Redirect, useHistory, withRouter } from "react-router";
import { useForm } from "./../utils/hooks";

const useStyles = makeStyles({
  input: {
    width: "90%",
    margin: "10px 5%",
    padding: "10px 6px",
    outline: "none",
    borderRadius: "4px",
    border: "2px solid rgba(235,235,235,1)",
    transition: "border-color 0.3s",
    "&:focus": {
      border: "2px solid blue",
      transition: "border-color 0.3s",
    },
  },
  button: {
    width: "90%",
    margin: "10px 5%",
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

const LoginPage = () => {
  const [, setCookies] = useCookies();
  const classes = useStyles();
  const history = useHistory();
  const [errors, setErrors] = useState(null);
  const initialValue = {
    email: "",
    password: "",
  };
  const { inputVariables, onChange, onSubmit } = useForm(initialValue, () => {
    setErrors(null);
    loginUser({
      variables: inputVariables,
    });
  });
  const [loginUser, { loading }] = useMutation(LOGIN, {
    update(cache, result) {
      setErrors(null);
      setCookies("access_token", result.data.auth.login.token);
      history.push("/home");
    },
    onError(err) {
      setErrors({ message: err.graphQLErrors[0].message });
    },
  });

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        backgroundColor: "rgba(249,250,252, 1)",
      }}>
      <div
        style={{
          paddingTop: "150px",
          display: "flex",
          flexDirection: "column",
        }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
          <img src={logo} />
        </div>
        <Card
          style={{
            width: "350px",
            alignSelf: "center",
            boxShadow: "0 0 10px rgba(40,40,40, 0.3)",
          }}>
          <Card.Header
            textAlign="center"
            style={{ margin: "20px 0", fontWeight: "bold" }}>
            Log in to Wello
          </Card.Header>
          <Card.Content>
            <form onSubmit={onSubmit}>
              <input
                name="email"
                type="email"
                value={inputVariables.email}
                onChange={onChange}
                placeholder="Enter email"
                autoFocus
                className={classes.input}
                disabled={loading}
                required
              />
              <input
                name="password"
                value={inputVariables.password}
                onChange={onChange}
                type="password"
                placeholder="Enter password"
                className={classes.input}
                disabled={loading}
                required
              />
              {errors && (
                <Message
                  style={{ width: "90%", margin: "10px 5%" }}
                  error
                  list={[errors.message]}
                />
              )}
              <button
                className={classes.button}
                onSubmit={onSubmit}
                disabled={loading}>
                Log in
              </button>
            </form>
          </Card.Content>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
