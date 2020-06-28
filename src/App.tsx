import React from "react";
import "./App.css";
import { TodoPage } from "./page/TodoPage";
import { BookStore } from "./page/BookStore";

function App() {
  return (
    <div className="App">
      <BookStore />
      {/* <TodoPage /> */}
    </div>
  );
}

export default App;
