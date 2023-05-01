const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const requirelogin = require("../middleware/requirelogin");

const PRODUCT = mongoose.model("DRDOCPRODUCT");
const USER = mongoose.model("DRDOCUSER");
const Cart = mongoose.model("DRDOCCART");
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
//store getting item by type 
router.get("/api/product/store/:type", (req, res) => {
    const type = req.params.type;
    let query = {};
    if (type !== "all") {
      query.type = type;
    }
    PRODUCT.find(query)
    .populate("uploadedBy", "uploadedBy name")
      .sort("-createdAt")
      .then((products) => res.json(products))
      .catch((err) => console.log(err));
});
//getting product by id when clicked
router.get("/api/product/open/:id", (req, res) => {
    const id = req.params.id;
    PRODUCT.findOne({ _id: id })
      .populate("uploadedBy", "uploadedBy name")
      .then((product) => {
        if (!product) {
          return res.status(404).send({error:"Product not found"});
        }
        res.json(product);
      })
      .catch((err) => console.log(err));
  });
//adding in cart
router.post("/api/cart/add", requirelogin, async (req, res) => {
    try {
      const productId = req.body.productId;
      const userId = req.user._id;
  
      // Check if the product exists
      const product = await PRODUCT.findById(productId);
      if (!product) {
        return res.status(400).json({ error: "Product not found" });
      }
  
      // Check if the user already has a cart
      let cart = await Cart.findOne({ user: userId });
  
      // If the user does not have a cart, create one
      if (!cart) {
        cart = new Cart({
          user: userId,
          products: [],
        });
      }
  
      // Add the product to the cart and save
      cart.products.push(productId);
      await cart.save();
  
      res.json({ message: "Product added to cart" });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Internal server error" });
    }
});


module.exports = router;
