import React from "react";
import { Container } from "semantic-ui-react";
import { Draggable } from "react-beautiful-dnd";
import { makeStyles } from "@material-ui/core/styles";
import ListItemDelete from "./ListItemDelete";

const useStyles = makeStyles({
  containerHover: {
    "& > span": {
      opacity: "0",
    },
    "&:hover > span": {
      opacity: "unset",
      transition: "all 0.5s",
    },
  },
});

const ListItemDiv = ({ listItem, index, teamID }) => {
  const { id, name } = listItem;
  const classes = useStyles();
  return (
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
              display: "flex",
              justifyContent: "space-between",
              padding: "7px 7px",
              margin: "5px",
              backgroundColor: "rgba(255,255,255 ,1)",
              borderRadius: "5px",
              boxShadow: "0 1px rgba(50,50,50, 0.6)",
            }}
            className={classes.containerHover}>
            {name}
            <span>
              <ListItemDelete teamID={teamID} listItem={listItem} />
            </span>
          </Container>
        </div>
      )}
    </Draggable>
  );
};

export default ListItemDiv;
