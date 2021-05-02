import { Card } from "semantic-ui-react";
import React, { useEffect } from "react";
import logo from "./../images/logo black crop.png";
import { makeStyles } from "@material-ui/core/styles";
import { useMutation } from "@apollo/client";
import { REGISTER } from "./graphql";
import { useCookies } from "react-cookie";
import { useHistory, useParams } from "react-router";
import { useForm } from "../utils/hooks";
import queryString from "query-string";

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

const SignupPage = (props) => {
  const [, setCookies] = useCookies();
  let queryParams = queryString.parse(props.location.search);
  const classes = useStyles();
  const history = useHistory();
  const initialValue = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const { inputVariables, setInputVariables, onChange, onSubmit } = useForm(
    initialValue,
    () => {
      registerUser({
        variables: inputVariables,
      });
    }
  );
  const [registerUser, { loading }] = useMutation(REGISTER, {
    update(cache, result) {
      console.log(result);
      setCookies("access_token", result.data.auth.register.token);
      history.push("/home");
    },
    onError(err) {
      console.log(err);
    },
  });

  useEffect(() => {
    setInputVariables((prev) => ({
      ...prev,
      ...queryParams,
    }));
  }, []);

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
            Sign up for your account
          </Card.Header>

          <Card.Content>
            <form onSubmit={onSubmit}>
              <input
                name="name"
                value={inputVariables.name}
                onChange={onChange}
                placeholder="Enter name"
                autoFocus
                className={classes.input}
                disabled={loading}
              />
              <input
                name="email"
                value={inputVariables.email}
                onChange={onChange}
                placeholder="Enter email"
                autoFocus
                className={classes.input}
                disabled={loading}
              />
              <input
                name="password"
                value={inputVariables.password}
                onChange={onChange}
                type="password"
                placeholder="Enter password"
                className={classes.input}
                disabled={loading}
              />
              <input
                name="confirmPassword"
                value={inputVariables.confirmPassword}
                onChange={onChange}
                type="password"
                placeholder="Enter confirm password"
                className={classes.input}
                disabled={loading}
              />
              <button
                className={classes.button}
                onSubmit={onSubmit}
                disabled={loading}>
                Sign Up
              </button>
            </form>
          </Card.Content>
        </Card>
      </div>
    </div>
  );
};

export default SignupPage;
