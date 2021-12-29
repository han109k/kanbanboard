const express = require("express");
const router = express.Router();

// Controlller : cards
const cards = require("../controllers/cards");

router
  .route("/:id/cards")
  .post(cards.create)
  .put(cards.edit)
  .delete(cards.delete);

module.exports = router;
