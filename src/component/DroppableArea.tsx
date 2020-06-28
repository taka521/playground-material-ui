import * as React from "react";
import { Droppable } from "react-beautiful-dnd";
import { List } from "@material-ui/core";
import { DraggableItem } from "./DraggableItem";
import { Book } from "../domain/type/Book";
import { Item } from "./type/Item";

export type DroppableAreaProps = {
  droppableId: string;
  books: ReadonlyArray<Item<Book>>;
  isDropDisabled?: boolean;
  itemFixed?: boolean;
};

/**
 * ドロップ可能エリア
 *
 * @param props
 */
export const DroppableArea: React.FC<DroppableAreaProps> = (props) => (
  <Droppable
    droppableId={props.droppableId}
    isDropDisabled={props.isDropDisabled}
  >
    {(provided, snapshot) => (
      <List
        ref={provided.innerRef}
        {...provided.droppableProps}
        style={{
          height: "100%",
          backgroundColor: "rgba(255, 255, 255, 0.7)",
          margin: 5,
        }}
      >
        {props.books.length
          ? props.books.map((book, index) => (
              <DraggableItem
                key={book.id}
                index={index}
                item={book}
                fixed={props.itemFixed}
              />
            ))
          : !provided.placeholder && <p>Drop items here</p>}
        {provided.placeholder}
      </List>
    )}
  </Droppable>
);
