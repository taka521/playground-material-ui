import { v4 } from 'uuid';
import dayjs from 'dayjs';

export type Todo = {
  id: string
  title: string
  done: boolean
  createdAt: Date
}

export type Todos = Todo[]

export const Todo = {
  new: (title: string): Todo => {
    return { id: v4(), title, done: false, createdAt: dayjs().toDate() }
  }
}
