import { Todo, Todos } from '../type/Todo'
import { useState } from 'react'
import { fetchTodos } from './todos';
import { useEffectOnce } from 'react-use'

export type UseFetchTodosParams = {
  onComplete?: (data: Todo[]) => void;
}

export type UseFetchTodosResult = {
  data?: Todo[];
  loading: boolean;
  error?: Error;
}

export function useFetchTodos(param?: UseFetchTodosParams): UseFetchTodosResult {
  const [loading, toggle] = useState(false);
  const [data, setData] = useState<Todos>();
  const [error, setError] = useState<Error>();

  useEffectOnce(() => {
    toggle(() => true);
    console.log(fetchTodos)
    fetchTodos()
      .then(result => {
        setData(() => result);
        param?.onComplete?.(result);
      })
      .catch(err => setError(() => err))
      .finally(() => toggle(() => false))
  })

  return { data, loading, error }
}
