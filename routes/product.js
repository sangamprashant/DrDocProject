const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const requirelogin = require("../middleware/requirelogin");
const POST = mongoose.model("DRDOCPOST");
const PRODUCT = mongoose.model("DRDOCPRODUCT");
const USER = mongoose.model("DRDOCUSER");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Jwt_secret } = require("../key");

router.post("/api/setting/product/upload", requirelogin, async (req, res) => {
  try {
    const {
      title,
      description,
      type,
      mrp,
      salesPrice,
      stock,
      tagline,
      imageUrl,
    } = req.body;

    const uploadedBy = req.user._id; // assuming user is authenticated and their ID is stored in req.user
    if (
      !imageUrl ||
      !title ||
      !description ||
      !type ||
      !mrp ||
      !salesPrice ||
      !stock ||
      !tagline
    ) {
      return res.status(422).json({ error: "Please add all the fields" });
    }
    if (isNaN(mrp) || isNaN(salesPrice) || isNaN(stock)) {
      return res
        .status(422)
        .json({ error: "MRP, Sales Price and Stock should be numbers" });
    }
    let actualSalesPrice = salesPrice;
    if (salesPrice >= mrp) {
      actualSalesPrice = mrp - 1;
    }
    const product = new PRODUCT({
      title,
      description,
      imageUrl,
      type,
      mrp,
      salesPrice: actualSalesPrice,
      stock,
      tagline,
      uploadedBy,
    });

    await product.save();

    res.status(201).json({ message: "Product created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

//getting logusers product
router.get("/api/myproduct", requirelogin, (req, res) => {
  PRODUCT.find({ uploadedBy: req.user._id })
    .populate("uploadedBy", "_id name")
    .sort("-createdAt")
    .then((myproduct) => {
      res.json(myproduct);
    });
});


router.get("/product/:type", (req, res) => {
    const type = req.params.type;
    let query = {};
    if (type !== "all") {
      query.type = type;
    }
    PRODUCT.find(query)
      .sort("-createdAt")
      .then((products) => res.json(products))
      .catch((err) => console.log(err));
  });

module.exports = router;
