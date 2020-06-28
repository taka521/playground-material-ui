import * as React from "react";
import {
  DragDropContext,
  DropResult,
  ResponderProvided,
} from "react-beautiful-dnd";
import { Grid } from "@material-ui/core";
import { DroppableArea } from "../component/DroppableArea";
import { Item, toItem } from "../component/type/Item";
import { Book } from "../domain/type/Book";
import { copy, reorder, move } from "../util/dndUtil";

const BOOKS: Item<Book>[] = [
  toItem(Book.of("9784877834869", "やさしいGo言語入門", 2400)),
  toItem(Book.of("9784873118468", "Go言語による並行処理", 2800)),
  toItem(Book.of("9784297107277", "みんなのGo言語", 2180)),
  toItem(Book.of("9784873118222", "Go言語でつくるインタプリタ", 3400)),
  toItem(Book.of("9784873119045", "プログラミングTypeScript", 3400)),
  toItem(Book.of("9784839969370", "実践TypeScript", 3450)),
];

type BookStoreState = {
  books: Item<Book>[];
  cart: Item<Book>[];
};

export const BookStore: React.FC = () => {
  const [state, setState] = React.useState<BookStoreState>({
    books: [...BOOKS],
    cart: [],
  });

  const onDragEnd = (result: DropResult, provided: ResponderProvided) => {
    const { source, destination } = result;
    if (!destination) return;

    const sourceDroppableId = source.droppableId as keyof BookStoreState;
    const destDroppableId = destination.droppableId as keyof BookStoreState;

    switch (sourceDroppableId) {
      case destDroppableId:
        setState((prev) => ({
          ...prev,
          [destDroppableId]: reorder(
            prev[destDroppableId],
            source.index,
            destination.index
          ),
        }));
        break;
      case "books":
        setState((prev) => ({
          ...prev,
          cart: copy(BOOKS, prev.cart, source, destination),
        }));
        break;
      default:
        const moved = move(
          state[sourceDroppableId],
          state[destDroppableId],
          source,
          destination
        );
        setState((prev) => ({
          ...prev,
          [sourceDroppableId]: moved.source,
          [destDroppableId]: moved.destination,
        }));
        break;
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Grid container spacing={2}>
        <Grid item xs={3} style={{ backgroundColor: "gray", padding: 10 }}>
          <DroppableArea
            droppableId="books"
            books={state.books}
            isDropDisabled={true}
            itemFixed={true}
          />
        </Grid>
        <Grid item xs={9} style={{ backgroundColor: "orange", padding: 10 }}>
          <DroppableArea droppableId="cart" books={state.cart} />
        </Grid>
      </Grid>
    </DragDropContext>
  );
};
