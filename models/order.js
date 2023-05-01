const mongoose = require("mongoose");
const DRDOCUSER = mongoose.model("DRDOCUSER");
const DRDOCPRODUCT = mongoose.model("DRDOCPRODUCT");


const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DRDOCUSER",
      required: true,
    },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "DRDOCPRODUCT",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    deliveryAddress: {
      type: String,
      required: true,
    },
    boughtBy:{
      type: String,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["Confirmed", "Packing", "Shipped", "Delivered","Canceled"],
      default: "Confirmed",
    },

    
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("DRDOCORDER", orderSchema);

module.exports = Order;
