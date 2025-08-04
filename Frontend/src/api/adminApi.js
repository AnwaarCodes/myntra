import api from "./api";

// ✅ Get all users
export const fetchAllUsers = async () => {
  const res = await api.get("/admin/users");
  return res.data;
};

// ✅ Get all orders
export const fetchAllOrders = async () => {
  const res = await api.get("/admin/orders");
  return res.data;
};

// ✅ Get sales report
export const fetchSalesReport = async () => {
  const res = await api.get("/admin/report");
  return res.data;
};
