const express = require("express");
const router = express.Router();
const Room = require("../models/Room");

router.get("/add", (req, res) => {
  res.render("rooms/add");
});

router.get("/", (req, res, next) => {
  Room.find()
    .then(rooms => {
      res.render("rooms/list", { roomsList: rooms });
    })
    .catch(err => {
      next(err);
    });
});

router.post("/", (req, res, next) => {
  if (!req.isAuthenticated()) {
    res.redirect("/");
    return;
  }

  Room.create({
    price: req.body.price,
    name: req.body.name,
    description: req.body.description,
    owner: req.user._id
  })
    .then(room => {
      console.log(room);
      res.redirect("/rooms");
    })
    .catch(err => {
      next(err);
    });
});

// deletes the room
router.get("/:roomId/", (req, res, next) => {
  const query = { _id: req.params.roomId };

  if (req.user.role !== "admin") {
    query.owner = req.user._id;
  }

  // if user.role !== 'admin'
  // query: { _id: req.params.roomId, owner: req.user._id }
  // else if user.role === 'admin'
  // query; { _id: req.params.roomId }

  Room.findOneAndDelete(query)
    .then(() => {
      res.redirect("/rooms");
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;
