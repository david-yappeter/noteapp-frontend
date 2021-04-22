import { Icon, Menu, Card, Container } from "semantic-ui-react";
import React, { useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import { useCookies } from "react-cookie";
import { BOARD_BY_ID } from "./graphql/index";

const Board = (props) => {
  const [cookies] = useCookies();
  const [getBoard, { loading, called, data }] = useLazyQuery(BOARD_BY_ID, {
    context: {
      headers: {
        Authorization: cookies.access_token
          ? `Bearer ${cookies.access_token}`
          : "",
      },
    },
    variables: {
      boardID: props.match.params.boardID,
    },
    onError(err) {
      console.log(err);
    },
  });

  useEffect(() => {
    getBoard();
  }, []);

  const FluidMenuDiv = ({ content }) => (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "0 15px",
        borderRadius: "8%",
        margin: "0 5px",
        backgroundColor: "rgb(200,200,200, 0.8)",
      }}>
      {content}
    </div>
  );

  const ListItemDiv = ({ listItem: { name } }) => (
    <Container
      fluid
      draggable
      style={{
        padding: "7px 7px",
        margin: "5px",
        backgroundColor: "rgba(255,255,255 ,1)",
        borderRadius: "5px",
        boxShadow: "0 1px rgba(50,50,50, 0.6)",
      }}>
      {name}
    </Container>
  );

  const ListCard = ({ list: { name, list_items } }) => (
    <Card
      draggable
      style={{
        margin: "0 10px",
        minWidth: "300px",
        maxHeight: "calc(100vh - 120px)",
        backgroundColor: "#EBECF0",
      }}>
      <Card.Content>
        <Card.Header>
          <span style={{ fontSize: "0.9em", color: "rgba(40,40,40, 0.8)" }}>
            {name}
          </span>
          <Icon style={{ float: "right" }} name="ellipsis horizontal" />
        </Card.Header>
      </Card.Content>
      <Card.Content style={{ overflowY: "auto" }}>
        {list_items.map((listItem, index) => (
          <ListItemDiv listItem={listItem} key={`list_item_index_${index}`} />
        ))}
      </Card.Content>
      <Card.Content>
        <Icon name="add" style={{ marginRight: "15px" }} />
        <span style={{ fontSize: "0.9em", color: "rgba(40,40,40, 0.8)" }}>
          Add a Card
        </span>
      </Card.Content>
    </Card>
  );

  if (!(called && !loading)) {
    return (
      <div>
        <h2>Loading . . .</h2>
      </div>
    );
  }

  if (!data) {
    return (
      <div>
        <h2 style={{ color: "white" }}> Failed to Fetch Data</h2>
      </div>
    );
  }

  return (
    <div>
      <Menu
        style={{
          backgroundColor: "rgba(0,0,0,0)",
          boxShadow: "none",
          border: "0",
        }}>
        <Menu.Menu
          position="left"
          style={{ display: "flex", paddingLeft: "20px" }}>
          <FluidMenuDiv content={data.board.name} />
        </Menu.Menu>
        <Menu.Menu position="right"></Menu.Menu>
      </Menu>
      <div
        style={{
          display: "flex",
          overflowX: "auto",
        }}>
        {data.board.lists.map((list, index) => (
          <ListCard list={list} key={`list_card_index_${index}`} />
        ))}
      </div>
    </div>
  );
};

export default Board;
