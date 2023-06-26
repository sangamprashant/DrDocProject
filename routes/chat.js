const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const requirelogin = require("../middleware/requirelogin");
const USER = mongoose.model("DRDOCUSER");
const CHAT = mongoose.model("DRDOCCHAT");

// Send a message to the receiver
router.post("/api/message/send", requirelogin, async (req, res) => {
  const senderId = req.user._id; // Get the sender ID from the requireLogin middleware
  const receiverId = req.body.receiverId; // Get the receiver ID from the request body
  const content = req.body.content;
console.log(content);
  try {
    if(!content){
      res.status(500).json({ error: "Please write a message." });
    }
    if(!receiverId){
      res.status(500).json({ error: "Please check user." });
    }
    // Find the existing conversation between the sender and receiver
    let conversation = await CHAT.findOne({
      participants: {
        $all: [senderId, receiverId],
      },
    });

    // If the conversation doesn't exist, create a new one
    if (!conversation) {
      conversation = new CHAT({
        participants: [senderId, receiverId],
        messages: [],
      });
    }

    // Add the new message to the conversation
    conversation.messages.push({
      sender: senderId,
      content:content,
    });

    // Save the updated conversation
    await conversation.save();

    res.status(201).json({ message: "Message sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to send message.." });
  }
});

// Get the list of receivers
router.get("/api/message/receivers", requirelogin, async (req, res) => {
  const senderId = req.user._id; // Get the sender ID from the requireLogin middleware

  try {
    // Find the conversations where the sender is a participant
    const conversations = await CHAT.find({
      participants: senderId,
    });

    // Extract unique receiver IDs from the conversations
    const receiverIds = new Set();
    conversations.forEach((conversation) => {
      if (conversation.participants && conversation.participants.length > 0) {
        conversation.participants.forEach((participantId) => {
          if (participantId && participantId.toString() !== senderId.toString()) {
            receiverIds.add(participantId);
          }
        });
      }
    });
    // Find the receivers based on the extracted receiver IDs
    const receivers = await USER.find({
      _id: { $in: Array.from(receiverIds) },
    });

    res.json(receivers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});


// Get messages between a sender and receiver
router.get("/api/message/:senderId/:receiverId", requirelogin, async (req, res) => {
  const senderId = req.params.senderId;
  const receiverId = req.params.receiverId;

  try {
    // Find the conversation between the sender and receiver
    const conversation = await CHAT.findOne({
      participants: {
        $all: [senderId, receiverId],
      },
    });

    if (!conversation) {
      return res.status(404).json({ error: "Conversation not found" });
    }

    // Retrieve the messages from the conversation
    const messages = conversation.messages;

    res.json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch messages" });
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

module.exports = router