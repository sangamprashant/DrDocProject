const dotenv = require('dotenv');
dotenv.config();
const express = require("express");
const app = express();
const PORT = 5000;

const http = require("http").createServer(app); // Use http module instead of app directly
const io = require("socket.io")(http); // Initialize Socket.IO with the http server

const mongoose = require("mongoose");

const cors = require("cors");
const path = require("path");

app.use(cors());
app.use(express.json());

require("./models/model");
require("./models/post");
require("./models/chat");
require("./models/product");
require("./models/cart");
require("./models/order");
app.use(require("./routes/auth"));
app.use(require("./routes/createpost"));
app.use(require("./routes/chat"));
app.use(require("./routes/product"));

mongoose.connect(process.env.MONGO_URL);
mongoose.connection.on("connected", () => {
  console.log("Connected to mongo");
});
mongoose.connection.on("error", () => {
  console.log("Failed to connect to mongo");
});

// Serve the frontend
app.use(express.static(path.join(__dirname, "drdoc/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "drdoc/build/index.html"), function (err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});

io.on("connection", (socket) => {
  let onlineUsers = new Map(); // Define a local map for online users

  socket.on("addUser", (id) => {
    onlineUsers.set(id, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.receiver);
    if (sendUserSocket) {
      io.to(sendUserSocket).emit("msg-receive", data.content);
    } else {
      console.log(`Recipient ${data.receiver} is not currently online.`);
      // Handle the case where the recipient is not currently online
    }
  });
});

http.listen(PORT, () => {
  console.log("Server is listening on " + PORT);
});
