const express = require("express");
const {
    getCart,
    addToCart,
    updateCart,
    removeFromCart,
} = require("../controllers/cart.controller");
const auth = require("../middleware/auth");

const router = express.Router();


router.get("/:userId", getCart);
router.post("/add", addToCart);
router.put("/update", updateCart);
router.delete("/remove", removeFromCart);

module.exports = router;
