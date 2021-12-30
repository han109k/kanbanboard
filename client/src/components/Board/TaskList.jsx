import React, { useState } from "react";
import { Droppable } from "react-beautiful-dnd";
import tw from "tailwind-styled-components/dist/tailwind";

// Api caller
import apiCaller from "../../api/apiCaller";

// Components
import Card from "./Card";

// Icons
import { FaPlus } from "react-icons/fa";
import { useGlobalContext } from "../../context/KanbanProvider";

// Styled components
const TaskListContainer = tw.div`
  w-full
  lg:w-1/4
  m-2
  border
  rounded-lg
  border-[#757575]
  lg:h-[400px]
  min-w-[200px]
  max-w-[300px]
  overflow-x-auto
  bg-[#424242]
`;

const Title = tw.h3`
  text-2xl
  font-extrabold
  pt-4
  pl-6
  mb-4
`;
const CardList = tw.div`
  grow
  p-2
  max-h-[200px]
  touch-none
  ${(props) =>
    props.$isDraggingOver ? "transition bg-[#9E9E9E] duration-300" : "white"};
`;

function TaskList({ taskId, name, cards, fetchBoard, loading }) {
  const [showForm, setShowForm] = useState(false);

  return (
    <TaskListContainer>
      <div className="flex justify-between">
        <Title>{name}</Title>
        <button onClick={() => setShowForm(!showForm)}>
          <FaPlus size={12} className="mt-4 mr-4" />
        </button>
      </div>
      <Droppable droppableId={taskId}>
        {(provided, snapshot) => (
          <CardList
            {...provided.droppableProps}
            ref={provided.innerRef}
            $isDraggingOver={snapshot.isDraggingOver}
          >
            {showForm && (
              <CardForm
                setShowForm={setShowForm}
                taskId={taskId}
                fetchBoard={fetchBoard}
              />
            )}
            {cards.map((card, index) => (
              <Card key={card._id} index={index} taskId={taskId} fetchBoard={fetchBoard} {...card} />
            ))}
            {provided.placeholder}
          </CardList>
        )}
      </Droppable>
    </TaskListContainer>
  );
}

// React component for adding a new card to a list
function CardForm({ setShowForm, taskId, fetchBoard }) {
  const { board, setBoard } = useGlobalContext();
  const req = {};
  const [card, setCard] = useState({
    title: "",
    description: "",
    color: "#333333",
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setCard({ ...card, [name]: value });
  };

  const addCard = (e) => {
    e.preventDefault();
    req["boardId"] = board._id;
    req["taskId"] = taskId;
    req["card"] = card;

    apiCaller
      .post(`/${board.accessKey}/cards`, req)
      .then((res) => {
        // console.log(res.data);
        fetchBoard();
        setShowForm(false);
      })
      .catch((error) => {
        // console.log(error);
        // console.log(error.reponse.data.message);
      });
  };

  return (
    <div className="flex justify-center mb-2">
      <form action="" className="flex flex-col">
        <input
          type="text"
          name="title"
          id="title"
          value={card.title}
          onChange={handleChange}
          maxLength="24"
          placeholder="Enter a title"
          className="text-xs rounded-md border border-[#757575] bg-[#212121] mb-1 pl-2"
          autoFocus
        />
        <textarea
          name="description"
          id=""
          cols="30"
          rows="2"
          maxLength="80"
          value={card.description}
          onChange={handleChange}
          placeholder="Enter a description"
          className="text-xs rounded-md border border-[#757575] w-full bg-[#212121] pl-2"
        ></textarea>
        <div className="flex my-1 justify-end">
          <div className="mr-auto ml-2">
            <span className="text-xs">Card Color</span>
            <input
              type="color"
              name="color"
              value={card.color}
              onChange={handleChange}
              className="ml-1 h-[12px] w-[12px]"
            />
          </div>
          <button
            className="border rounded-lg text-xs bg-[#2E7D32] border-[#757575] disabled:opacity-50 px-3 mx-2"
            onClick={addCard}
            disabled={card.title ? false : true}
          >
            Add
          </button>

          <button
            className="border rounded-lg text-xs border-[#757575] px-2 mr-1"
            onClick={() => setShowForm(false)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default TaskList;
