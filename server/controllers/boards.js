const Board = require("../models/board");
const TaskList = require("../models/task");
const Card = require("../models/card");
const distiler = require("../utils/distiler");
const keyGenerator = require("../utils/keyGenerator");
const gen = new keyGenerator();

// Get the board with accessKey
// In mongosh: db.Board.aggregate({$lookup: {from: "Task", localField: "_id", foreignField: "board", as: "tasks"}})
module.exports.get = async (req, res) => {
  const { id } = req.params;
  await Board.findOne({ accessKey: id })
    .populate({
      path: "tasks",
      populate: { path: "board", select: "name cards" },
    })
    .populate({
      path: "cards",
      populate: { path: "board", select: "name" },
    })
    .then((query) => {
      const distilledQuery = distiler(query);
      res.status(200).json(distilledQuery);
    })
    .catch((error) => {
      console.error(error);
      return res.status(404).json({ message: "Board is not available!" });
    });
};

// Create a new blank kanban board
module.exports.create = async (req, res) => {
  const key = gen.createKey(10);
  const { name } = req.body;
  if (!name) {
    res.status(400).json({ message: "Board name is missing!" });
  }

  let board = new Board({ name, accessKey: key });
  const db = await board.save();

  await TaskList.insertMany([
    { name: "Backlog", board: db._id },
    { name: "To Do", board: db._id },
    { name: "In Progress", board: db._id },
    { name: "Done", board: db._id },
  ]);

  Board.findById(board._id)
    .populate({
      path: "tasks",
      populate: { path: "board", select: "name cards" },
    })
    .populate({
      path: "cards",
      populate: { path: "board", select: "name" },
    })
    .then((query) => {
      const distilledQuery = distiler(query);
      res.status(201).json({ message: "Board is created.", data: distilledQuery });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Kanban board could not be created!",
      });
    });
};
