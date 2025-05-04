const express = require("express");
const User = require("../models/User");
const router = express.Router();

router.post("/add", async (req, res) => {
  const { userId, contact } = req.body;
  const user = await User.findById(userId);
  user.contacts.push(contact);
  await user.save();
  res.json(user.contacts);
});

router.get("/:userId", async (req, res) => {
  const user = await User.findById(req.params.userId);
  res.json(user.contacts);
});

module.exports = router;
