import React from "react";
import { Menu, Icon } from "semantic-ui-react";
import { Avatar } from "@material-ui/core";
import logo from "./../images/logo white.png";
import { useToken } from "../utils/hooks";
import { Redirect, useHistory, useLocation } from "react-router";
import { Link } from "react-router-dom";
import HeaderUserPopUp from "./HeaderUserPopUp";
import Cookies from "universal-cookie";
import { useCookies } from "react-cookie";

const HeaderComponent = () => {
  const pathLocation = useLocation();
  const history = useHistory();
  const [cookies] = useCookies();
  var bgColor;
  var menuColor;
  if (pathLocation.pathname === "/") {
    bgColor = "rgba(2,106,167, 1)";
    menuColor = "rgba(0,255,255, 0.5)";
  } else if (/team\/\d+\/board\/\d+/.test(pathLocation.pathname)) {
    bgColor = "rgba(0,0,0, 0.45)";
    menuColor = "rgba(255,255,255, 0.2)";
  } else {
    bgColor = "rgba(2,106,167, 1)";
    menuColor = "rgba(0,255,255, 0.5)";
  }
  const { user, loading, called } = useToken();

  const headerButtonData = [
    {
      name: "home",
      link: "/",
    },
    {
      name: "book",
      text: "Boards",
      link: "/",
    },
  ];

  if (!cookies.access_token) {
    return <Redirect to="/" />;
  }

  const getInitial = (nameString) => {
    const fullName = nameString.split(" ");
    const initials =
      fullName.length >= 2
        ? fullName[0].charAt(0) + fullName[1].charAt(0)
        : fullName[0].charAt(0);
    return initials.toUpperCase();
  };

  const HeaderIcon = ({ name, text, link }) => (
    <div
      style={{
        backgroundColor: menuColor,
        color: "white",
        margin: "auto 2px auto",
        borderRadius: !text ? "17%" : "5%",
        padding: "0",
        height: "28px",
      }}>
      <Link to={link} style={{ color: "inherit" }}>
        <Icon name={name} bordered style={{ margin: "auto" }} />
        {text && <span style={{ padding: "0 5px" }}>{text}</span>}
      </Link>
    </div>
  );

  return (
    <Menu
      style={{
        position: "relative",
        backgroundColor: bgColor,
        color: "white",
        marginBottom: "0",
        marginTop: "0",
      }}>
      <Menu.Menu position="left">
        {headerButtonData.map((headerData, index) => (
          <HeaderIcon key={index} {...headerData} />
        ))}
      </Menu.Menu>
      <img
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translateX(-50%) translateY(-50%)",
          height: "250%",
          cursor: "pointer",
          opacity: "0.8",
        }}
        alt="logo.png"
        src={logo}
        onClick={() => {
          if (!cookies.access_token) {
            history.push("/home");
          }
        }}
      />

      <Menu.Menu position="right">
        {called && !loading && <HeaderUserPopUp />}
      </Menu.Menu>
    </Menu>
  );
};

export default HeaderComponent;
