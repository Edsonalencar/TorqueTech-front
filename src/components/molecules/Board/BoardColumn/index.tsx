import { Col, Flex } from "antd";
import { Droppable } from "@hello-pangea/dnd";
import { BoardItem } from "../BoardItem";
import { BoardColumnType } from "./interfaces";
import React from "react";
import { BoardCardType } from "../BoardCard/interfaces";
import { formatCurrency } from "@/utils/formaters/formatCurrency";

interface ColumnProps {
  col: BoardColumnType;
  index: number;
}

export const BoardColumn: React.FC<ColumnProps> = ({
  col: { items, title, key },
  index,
}) => {
  const calcItemsValue = (items: BoardCardType[]) => {
    return items.reduce((acc, item) => acc + (item.value ?? 0), 0);
  };

  return (
    <Droppable droppableId={key + "_" + index}>
      {(provided) => (
        <Col span={6}>
          <Flex vertical gap={10}>
            <Flex vertical>
              <h2 className=" font-semibold">{title}</h2>
              <Flex gap={8} className=" text-sm">
                <p>{items.length}</p> <span>-</span>
                <p>{formatCurrency(calcItemsValue(items))}</p>
              </Flex>
            </Flex>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                minHeight: "120px",
                gap: "8px",
              }}
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {items.map((item, index) => (
                <BoardItem
                  key={`${item.key}_${index}`}
                  item={item}
                  index={index}
                />
              ))}
              {provided.placeholder}
            </div>
          </Flex>
        </Col>
      )}
    </Droppable>
  );
};
