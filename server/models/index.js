const mongoose = require("mongoose");
const Board = require("./board");
const TaskList = require("./task");
const Card = require("./card");

mongoose
  .connect("mongodb://localhost:27017/kanbanboard")
  .then(() => {
    console.log("Connected to mongoDB");
  })
  .catch((error) => console.log("Error occured @mongoose.connect()"));

mongoose.set("toJSON", { virtuals: true });

const roadmap = new Board({ name: "RoadMap" });

const addToBoard = async () => {
  const todo = new TaskList({ name: "ToDo" });
  const card = new Card({ title: "Bookmarking", position: 0 });
  card.task = todo;
  card.board = roadmap;
  roadmap.tasks.push(todo);
  todo.board = roadmap;
  await card.save();
  await todo.save();
  await roadmap.save();
};

addToBoard();

// const find = async () => {
//   let q = await Board.findOne().populate("tasks").populate("cards");
//   console.log(q.toJSON());
// };

// find();
