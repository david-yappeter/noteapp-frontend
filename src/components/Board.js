import { Icon, Menu, Card, Container, Grid } from "semantic-ui-react";
import React, { useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import { useCookies } from "react-cookie";
import { BOARD_BY_ID } from "./graphql/index";
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

  const ListItemDiv = ({ listItem: { id, name }, index }) => (
    <Draggable draggableId={id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={getItemStyle(
            snapshot.isDragging,
            provided.draggableProps.style
          )}>
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

  const grid = 0;
  const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: grid * 2,
    // margin: `0 0 ${grid}px 0`,

    // change background colour if dragging
    background: isDragging ? "lightgreen" : "grey",

    // styles we need to apply on draggables
    ...draggableStyle,
  });

  const getListStyle = (isDraggingOver) => ({
    background: isDraggingOver ? "lightblue" : "lightgrey",
    padding: grid,
    width: 250,
  });

  const ListCard = ({ list: { name, list_items, index } }) => (
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
        <Droppable droppableId={`testing${index}`}>
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}>
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

  // a little function to help us with reordering the result
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(
      this.state.items,
      result.source.index,
      result.destination.index
    );

    this.setState({
      items,
    });
  };

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
