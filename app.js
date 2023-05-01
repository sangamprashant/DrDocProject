const express = require("express");
const app = express();
const PORT = 5000;

const socket = require("socket.io");
const server = app.listen(PORT, () => {
  console.log("Server is listening on " + PORT);
});

const mongoose = require("mongoose");
const { mongoUrl } = require("./key");

const cors = require("cors");
const path = require("path");

app.use(cors());
app.use(express.json());

require("./models/model");
require("./models/post");
require("./models/message");
require("./models/product");
require("./models/cart");
require("./models/order");
app.use(require("./routes/auth"));
app.use(require("./routes/createpost"));
app.use(require("./routes/Message"));
app.use(require("./routes/product"));

mongoose.connect(mongoUrl);
mongoose.connection.on("connected", () => {
  console.log("Connected to mongo");
});
mongoose.connection.on("error", () => {
  console.log("Failed to connect to mongo");
});

// serving the frontend
 app.use(express.static(path.join(__dirname, "./demo/build")));

const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

io.on("connection", (socket) => {
  let onlineUsers = new Map(); // define a local map for online users
  socket.on("addUser", (id) => {
    onlineUsers.set(id, socket.id);
  });
  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      io.to(sendUserSocket).emit("msg-receive", data.message);
    } else {
      console.log(`Recipient ${data.to} is not currently online.`);
      // handle the case where the recipient is not currently online
    }
  });
});