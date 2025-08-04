const express = require("express");
const router = express.Router();
const Wishlist = require("../models/Wishlist");
const authMiddleware = require("../middleware/authMiddleware");

// Get Wishlist
router.get("/", authMiddleware, async (req, res) => {
        const wishlist = await Wishlist.findOne({ userId: req.user.userId }).populate("products");
        res.json(wishlist?.products || []);
});

// Add to Wishlist
router.post("/add", authMiddleware, async (req, res) => {
        const { productId } = req.body;
        const wishlist = await Wishlist.findOne({ userId: req.user.userId });
        if (!wishlist) {
            const newWishlist = new Wishlist({ userId: req.user.userId, products: [productId] });
            await newWishlist.save();
            res.json(newWishlist);
        } else {
            wishlist.products.push(productId);
            await wishlist.save();
            res.json(wishlist);
        }
});

// Remove from Wishlist
router.post("/remove", authMiddleware, async (req, res) => {
        const { productId } = req.body;
        const wishlist = await Wishlist.findOne({ userId: req.user.userId });
        if (!wishlist) {
            res.status(404).json({ message: "Wishlist not found" });
        } else {
            wishlist.products = wishlist.products.filter((id) => id.toString() !== productId);
            await wishlist.save();
            res.json(wishlist);
        }
});

module.exports = router;