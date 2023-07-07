const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const requirelogin = require("../middleware/requirelogin");
const POST = mongoose.model("DRDOCPOST");
const USER = mongoose.model("DRDOCUSER");
const MESSAGE = mongoose.model("DRDOCMESSAGE");

//all doctor getting
router.get("/message/doctor", (req, res) => {
  USER.find({ account: "doctor" }, function (err, user) {
    if (err) {
      res.send("something went wrong");
      next();
    }
    res.json(user);
  });
});
//all doctor getting
router.get("/message/regular", (req, res) => {
  USER.find({ account: "regular" }, function (err, user) {
    if (err) {
      res.send("something went wrong");
      next();
    }
    res.json(user);
  });
});
//creatte message
router.post("/message/send", requirelogin, (req, res) => {
  const { from, to, message } = req.body;
  if (!message) {
    return res.status(422).json({ error: "Please add a message" });
  }

  const newMessage = MESSAGE.create({
    message: message,
    Chatuser: [from, to],
    Sender: from,
  })
    .then((result) => {
      return res.json({ newMessage: result });
    })
    .catch((err) => console.log(err));
});

//creatte message
router.get("/message/:user1id/:user2id", async (req, res) => {
  try {
    const from = req.params.user1id;
    const to = req.params.user2id;
    const newMessage = await MESSAGE.find({
      Chatuser: {
        $all: [from, to],
      },
    }).sort({ updatedAt: 1 });

    const allmessage = newMessage.map((msg) => {
      const date = new Date(msg.updatedAt);
      const formattedDate = date.toLocaleDateString(undefined, {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });
      const formattedTime = date.toLocaleTimeString(undefined, {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });

      return {
        _id: msg._id,
        myself: msg.Sender.toString() == from,
        message: msg.message,
        time: `${formattedDate} ${formattedTime}`,
      };
    });

    return res.status(200).json(allmessage);
  } catch (error) {
    return res.status(500).status("Internal server error");
  }
});

// Search users by name and account type
router.get("/message/search/:account/:name", async (req, res) => {
  try {
    const name = req.params.name;
    const account = req.params.account;
    const users = await USER.find({
      account: account, // Change to the appropriate account type if needed
      name: { $regex: name, $options: "i" }, // Case-insensitive search using regular expression
    });

    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});
// DELETE /api/message/:messageId
router.delete("/api/message/delete/:messageId", async (req, res) => {
  try {
    const messageId = req.params.messageId;

    // Find the message by its ID
    const message = await MESSAGE.findById(messageId);

    // If the message doesn't exist, return an error response
    if (!message) {
      return res.status(404).json({ error: "Message not found" });
    }
    await message.remove();

    res.json({ message: "Message deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
