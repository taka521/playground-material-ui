import { Book } from "../../type/Book";
import { useState } from "react";

export type UseFetchBooksResult = {
  data?: Book[];
  loading: boolean;
  error?: Error;
}

export const books = [
  Book.of("9784877834869", "やさしいGo言語入門", 2400),
  Book.of("9784873118468", "Go言語による並行処理", 2800),
  Book.of("9784297107277", "みんなのGo言語", 2180),
  Book.of("9784873118222", "Go言語でつくるインタプリタ", 3400),
  Book.of("9784873119045", "プログラミングTypeScript", 3400),
  Book.of("9784839969370", "実践TypeScript", 3450),
]

export function useFetchBooks(): UseFetchBooksResult {
  return { data: books, loading: false }
}
