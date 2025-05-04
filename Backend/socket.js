const { Server } = require("socket.io");
const Message = require("./models/Message");
const socketHandler = (server) => {
    const io = new Server(server, { cors: { origin: "*" } });
    io.on("connection", (socket) => {
      socket.on("join", (userId) => socket.join(userId));
  
      socket.on("private_message", async ({ from, to, content }) => {
        const message = new Message({ sender: from, receiver: to, content });
        await message.save();
        io.to(to).emit("private_message", message);
      });
    });
  };
  module.exports = socketHandler;
  
  