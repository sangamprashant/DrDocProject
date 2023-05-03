const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  type: {type: String,enum: ["Capsules", "Liquid", "Drops", "Inhalers", "Injections"],required: true,},
  mrp: { type: Number, required: true },
  salesPrice: { type: Number, required: true },
  stock: { type: Number, required: true },
  tagline: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  uploadedBy: {type: ObjectId,ref: "DRDOCUSER",},
});

module.exports = mongoose.model("DRDOCPRODUCT", productSchema);
