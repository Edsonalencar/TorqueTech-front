import { Draggable } from "@hello-pangea/dnd";
import React from "react";
import { BoardCard } from "../BoardCard";
import { BoardCardType } from "../BoardCard/interfaces";

interface Props {
  item: BoardCardType;
  index: number;
}

export const BoardItem: React.FC<Props> = ({ index, item }) => {
  return (
    <Draggable draggableId={item.key + "_" + index} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
        >
          <BoardCard
            key={item.key}
            title={item.title}
            description={item.description}
            value={item.value}
            icon={item.icon}
          />
        </div>
      )}
    </Draggable>
  );
};
