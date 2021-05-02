import { Image, Menu } from "semantic-ui-react";
import React from "react";
import logo from "./../images/logo black.png";
import { makeStyles } from "@material-ui/core/styles";
import { Link, useHistory } from "react-router-dom";

const useStyles = makeStyles({
  hoverA: {
    backgroundColor: "inherit",
    color: "rgb(36,129,252)",
    letterSpacing: "1px",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  hoverB: {
    backgroundColor: "rgba(36,129,252, 1)",
    color: "white",
    transition: "background 0.3s",
    letterSpacing: "1px",
    "&:hover": {
      color: "white",
      backgroundColor: "rgba(36,100,240, 1)",
      transition: "background 0.3s",
    },
  },
});

const LandingPageHeader = () => {
  const classes = useStyles();
  const history = useHistory();
  const menuButtons = [
    {
      text: "Log in",
      class: classes.hoverA,
      link: "/login",
    },
    {
      text: "Sign up",
      class: classes.hoverB,
      link: "/signup",
    },
  ];

  return (
    <Menu
      fixed
      borderless
      style={{
        display: "flex",
        position: "relative",
        backgroundColor: "white",
        boxShadow: "none",
      }}
      size="huge">
      <Menu.Item>
        <img
          src={logo}
          style={{
            position: "absolute",
            paddingLeft: "10px",
            width: "550%",
            transform: "translateX(-20%)",
            cursor: "pointer",
          }}
          // onClick={() => history.push("/home")}
        />
      </Menu.Item>
      <Menu.Item position="right">
        {menuButtons.map((menuButton) => (
          <Link
            to={menuButton.link}
            style={{
              padding: "7px 7px",
              margin: "0 7px",
              border: "0",
              borderRadius: "3px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
            className={menuButton.class}>
            {menuButton.text}
          </Link>
        ))}
      </Menu.Item>
    </Menu>
  );
};

export default LandingPageHeader;
