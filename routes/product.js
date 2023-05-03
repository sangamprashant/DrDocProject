const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const requirelogin = require("../middleware/requirelogin");

const PRODUCT = mongoose.model("DRDOCPRODUCT");
const USER = mongoose.model("DRDOCUSER");
const Cart = mongoose.model("DRDOCCART");
const Order= mongoose.model("DRDOCORDER");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Jwt_secret } = require("../key");

router.post("/api/setting/product/upload", requirelogin, async (req, res) => {
  try {
    const {
      title,description,type,mrp,salesPrice,stock,tagline,imageUrl,} = req.body;

    const uploadedBy = req.user._id; // assuming user is authenticated and their ID is stored in req.user
    if (!imageUrl ||!title ||!description ||!type ||!mrp ||!salesPrice ||!stock ||!tagline) {
      return res.status(422).json({ error: "Please add all the fields" });
    }
    if (isNaN(mrp) || isNaN(salesPrice) || isNaN(stock)) {
      return res
        .status(422)
        .json({ error: "MRP, Sales Price and Stock should be numbers" });
    }
    let actualsalesPrice = salesPrice;
    if (salesPrice >= mrp) {
      actualsalesPrice = mrp - 1;
    }
    const product = new PRODUCT({
      title,description,imageUrl,type,mrp,salesPrice: actualsalesPrice,stock,tagline,uploadedBy,
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
      const { productId } = req.body;
      const userId = req.user._id;
  
      // Check if the product exists and is in stock
      const product = await PRODUCT.findById(productId);
      if (!product) {
        return res.status(400).json({ message: "Product not found" });
      }
      if (product.stock <= 0) {
        return res.status(400).json({ message: "Product is out of stock" });
      }
  
      // Check if the user already has a cart
      let cart = await Cart.findOne({ user: userId });
  
      // If the user does not have a cart, create one
      if (!cart) {
        cart = new Cart({
          user: userId,
          items: [],
        });
      }
  
      // Find the item in the cart
      const itemIndex = cart.items.findIndex(item => item.product._id.toString() === productId);
  
      // Check if the item is already in the cart
      if (itemIndex !== -1) {
        const productStock = cart.items[itemIndex].product.stock;
        const currentQuantity = cart.items[itemIndex].quantity;
        const requestedQuantity = currentQuantity + 1;
  
        // Check if the product stock is greater than 0
        if (productStock <= 0) {
          return res.status(400).json({ message: "Product is out of stock" });
        }
  
        // Check if the quantity of the item being added is greater than the available stock
        if (requestedQuantity > productStock) {
          return res.status(400).json({ message: `Only ${productStock} items are available` });
        }
  
        // Update the quantity of the item by one
        cart.items[itemIndex].quantity++;
      } else {
        // If the item is not in the cart, add it
        cart.items.push({ product, quantity: 1 });
      }
  
      // Save the cart
      await cart.save();
  
      res.status(200).json({ message: "Product added to cart" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  });  
//fetch cart
router.get('/api/cart/items', requirelogin, async (req, res) => {
    try {
        const userId = req.user._id;
    
        // Find user's cart data
        const cart = await Cart.findOne({ user: userId }).populate("items.product");
    
        if (!cart) {
          return res.status(404).json({ message: "Cart not found" });
          a;
        }
    
        res.status(200).json({ cart });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
      }
  });
 //addone in cart 
router.put("/api/cart/add/:itemId", requirelogin, async (req, res) => {
    try {
      const userId = req.user._id;
      const itemId = req.params.itemId;
  
      // Find user's cart data
      const cart = await Cart.findOne({ user: userId }).populate("items.product");
  
      if (!cart) {
        return res.status(404).json({ message: "Cart not found" });
      }
  
      // Find the item in the cart
      const itemIndex = cart.items.findIndex(item => item.product._id.toString() === itemId);
  
      if (itemIndex === -1) {
        return res.status(404).json({ message: "Item not found in cart" });
      }
  
      // Check if the product stock is greater than 0
      if (cart.items[itemIndex].product.stock <= 0) {
        return res.status(400).json({ message: "Product is out of stock" });
      }
  
      // Check if the quantity of the item being added is greater than the available stock
      const productStock = cart.items[itemIndex].product.stock;
      const currentQuantity = cart.items[itemIndex].quantity;
      const requestedQuantity = currentQuantity + 1;
      if (requestedQuantity > productStock) {
        return res.status(400).json({ message: `Only ${productStock} items are available` });
      }
  
      // Update the quantity of the item by one
      cart.items[itemIndex].quantity++;
  
      // Save the updated cart
      await cart.save();
      return res.status(200).json({ message: "Item added in the cart" });
  
      res.status(200).json({ cart });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  });
//remove one 
router.put("/api/cart/remove/:itemId", requirelogin, async (req, res) => {
    try {
      const userId = req.user._id;
      const itemId = req.params.itemId;
  
      // Find user's cart data
      const cart = await Cart.findOne({ user: userId }).populate("items.product");
  
      if (!cart) {
        return res.status(404).json({ message: "Cart not found" });
      }
  
      // Find the item in the cart
      const itemIndex = cart.items.findIndex(item => item.product._id.toString() === itemId);
  
      if (itemIndex === -1) {
        return res.status(404).json({ message: "Item not found in cart" });
      }
  
      // Reduce the quantity of the item by one
      cart.items[itemIndex].quantity--;
   
      // If the quantity is zero, remove the item from the cart
      if (cart.items[itemIndex].quantity === 0) {
        cart.items.splice(itemIndex, 1);
      }
  
      // Save the updated cart
      await cart.save();
      
      return res.status(200).json({ message: "Item removed from the cart" });
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  });
  //remove item from cart
  router.delete("/api/cart/:cartId/item/:itemId", async (req, res) => {
    const { cartId, itemId } = req.params;
  
    try {
      const cart = await Cart.findById(cartId);
  
      if (!cart) {
        return res.status(404).json({ message: "Cart not found" });
      }
  
      const itemIndex = cart.items.findIndex(
        (item) => item._id.toString() === itemId
      );
  
      if (itemIndex === -1) {
        return res.status(404).json({ error: "Item not found in cart" });
      }
  
      cart.items.splice(itemIndex, 1);
      await cart.save();
  
      res.status(200).json({ message: "Item removed from cart" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }); 
//make order
router.post("/api/order/done", requirelogin, async (req, res) => {
    try {
      const cart = await Cart.findOne({ user: req.user._id }).populate("items.product");
      if (!cart) {
        return res.status(400).json({ error: "Cart not found" });
      }
  
      // Prompt user for delivery address, name, and mobile number
      const { deliveryAddress, name, mobileNumber } = req.body;
      
      if (!name) {
        return res.status(400).json({ error: "Name is required" });
      }
      if (!mobileNumber || mobileNumber.length!==10) {
        return res.status(400).json({ error: "Mobile number is required" });
      }
      if (!deliveryAddress) {
        return res.status(400).json({ error: "Delivery address is required" });
      }
  
      // Process each item as a separate order
      for (const item of cart.items) {
        // Check if the product is in stock
        if (item.product.stock <= 0) {
          return res.status(400).json({ error: "Product is out of stock" });
        }
        // Reduce the stock of the product by the quantity bought
    item.product.stock -= item.quantity;
    await item.product.save();
        
        const order = new Order({
          user: req.user._id,
          items: [{
            product: item.product,
            quantity: item.quantity,
            price: item.product.salesPrice,
          }],
          totalPrice: item.quantity * item.product.salesPrice,
          deliveryAddress: deliveryAddress,
          boughtBy: name,
          mobileNumber: mobileNumber,
          seller: item.product.uploadedBy.toString()
        });
        await order.save();
      }
  
      await Cart.updateOne({ user: req.user._id }, { $set: { items: [], grandPrice: 0 } });
  
      res.json({ message: "Checkout successful" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  });
  //get my orders made 
  router.get("/api/:my/myorders", requirelogin, async (req, res) => {
    try {
      const userId = req.user._id;
  
      // Find all orders made by the user
      const orders = await Order.find({ user: userId })
        .populate({
          path: "items.product",
          select: "-createdAt -updatedAt",
        }).sort("-createdAt") // sort by creation date in descending order
        .lean();
  
      if (!orders) {
        return res.status(404).json({ message: "No orders found" });
      }
  
      res.status(200).json({ orders });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  });
  // PUT route to cancel an order
router.put("/api/orders/:orderId/cancel", requirelogin, async (req, res) => {
  try {
    const userId = req.user._id;
    const orderId = req.params.orderId;

    // Find the order by ID and user ID
    const order = await Order.findOne({ _id: orderId });
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Update the order status to "Canceled"
    order.status = "Canceled";
    await order.save();

    res.status(200).json({ message: "Order canceled successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});
// GET /orders/status
router.get("/api/orders/status", requirelogin, async (req, res) => {
  try {
    const orders = await Order.find()
      .populate({
        path: "items.product",
        model: "DRDOCPRODUCT",
        populate: {
          path: "uploadedBy",
          model: "DRDOCUSER",
          select: "name email",
        },
        select: "-__v",
      })
      .sort("-createdAt")
      .lean();

    if (orders.length === 0) {
      return res.status(404).json({ message: "No orders found" });
    }

    const result = {
      packingOrders: [],
      confirmedOrders: [],
      shippedOrders: [],
      deliveredOrders: [],
      canceledOrders: [],
    };

    orders.forEach((order) => {
      order.items.forEach((item) => {
        if (item.product.uploadedBy && item.product.uploadedBy._id && item.product.uploadedBy._id.toString() === req.user._id.toString()) {
          switch (order.status) {
            case "Confirmed":
              result.confirmedOrders.push(order);
              break;
            case "Packing":
              result.packingOrders.push(order);
              break;
            case "Shipped":
              result.shippedOrders.push(order);
              break;
            case "Delivered":
              result.deliveredOrders.push(order);
              break;
            case "Canceled":
              result.canceledOrders.push(order);
              break;
          }
        } else if (!item.product.uploadedBy) {
          // Remove the item from the order if the product is deleted
          order.items = order.items.filter((i) => i.product.toString() !== item.product._id.toString());
        }
      });
    });


    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});
// changing status of order 
router.put("/api/orders/:orderId/status", requirelogin, async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;
  try {
    const order = await Order.findOne({ _id: orderId })
      .populate({
        path: "items.product",
        model: "DRDOCPRODUCT",
        select: "uploadedBy",
      })
      .lean();

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (order.items.some((item) => item.product.uploadedBy == req.user.id)) {
      const updatedOrder = await Order.findOneAndUpdate(
        { _id: orderId },
        { status },
        { new: true }
      );
      res.status(200).json(updatedOrder);
    } else {
      res.status(403).json({
        message: "You are not authorized to change the status of this order",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});
module.exports = router;
