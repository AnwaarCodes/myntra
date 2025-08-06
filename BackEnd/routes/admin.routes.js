const router = require("express").Router();
const auth = require("../middleware/auth");
const isAdmin = require("../middleware/isAdmin");
const {
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
} = require("../controllers/admin.controller");

router.use(auth, isAdmin); // all below are protected admin routes
router.get("/users", getAllUsers);
router.get("/orders", getAllOrders);
router.get("/sales", getSalesReport);
router.get("/monthly-sales", getMonthlySales);
router.get('/products', getAllProducts);
router.post("/products", addProducts);

//CRUD OPERATIONS
router.put("/products/:id", updateProduct);
router.delete("/products/:id", deleteProduct);
router.delete("/users/:id", deleteUser);
router.put("/orders/:id", updateOrderStatus);



module.exports = router;
