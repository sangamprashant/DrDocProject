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
  try {
    if (!content) {
      res.status(500).json({ error: "Please write a message." });
    }
    if (!receiverId) {
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
      content: content,
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
          if (
            participantId &&
            participantId.toString() !== senderId.toString()
          ) {
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
router.get(
  "/api/message/:senderId/:receiverId",
  requirelogin,
  async (req, res) => {
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

      // Retrieve the conversation ID
      const conversationId = conversation._id;

      // Retrieve the messages from the conversation
      const messages = conversation.messages;

      res.json({ conversationId, messages });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch messages" });
    }
  }
);
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
// Delete a message
router.delete(
  "/api/message/:conversationId/:messageId",
  requirelogin,
  async (req, res) => {
    const conversationId = req.params.conversationId;
    const messageId = req.params.messageId;

    try {
      // Find the conversation based on conversationId and ensure the logged-in user is a participant
      const conversation = await CHAT.findOne({
        _id: conversationId,
        participants: req.user._id,
      });

      if (!conversation) {
        return res.status(404).json({ error: "Conversation not found" });
      }

      // Find the message within the conversation
      const message = conversation.messages.find(
        (msg) => msg._id.toString() === messageId
      );

      if (!message) {
        return res.status(404).json({ error: "Message not found" });
      }

      // Ensure that the logged-in user is the sender of the message
      if (message.sender.toString() !== req.user._id.toString()) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      // Remove the message from the conversation
      conversation.messages.pull(message._id);

      // Save the updated conversation
      await conversation.save();

      res.status(200).json({ message: "Message deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to delete message" });
    }
  }
);

module.exports = router;
