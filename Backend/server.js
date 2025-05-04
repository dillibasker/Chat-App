require("dotenv").config();
const express = require("express");
const http = require("http");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const messageRoutes = require("./routes/messageRoutes");
const contactRoutes = require("./routes/contactRoutes");
const socketHandler = require("./socket");

const app = express();
const server = http.createServer(app);
socketHandler(server);
connectDB();

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/contacts", contactRoutes);

server.listen(5000, () => console.log("Server running on port 5000"));