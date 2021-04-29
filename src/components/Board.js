import { Icon, Menu, Card, Container } from "semantic-ui-react";
import React, { useEffect } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import { useCookies } from "react-cookie";
import { BOARD_BY_ID, LIST_ITEM_MOVE } from "./graphql/index";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

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
  const [updateList, { updateListL, updateListC, updateListD }] = useMutation(
    LIST_ITEM_MOVE,
    {
      context: {
        headers: {
          Authorization: cookies.access_token
            ? `Bearer ${cookies.access_token}`
            : "",
        },
      },
      onError(err) {
        console.log(err);
      },
      refetchQueries: [
        {
          query: BOARD_BY_ID,
        },
      ],
    }
  );

  useEffect(() => {
    getBoard();
    // eslint-disable-next-line
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

  const ListItemDiv = ({ listItem: { id, name }, index }) => (
    <Draggable key={`${id}`} draggableId={`${id}`} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}>
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
        </div>
      )}
    </Draggable>
  );

  const ListCard = ({ list: { id, name, list_items, index } }) => (
    <Card
      draggable
      style={{
        alignSelf: "flex-start",
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
        <Droppable droppableId={`${id}`}>
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={{ minHeight: "15px" }}>
              {list_items.map((listItem, index) => (
                <ListItemDiv
                  listItem={listItem}
                  index={index}
                  key={`list_item_index_${index}`}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
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

  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }
    console.log(result);
    if (
      result.destination.index === result.source.index &&
      result.destination.droppableId === result.source.droppableId
    ) {
      return;
    }
  };

  return (
    <div style={{ marginTop: "20px" }}>
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
      <DragDropContext onDragEnd={onDragEnd}>
        <div
          style={{
            display: "flex",
            height: "calc(100vh - 120px)",
            overflowX: "auto",
          }}>
          {data.board.lists.map((list, index) => (
            <ListCard
              list={list}
              key={`list_card_index_${index}`}
              index={index}
            />
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default Board;
