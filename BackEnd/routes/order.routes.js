const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const User = require("../models/User");
const sendEmail = require("../utils/sendEmail");
const orderMiddleware = require("../middleware/order.middleware");
const { createUserOrder, getUserOrders, deleteOrder } = require("../controllers/order.controller");

// Create order
router.post("/",  orderMiddleware, createUserOrder);

// Get orders of user 
router.get("/", orderMiddleware, getUserOrders);

router.delete("/:id", orderMiddleware, deleteOrder);



module.exports = router;