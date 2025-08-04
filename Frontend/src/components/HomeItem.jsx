import React from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "../api/api";
import Masonry from 'react-masonry-css';
import WishlistButton from "./WishlistButton";

const HomeItem = ({ item, onAddToCart }) => {
  const navigate = useNavigate();
  const { name, title, price, image, category, _id } = item;

  const handleItemClick = () => {
    navigate(`/product/${_id}`, { state: { product: item } });
  };

  const handleAddToCart = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please login to add items to cart");
        return;
      }

      const { userId } = jwtDecode(token);

      const res = await api.post("/cart/add", {
        userId,
        productId: _id,
        quantity: 1,
      });

      console.log("Added to cart:", res.data);

      if (onAddToCart) onAddToCart(item);
      alert("Item added to cart successfully!");
    } catch (err) {
      if (
        err.response?.status === 404 &&
        err.response.data.message === "Cart not found"
      ) {
        try {
          const userId = jwtDecode(localStorage.getItem("token")).userId;

          await api.post("/cart/create", { userId });
          await api.post("/cart/add", {
            userId,
            productId: _id,
            quantity: 1,
          });

          alert("Cart created and item added!");
        } catch (e) {
          console.error("Failed to create cart:", e);
          alert("Failed to create cart");
        }
      } else {
        console.error("Cart Error:", err);
        alert("Failed to add item to cart");
      }
    }
  };

  return (
    <div className="masonry-item">
    <div className="item-container" onClick={handleItemClick}>
      <img className="item-image" 
      src={image} 
      alt={title || name}
      onLoad={() => console.log("✅ Image loaded:", image)}
         style={{ 
          width: '100%', 
          height: 'auto', 
          objectFit: 'cover',
          backgroundColor: '#f0f0f0' // Shows if image is loading
        }}
       />
       <div className="item-overlay-content">
      <div className="item-name">{name || title}</div>
      <div className="company-name">{category}</div>
      <div className="price">
        <span className="current-price">Rs. {price}</span>
        <span className="discount">20% off</span>
      </div>

       <WishlistButton product={item} />
      <button
        className="btn-add-bag"
        onClick={(e) => {
          e.stopPropagation();
          handleAddToCart();
        }}
      >
        Add to Cart
      </button>
      </div>
    </div>
    </div>
  );
};

export default HomeItem;