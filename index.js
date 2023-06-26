const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const PORT = 5000;

const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const mongoose = require("mongoose");

const cors = require("cors");
const path = require("path");

// Enable CORS
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
  let onlineUsers = new Map();

  socket.on("addUser", (id) => {
    onlineUsers.set(id, socket.id);
    console.log(id);
    socket.join(id);
  });

  socket.on("send-msg", async (message) => {
    const receiverSocketId = onlineUsers.get(message.receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("message", message);
    } else {
      // Receiver is not online
      // Handle the scenario accordingly, e.g., store the message in the database
    }
  });
});

http.listen(PORT, () => {
  console.log("Server is listening on " + PORT);
});
