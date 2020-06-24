import { Todo, Todos } from './../type/Todo'

let todos: Todos = [
  Todo.new('牛乳を買う'),
  Todo.new('歯医者に行く'),
  Todo.new('住民税の納税')
];

export function fetchTodos() {
  return new Promise<Todos>((resolve) => {
    setTimeout(() => resolve([...todos]), 1000);
  });
}

export function addTodo(todo: Todo) {
  return new Promise<void>(() => {
    setTimeout(() => todos.push({ ...todo }), 1000);
  });
}

export function updateTodo(todo: Todo) {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      todos = todos.map(t => {
        if (t.id !== todo.id) return t;
        return { ...todo }
      })
    }, 1000);
  });
}

export function removeTodo(id: string) {
  return new Promise<void>(() => {
    setTimeout(() => {
      todos = todos.filter(todo => todo.id !== id);
    }, 1000);
  });
}
