import { DraggableLocation } from "react-beautiful-dnd";
import { v4 } from 'uuid';
import { Item } from "../component/type/Item";


export function reorder<T>(list: Item<T>[], startIndex: number, endIndex: number): Item<T>[] {
  const result = [...list];
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
}

export type CopyFunction<T> = (item: Item<T>) => Item<T>
export function copy<T>(source: Item<T>[], destination: Item<T>[], droppableSource: DraggableLocation, droppableDestination: DraggableLocation, copyFn?: CopyFunction<T>): Item<T>[] {
  const sourceClone = [...source];
  const destClone = [...destination];
  const item = sourceClone[droppableSource.index];

  const copyItem = copyFn?.({ ...item }) ?? item;
  destClone.splice(droppableDestination.index, 0, { ...copyItem, id: v4() });
  return destClone;
}

export function move<T>(source: Item<T>[], destination: Item<T>[], droppableSource: DraggableLocation, droppableDestination: DraggableLocation) {
  const sourceClone = [...source];
  const destClone = [...destination];
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  return { source: sourceClone, destination: destClone };
}
