const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "DRDOCPRODUCT",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
  },
});

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "DRDOCUSER",
    required: true,
  },
  items: [cartItemSchema],
  created: {
    type: Date,
    default: Date.now,
  },
});

mongoose.model("DRDOCCART", cartSchema);