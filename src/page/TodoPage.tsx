import * as React from "react";
import {
  Grid,
  TableContainer,
  Paper,
  TableCell,
  TableRow,
  TableHead,
  Table,
  TableBody,
  Checkbox,
  CircularProgress,
  Typography,
} from "@material-ui/core";
import { useFetchTodos } from "../domain/hooks/useFetchTodos";
import {
  Draggable,
  DragDropContext,
  DropResult,
  ResponderProvided,
  Droppable,
} from "react-beautiful-dnd";
import { Todos } from "../domain/type/Todo";
import dayjs from "dayjs";

function dateFormat(date: Date): string {
  return dayjs(date).format("YYYY/MM/DD HH:mm:ss");
}

function DraggableComponent(id: string, index: number): React.FC {
  return ({ children }) => (
    <Draggable draggableId={id} index={index}>
      {(provided, snapshot) => (
        <TableRow
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={provided.draggableProps.style}
        >
          {children}
        </TableRow>
      )}
    </Draggable>
  );
}

type OnDragEnd = (result: DropResult, provided: ResponderProvided) => void;
function DroppableComponent(onDragEnd: OnDragEnd): React.FC {
  return (props) => (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="1" direction="vertical">
        {(provided) => {
          return (
            <TableBody
              ref={provided.innerRef}
              {...provided.droppableProps}
              {...props}
            >
              {props.children}
              {provided.placeholder}
            </TableBody>
          );
        }}
      </Droppable>
    </DragDropContext>
  );
}

function reorder(todos: Todos, start: number, end: number): Todos {
  const result = [...todos];
  const [removed] = result.splice(start, 1);
  result.splice(end, 0, removed);
  return result;
}

export const TodoPage: React.FC = () => {
  const [todos, setTodos] = React.useState<Todos>([]);
  const { loading } = useFetchTodos({
    onComplete: (data) => setTodos(() => [...data]),
  });

  const onDragEnd: OnDragEnd = (result, provided) => {
    if (!result.destination) return;
    if (result.source.index === result.destination.index) return;

    const items = reorder(todos, result.source.index, result.destination.index);
    setTodos(() => items);
  };

  if (loading) return <CircularProgress />;

  return (
    <Grid container spacing={3} direction="column">
      <Grid item xs>
        <Typography variant="h5">Material UI × react-beautiful-dnd</Typography>
      </Grid>
      <Grid item>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell width="50%">タイトル</TableCell>
                <TableCell width="20%">完了</TableCell>
                <TableCell width="30%">登録日時</TableCell>
              </TableRow>
            </TableHead>
            <TableBody component={DroppableComponent(onDragEnd)}>
              {todos.map((todo, index) => (
                <TableRow
                  component={DraggableComponent(todo.id, index)}
                  key={todo.id}
                >
                  <TableCell width="50%">{todo.title}</TableCell>
                  <TableCell width="20%">
                    <Checkbox checked={todo.done} />
                  </TableCell>
                  <TableCell width="30%">
                    {dateFormat(todo.createdAt)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};
