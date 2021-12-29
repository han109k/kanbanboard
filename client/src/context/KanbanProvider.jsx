import React, { useState, useContext } from "react";

const KanbanContext = React.createContext();

const defaultAppState = {
  name: "default data",
  _id: "0",
  accessKey: "",
  taskList: {},
  cards: {},
  taskListOrder: [],
};

function KanbanProvider({ children }) {
  const [board, setBoard] = useState(defaultAppState);

  return (
    <KanbanContext.Provider value={{ board, setBoard }}>
      {children}
    </KanbanContext.Provider>
  );
}

export const useGlobalContext = () => {
  return useContext(KanbanContext);
};

export { KanbanProvider };
