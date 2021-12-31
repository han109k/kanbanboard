const express = require("express");
const router = express.Router();

// Controlller : boards
const boards = require("../controllers/boards");

router.route("/:accessKey").get(boards.get);

router.route("/").post(boards.create);

module.exports = router;
