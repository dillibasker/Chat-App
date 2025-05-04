const Message = require("../models/Message");
exports.getMessages = async (req, res) => {
  const { sender, receiver } = req.query;
  const messages = await Message.find({
    $or: [
      { sender, receiver },
      { sender: receiver, receiver: sender },
    ],
  });
  res.json(messages);
};
