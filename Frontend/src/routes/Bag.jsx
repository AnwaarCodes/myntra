import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BagSummary from "../components/BagSummary";
import BagItem from "../components/BagItem";
// from cartApi
import { getCartItems, removeCartItem, updateCartItem } from "../api/cartApi";

const Bag = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    loadCartItems();
  }, []);

  const loadCartItems = async () => {
    try {
      const res = await getCartItems();
      setCartItems(res.items);
    } catch (error) {
      console.error("Error loading cart items:", error);
    }
  };

  const handleQuantityChange = async (item, newQuantity) => {
    try {
      console.log(
        "Updating cart item quantity:",
        item.product._id,
        newQuantity
      );
      await updateCartItem(item.product._id, newQuantity);
      loadCartItems();
    } catch (error) {
      console.error("Error updating cart item quantity:", error);
    }
  };

  const handleRemoveItem = async (productId) => {
    await removeCartItem(productId);
    loadCartItems();
  };

  return (
    <main
      style={{ padding: "24px", background: "#f3f4f6", minHeight: "100vh" }}
    >
      <div className="bag-page">
        <div className="bag-items-container">
          {cartItems.length > 0 ? (
            cartItems.map((item) =>
              item.product ? (
                <BagItem
                  key={item.product._id}
                  item={item}
                  onRemove={() => handleRemoveItem(item.product._id)}
                  onQuantityChange={handleQuantityChange}
                />
              ) : null
            )
          ) : (
            <p>Your bag is empty</p>
          )}
        </div>
        <div className="bag-summary">
          <BagSummary cartItems={cartItems} />
        </div>

         {/* <div className="mt-6">
          <Link to="/place-order">
            <button className="btn-order">Place Order</button>
          </Link>
        </div> */}
      </div>
    </main>
  );
};

export default Bag;

