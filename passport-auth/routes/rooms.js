const express = require("express");
const router = express.Router();
const Room = require("../models/Room");

router.get("/rooms/add", (req, res) => {
  res.render("rooms/add");
});

router.get("/rooms", (req, res, next) => {
  Room.find()
    .then(rooms => {
      res.render("rooms/list", { roomsList: rooms });
    })
    .catch(err => {
      next(err);
    });
});

router.post("/rooms", (req, res) => {
  //
});

router.get("/rooms/:roomId/delete");

module.exports = router;
