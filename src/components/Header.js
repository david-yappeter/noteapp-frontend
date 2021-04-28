import React from "react";
import { Menu, Icon } from "semantic-ui-react";
import { Avatar } from "@material-ui/core";
import logo from "./../images/logo.png";
import { useToken } from "../utils/hooks";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";

const Header = () => {
  const pathLocation = useLocation();
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
      }}>
      <Menu.Menu position="left">
        {headerButtonData.map((headerData) => (
          <HeaderIcon {...headerData} />
        ))}
      </Menu.Menu>
      <img
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translateX(-50%) translateY(-50%)",
          height: "250%",
          opacity: "0.8",
        }}
        alt="logo.png"
        src={logo}
      />

      <Menu.Menu position="right">
        {called && !loading && (
          <Avatar
            style={{
              backgroundColor: "rgba(0,255,255, 0.5)",
              width: "32px",
              height: "32px",
              fontSize: "1em",
              fontWeight: "bold",
              margin: "auto 5px",
            }}
            src={user?.me.avatar ? user.me.avatar : null}>
            {user && getInitial(user?.me.name)}
          </Avatar>
        )}
      </Menu.Menu>
    </Menu>
  );
};

export default Header;
