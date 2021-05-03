import { Menu } from "semantic-ui-react";
import React, { useEffect } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import { useCookies } from "react-cookie";
import { BOARD_BY_ID, LIST_ITEM_MOVE } from "./graphql/index";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import HeaderComponent from "./HeaderComponent";
import BackgroundImage from "./BackgroundImage";
import ListCard from "./ListCard";
import NewListCard from "./NewListCard";

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
  const [updateList, { updateListL }] = useMutation(LIST_ITEM_MOVE, {
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
      },
    ],
  });

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
    if (
      result.destination.index === result.source.index &&
      result.destination.droppableId === result.source.droppableId
    ) {
      return;
    }
    console.log(result);
    updateList({
      variables: {
        id: result.draggableId,
        listID: result.destination.droppableId,
        index: result.destination.index,
      },
    });
  };

  return (
    <>
      <BackgroundImage />
      <HeaderComponent />
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
                loading={updateListL}
                teamID={data.board.team_id}
                list={list}
                key={`list_card_index_${index}`}
                index={index}
              />
            ))}
            <NewListCard board={data.board} />
          </div>
        </DragDropContext>
      </div>
    </>
  );
};

export default Board;
