import { Todo, Todos } from '../type/Todo'
import { useState, useEffect } from 'react'
import { fetchTodos } from './todos';

export type UseFetchTodosResult = {
  data?: Todo[];
  loading: boolean;
  error?: Error;
}

export function useFetchTodos(): UseFetchTodosResult {
  const [loading, toggle] = useState(false);
  const [data, setData] = useState<Todos>();
  const [error, setError] = useState<Error>();

  useEffect(() => {
    toggle(() => true);
    console.log(fetchTodos)
    fetchTodos()
      .then(result => setData(() => result))
      .catch(err => setError(() => err))
      .finally(() => toggle(() => false))
  }, [])

  return { data, loading, error }
}
