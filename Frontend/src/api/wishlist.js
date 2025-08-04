import api from "./api";

export const getWishlist = async () => {
  const res = await api.get("/wishlist");
  return res.data;
};

export const addToWishlist = async (productId) => {
 const res = await api.post("/wishlist/add", { productId });
 console.log("response from add to wishlist",res.data);
};

export const removeFromWishlist = async (productId) => {
  await api.post("/wishlist/remove", { productId });
};
