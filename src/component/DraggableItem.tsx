import * as React from "react";
import { Draggable } from "react-beautiful-dnd";
import { ListItem, ListItemText } from "@material-ui/core";
import { Book } from "../domain/type/Book";
import { Item } from "./type/Item";

export type DraggableItemProps = {
  index: number;
  item: Item<Book>;
  fixed?: boolean;
};

/**
 * ドラッグ可能アイテム
 *
 * @param props
 */
export const DraggableItem: React.FC<DraggableItemProps> = ({
  index,
  item,
  fixed,
}) => (
  <Draggable draggableId={item.id} index={index}>
    {(provided, snapshot) => (
      <>
        <ListItem
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{
            ...provided.draggableProps.style,
            border: "solid 1px",
            backgroundColor: "white",
          }}
        >
          <ListItemText>{`${item.title}, ¥${item.price}`}</ListItemText>
        </ListItem>
        {fixed && snapshot.isDragging && (
          <ListItem
            style={{
              border: "solid 1px",
              display: "none !important",
              backgroundColor: "white",
            }}
          >
            <ListItemText>{`${item.title}, ¥${item.price}`}</ListItemText>
          </ListItem>
        )}
      </>
    )}
  </Draggable>
);
