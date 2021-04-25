import React, { useState } from "react";
import { Droppable, DragDropContext, Draggable } from "react-beautiful-dnd";

const items = [
  {
    id: "1",
    name: "asd",
  },
  {
    id: "2",
    name: "qweqwe",
  },
  {
    id: "3",
    name: "akgids",
  },
  {
    id: "4",
    name: "agkiodskgf",
  },
];

const Test = () => {
  const [temp] = useState(items);
  return (
    <DragDropContext onDropEnd={(result) => console.log(result)}>
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={{
              backgroundColor: snapshot.isDraggingOver ? "red" : "blue",
              width: "500px",
              padding: "50px",
            }}
          >
            {temp.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{
                      userSelect: "none",
                      backgroundColor: snapshot.isDraggingOver
                        ? "green"
                        : "white",
                      width: "50%",
                      padding: "10px",
                      margin: "10px",
                      border: "1px solid black",
                      ...provided.draggableProps.style,
                    }}
                    // style={getItemStyle(
                    //   snapshot.isDragging,
                    //   provided.draggableProps.style
                    // )}
                  >
                    {item.name}
                  </div>
                )}
              </Draggable>
            ))}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default Test;
