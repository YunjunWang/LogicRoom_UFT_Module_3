import React, { useState } from "react";
import ReactDOM from "react-dom";
import BooksPresenter from "./Books/BooksPresenter.js";

import "./styles.css";

function App() {
  const booksPresenter = new BooksPresenter();
  const [stateViewModel, copyViewModelToStateViewModel] = useState([]);

  React.useEffect(() => {
    async function load() {
      await booksPresenter.load(viewModel => {
        copyViewModelToStateViewModel(viewModel);
      });
    }
    load();
  }, []);

  return (
    <div>
      <h2>Books</h2>
      {stateViewModel.map((book, i) => {
        return <div key={i}>{book.name}</div>;
      })}
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
