const Order = require("../models/Order");
const User = require("../models/User");
const sendEmail = require("../utils/sendEmail");

const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.userId }).populate("products.productId").sort({ createdAt: -1 });
    if (!orders) return res.status(404).json({ message: "Orders not found" });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: "Error fetching orders" });
  }
};


// const createUserOrder = async (req, res) => {
//   const { products, address, totalPrice } = req.body;

//   if (!products || !address || !totalPrice) {
//     return res.status(400).json({ message: "Missing required fields" });
//   }

//   try {
//     const newOrder = new Order({
//       userId: req.user.userId,
//       products,
//       address,
//       totalPrice,
//     });
//      await newOrder.save();
//      res.status(201).json({ message: "Order created successfully" , order: newOrder });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };


const createUserOrder = async (req, res) => {
  try {
    const { products, totalPrice, address } = req.body;
    const userId = req.user.userId;

    const newOrder = new Order({
      userId,
      products,
      totalPrice,
      address,
    });

    await newOrder.save();

    // 🧑‍💻 Get user email
    const user = await User.findById(userId);
    const email = user.email;

    // 📩 Send email
    await sendEmail(
      email,
      // "anwaarsoomro50@gmail.com",
      "🛍️ Order Confirmation - Your Order is Placed",
      `<h3>Thanks for your order!</h3>
       <p><strong>Total:</strong> Rs. ${totalPrice}</p>
       <p><strong>Address:</strong> ${address}</p>
       <p><strong>Status:</strong> Pending</p>
       <p>We'll notify you once your order is shipped.</p>`
    );

    res.status(201).json({ message: "Order placed & email sent!" });
  } catch (error) {
    console.error("Order error:", error);
    res.status(500).json({ message: "Failed to place order" });
  }
}


const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    // Optional: check if user is authorized
    if (order.userId.toString() !== req.user.userId) {
      return res.status(403).json({ message: "Not authorized to delete this order" });
    }

    await order.deleteOne();
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = {
  getUserOrders,
  createUserOrder,
  deleteOrder,
};