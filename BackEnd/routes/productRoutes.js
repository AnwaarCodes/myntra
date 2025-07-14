const express = require("express");
const {
    deleteProduct,
    getAllProducts,
    updateProduct,
    getSingleProduct,
    createProduct,
 } = require("../controllers/productController");

 const router = express.Router();
const Product = require("../models/Product");



router.post('/', async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(500).json({ message: 'Error adding product', error: err.message });
  }
});


router.get("/", getAllProducts);
router.get("/:id", getSingleProduct);
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;