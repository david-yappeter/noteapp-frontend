import React from "react";
import { Popup, Menu } from "semantic-ui-react";
import { Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useToken } from "../utils/hooks";
import { useCookies } from "react-cookie";

const useStyles = makeStyles({
  hLine: {
    margin: "10px 0",
    borderWidth: "thin",
  },
  listItem: {
    padding: "7px 0 7px 4px",
    margin: "4px 0",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "rgba(240, 240, 240,1)",
    },
  },
});

const HeaderUserPopUp = () => {
  const classes = useStyles();
  const [, , removeCookie] = useCookies();
  const { user } = useToken();
  const getInitial = (nameString) => {
    const fullName = nameString.split(" ");
    const initials =
      fullName.length >= 2
        ? fullName[0].charAt(0) + fullName[1].charAt(0)
        : fullName[0].charAt(0);
    return initials.toUpperCase();
  };

  const listItems = [
    {
      text: "Profile",
    },
    {
      text: "Logout",
      onClick: () => {
        logOut();
      },
    },
  ];

  const logOut = () => {
    removeCookie("access_token");
  };

  return (
    <Popup
      on="click"
      content={
        <div
          style={{ display: "flex", flexDirection: "column", width: "300px" }}>
          <div style={{ textAlign: "center" }}> Account </div>
          <hr className={classes.hLine} />
          <div style={{ display: "flex", alignItems: "center" }}>
            <Avatar
              style={{
                backgroundColor: "rgba(0,150,150, 0.5)",
                width: "32px",
                height: "32px",
                fontSize: "1em",
                fontWeight: "bold",
                margin: "auto 5px",
                cursor: "pointer",
              }}
              src={user?.me.avatar ? user.me.avatar : null}>
              {user && getInitial(user?.me.name)}
            </Avatar>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div>{user?.me.name}</div>
              <div style={{ color: "rgba(179,186,197, 1)" }}>
                {user?.me.email}
              </div>
            </div>
          </div>
          <hr className={classes.hLine} />
          <ul style={{ listStyleType: "none" }}>
            {listItems.map((listItem, index) => (
              <li
                key={`header_user_pop_up_index_${index}`}
                className={classes.listItem}
                onClick={listItem.onClick}>
                {" "}
                {listItem.text}{" "}
              </li>
            ))}
          </ul>
        </div>
      }
      trigger={
        <Avatar
          style={{
            backgroundColor: "rgba(0,255,255, 0.5)",
            width: "32px",
            height: "32px",
            fontSize: "1em",
            fontWeight: "bold",
            margin: "auto 5px",
            cursor: "pointer",
          }}
          src={user?.me.avatar ? user.me.avatar : null}>
          {user && getInitial(user?.me.name)}
        </Avatar>
      }
    />
  );
};

export default HeaderUserPopUp;
