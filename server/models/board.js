const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BoardSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  accessKey: {
    type: String,
    required: true
  }
})

// Need to use virtual populate since we don't store 'cards' in board collection
BoardSchema.virtual('cards', {
  ref: 'Card',
  localField: '_id',
  foreignField: 'board'
})

// Need to use virtual populate since we don't store 'tasks' in board collection
BoardSchema.virtual('tasks', {
  ref: "Task",
  localField: "_id",
  foreignField: "board"
})

module.exports = mongoose.model("Board", BoardSchema, "Board");