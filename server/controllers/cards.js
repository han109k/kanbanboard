const Board = require("../models/board");
const TaskList = require("../models/task");
const Card = require("../models/card");

module.exports.create = async (req, res) => {
  console.log(req.body);
  const { boardId, taskId, card } = req.body;
  const board = await Board.findById(boardId);
  const task = await TaskList.findById(taskId);
  if (!board || !task) {
    res.type("application/json");
    res.status(404).json({ message: "Board or TaskList does not exist!" });
  } else {
    let newCard = new Card({ ...card, board: board._id, task: task._id });
    task.cards.push(newCard);
    await newCard.save();
    await task.save();
    res
      .type("application/json")
      .status(201)
      .json({ message: "Card added to the board." });
  }
};

module.exports.edit = async (req, res) => {
  const { accessKey, cards } = req.body;
  const board = await Board.findOne({ accessKey });
  console.log(board);
  if (!board) {
    res.type("application/json");
    res.status(404).json({ message: "Board is not available! Could not edited!" });
  } else {
    // cards.map((card) => {
    //   let newCard = new Card({...card, board: board._id});
    //   await newCard.save();
    // });

    res.status(200).json({ message: "OK" });
  }

  // await board.save();
  // res.redirect(`/${board._id}`);
};

module.exports.delete = async (req, res) => {
  const { _id, taskId } = req.body;
  // Deleting from task list
  await TaskList.findByIdAndUpdate(taskId, { $pull: { cards: _id } });
  // Deleting card itself
  await Card.findByIdAndDelete(_id);

  res.status(200).json({ message: "Delete the card" });
};
