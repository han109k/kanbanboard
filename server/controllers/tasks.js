const Board = require("../models/board");
const TaskList = require("../models/task");
const Card = require("../models/card");

// Update a single tasklist (card moved within the same task list)
module.exports.updateTask = async (req, res) => {
  const {
    _id: taskId,
    board: { _id: boardId },
    cards,
  } = req.body;

  const board = await Board.findById(boardId);
  const task = await TaskList.findById(taskId);
  if (!board || !task) {
    res.status(404).json({ message: "Board or TaskList does not exist!" });
  } else {
    task.cards = cards;
    await task.save();
    res.status(200).json({ message: "Task list updated." });
  }
};

// Update tasklists source & destination
module.exports.updateTasks = async (req, res) => {
  const { source, destination } = req.body;

  const { _id: sourceTaskId, cards: srcCards } = source;
  const { _id: destinationTaskId, cards: dstCards } = destination;

  const sourceTask = await TaskList.findById(sourceTaskId);
  const destinationTask = await TaskList.findById(destinationTaskId);
  // Update cards' tasklist ids with destination tasklist's id
  dstCards.map(async (card) => {
    await Card.findByIdAndUpdate(card, { task: destinationTaskId });
  });
  // update tasklists card ids
  sourceTask.cards = srcCards;
  destinationTask.cards = dstCards;

  await sourceTask.save();
  await destinationTask.save();

  res.status(201).json({ message: "Tasks updated!" });
};
