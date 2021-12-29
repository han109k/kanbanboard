import { useState, useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { useNavigate, useParams } from "react-router-dom";
import tw from "tailwind-styled-components/dist/tailwind";
import { useGlobalContext } from "../../context/KanbanProvider";

import apiCaller from "../../api/apiCaller";

// Components
import TaskList from "./TaskList";
import Header from "../Header";

const Container = tw.div`
  flex
  justify-center
  items-center
  my-auto
  md:mx-20
  lg:flex-row
  mx-14
  flex-col
`;

const Board = () => {
  const navigate = useNavigate();
  const { board, setBoard } = useGlobalContext();
  const { accessKey } = useParams();

  // Get board with access key
  const fetchBoard = () => {
    apiCaller
      .get(`/${accessKey}`)
      .then((res) => {
        // console.log("@useEffect", res.data);
        setBoard(res.data);
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  };

  // Updates tasklist both UI and backend
  const updateTask = (task) => {
    apiCaller
      .patch(`/${accessKey}/tasks`, task)
      .then((res) => {
        console.log("@updateTask", res.data);
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });

    const newState = {
      ...board,
      taskList: {
        ...board.taskList,
        [task._id]: task,
      },
    };
    setBoard(newState);
  };

  const updateTasks = (tasks) => {
    apiCaller
      .put(`/${accessKey}/tasks`, tasks)
      .then((res) => {
        console.log("@updateTasks", res.data);
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
    const newState = {
      ...board,
      taskList: {
        ...board.taskList,
        [tasks.source.id]: tasks.source,
        [tasks.destination.id]: tasks.destination,
      },
    };

    setBoard(newState);
  };

  useEffect(() => {
    fetchBoard();
  }, []);

  const handleOnDragEnd = (result) => {
    // console.log("@handleOnDragEnd");
    const { destination, source, draggableId } = result;
    // console.log(destination, source, draggableId);

    // dropped outside of the list, do nothing
    if (!destination) return;

    // checking if location of dragged item has changed. if not do nothing
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    const startTask = board.taskList[source.droppableId];
    const finishTask = board.taskList[destination.droppableId];

    // Card is moved within the same tasklist
    if (startTask === finishTask) {
      const newCards = Array.from(startTask.cards);
      newCards.splice(source.index, 1);
      newCards.splice(destination.index, 0, draggableId);

      const newTaskList = {
        ...startTask,
        cards: newCards,
      };

      updateTask(newTaskList);

      return;
    }

    // Moving a card from one tasklist to another
    const startCardIds = Array.from(startTask.cards);
    startCardIds.splice(source.index, 1);
    const newStartTask = {
      ...startTask,
      cards: startCardIds,
    };

    const finishTaskIds = Array.from(finishTask.cards);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinishTask = {
      ...finishTask,
      cards: finishTaskIds,
    };

    // Building object; will be used as request for backend
    const tasks = {
      source: {},
      destination: {},
    };

    tasks.source = newStartTask;
    tasks.destination = newFinishTask;

    updateTasks(tasks);
  };

  if (board.accessKey) {
    return (
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Header name={board.name} />
        <Container>
          {board.taskListOrder.map((taskId) => {
            const task = board.taskList[taskId];
            const cards = task.cards.map((cardId) => board.cards[cardId]);
            return (
              <TaskList
                key={task._id}
                cards={cards}
                taskId={task._id}
                name={task.name}
                fetchBoard={fetchBoard}
              />
            );
          })}
        </Container>
      </DragDropContext>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <p className="text-4xl font-bold">Board's not available</p>
      <button
        className="bg-[#0277BD] rounded-lg font-light mt-5 py-3 px-4"
        onClick={() => navigate("/", { replace: true })}
      >
        Try something else?
      </button>
    </div>
  );
};

export default Board;
