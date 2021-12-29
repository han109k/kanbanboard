const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CardSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false,
    default: null
  },
  color: {
    type: String,
    required: false,
    default: null
  },
  task: {
    type: Schema.Types.ObjectId,
    ref: "Task"
  },
  board: {
    type: Schema.Types.ObjectId,
    ref: "Board"
  }
})

module.exports = mongoose.model("Card", CardSchema, "Card");