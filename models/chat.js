const mongoose = require("mongoose");
const { Schema } = mongoose;

const messageSchema = new Schema(
  {
    participants: [
      {
        type: Schema.Types.ObjectId,
        ref: "DRDOCUSER",
      },
    ],
    messages: [
      {
        sender: {
          type: Schema.Types.ObjectId,
          ref: "DRDOCUSER",
        },
        receiver: {
          type: Schema.Types.ObjectId,
          ref: "DRDOCUSER",
        },
        content: {
          type: String,
          required: true,
        },
        timestamp: {
          type: Date,
          default: Date.now,
        },
        senderDeleted: {
          type: Boolean,
          default: false,
        },
        receiverDeleted: {
          type: Boolean,
          default: false,
        },
      },
    ],
  },
  { timestamps: true }
);

mongoose.model("DRDOCCHAT", messageSchema);
