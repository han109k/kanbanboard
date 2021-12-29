import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import 'react-toastify/dist/ReactToastify.min.css';
import App from "./App";
import { KanbanProvider } from "./context/KanbanProvider";

ReactDOM.render(
  <React.StrictMode>
    <KanbanProvider>
      <App />
    </KanbanProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
