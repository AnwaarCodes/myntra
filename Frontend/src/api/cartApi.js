// src/api/cartAPI.js
import api from "./api"; // Axios instance
import { jwtDecode } from "jwt-decode";

export const getCartItems = async () => {
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const userId = decoded.userId;


  const res = await api.get(`/cart/${userId}`);
  return res.data;
};

export const addToCart = async (productId, quantity = 1) => {
  const token = localStorage.getItem("token");

  const res = await api.post(
    `/cart/add`,
    { productId, quantity },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  return res.data;
};

export const updateCartItem = async (productId, quantity) => {
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const userId = decoded.userId;

  const res = await api.put(`/cart/update`, { userId, productId, quantity });
  return res.data;
};

export const removeCartItem = async (productId) => {
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const userId = decoded.userId;

  const res = await api.delete(`/cart/remove`, {
    data: { userId, productId },
  });
  return res.data;
};
