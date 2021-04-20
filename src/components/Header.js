import React from "react";
import { Menu, Container, Icon } from "semantic-ui-react";
import { Avatar } from "@material-ui/core";
import logo from "./../images/logo.png";
import { useToken } from "../utils/hooks";

const Header = () => {
  const user = useToken();

  const getInitial = (nameString) => {
    const fullName = nameString.split(" ");
    const initials =
      fullName.length >= 2
        ? fullName[0].charAt(0) + fullName[1].charAt(0)
        : fullName[0].charAt(0);
    return initials.toUpperCase();
  };

  const HeaderIcon = ({ name, text }) => (
    <div
      style={{
        backgroundColor: "rgba(0,255,255, 0.5)",
        color: "white",
        margin: "auto 2px auto",
        borderRadius: !text ? "17%" : "5%",
        padding: "0",
        height: "28px",
      }}>
      <Icon name={name} bordered style={{ margin: "auto" }} />
      {text && <span style={{ padding: "0 5px" }}>{text}</span>}
    </div>
  );

  const dummy = {
    id: 1,
    name: "David Yappeter",
  };

  console.log(user);

  return (
    <Menu
      style={{
        position: "relative",
        backgroundColor: "rgb(2,106,167)",
        color: "white",
        marginBottom: "50px",
      }}>
      <Menu.Menu position="left">
        <HeaderIcon name="home" />
        <HeaderIcon name="book" text="Boards" />
      </Menu.Menu>
      <Container textAlign="center">
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
      </Container>

      <Menu.Menu position="right">
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
      </Menu.Menu>
    </Menu>
  );
};

export default Header;
