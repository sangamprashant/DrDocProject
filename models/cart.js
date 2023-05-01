const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const cartSchema = new mongoose.Schema({
  user: {
    type: ObjectId,
    ref: "DRDOCUSER",
    required: true,
  },
  products: [{
    type: ObjectId,
    ref: "DRDOCPRODUCT",
    required: true,
  }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("DRDOCCART", cartSchema);