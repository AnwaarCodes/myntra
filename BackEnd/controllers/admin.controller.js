const User = require("../models/User");
const Product = require("../models/Product");
const Order = require("../models/Order");

// 📍 Get All Users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // password hide
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch users", error: err.message });
  }
};

// 📍 Get All Orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("products.productId").populate("userId", "name email");
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch orders", error: err.message });
  }
};

// 📍 Get Sales Report
const getSalesReport = async (req, res) => {
  try {
    const orders = await Order.find({ status: "delivered" });

    const totalRevenue = orders.reduce((acc, order) => acc + order.totalPrice, 0);
    const totalOrders = orders.length;

    res.json({ totalRevenue, totalOrders });
  } catch (err) {
    res.status(500).json({ message: "Failed to generate report", error: err.message });
  }
};


const getMonthlySales = async (req, res) => {
  try {
    const sales = await Order.aggregate([
      {
        $match: {
          status: "delivered" // ✅ Only delivered orders
        }
      },
      {
        $group: {
          _id: { $month: "$createdAt" },
          totalRevenue: { $sum: "$totalPrice" },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    const monthNames = [
      "", "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

    const formatted = sales.map((s) => ({
      month: monthNames[s._id],
      revenue: s.totalRevenue
    }));

    res.status(200).json(formatted);
  } catch (err) {
    res.status(500).json({ message: "Failed to get sales data", error: err.message });
  }
};


// #manageProducts with POST/PUT/DELETE functionalities


const addProducts = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: "Failed to add", error: err.message });
  }
};


const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch products", error: err.message });
  }
};


//CRUD ON PRODUCTS
const updateProduct = async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Update failed", error: err.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed", error: err.message });
  }
};

//CRUD ON USERS
const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete user", error: err.message });
  }
};

//Update Status
const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, {
      status: req.body.status,
    }, { new: true });

    res.json(order);
  } catch (err) {
    res.status(500).json({ message: "Failed to update order", error: err.message });
  }
};



module.exports = {
  getAllUsers,
  getAllOrders,
  getSalesReport,
  getMonthlySales,
  addProducts,
  getAllProducts,
  updateProduct,
  deleteProduct,
  deleteUser,
  updateOrderStatus
};
