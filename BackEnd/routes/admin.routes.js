const router = require("express").Router();
const auth = require("../middleware/auth");
const isAdmin = require("../middleware/isAdmin");
const {
  getAllUsers,
  getAllOrders,
  getSalesReport,
  getMonthlySales,
  addProducts,
  getAllProducts
} = require("../controllers/admin.controller");

router.use(auth, isAdmin); // all below are protected admin routes
router.get("/users", getAllUsers);
router.get("/orders", getAllOrders);
router.get("/sales", getSalesReport);
router.get("/monthly-sales", getMonthlySales);
// router.get("/monthly-sales", getMonthlySales);
router.get('/products', getAllProducts);
router.post("/products", addProducts);
// You can add POST/PUT/DELETE for manageProducts here too

module.exports = router;
