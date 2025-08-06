import React from "react";
import "../routes/Bag.css";

const BagItem = ({ item, onRemove, onQuantityChange }) => {
  const { product, quantity } = item;
  const { title, price, image, category } = product;

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value);
    if (newQuantity >= 1) onQuantityChange(item, newQuantity);
  };

  return (
    <div className="bag-item">
      <img className="bag-image" src={image} alt={title} />

      <div className="bag-item-details">
        <div className="bag-category">Category: {category}</div>
        <div className="bag-price">Price: Rs. {price}</div>
        <div className="bag-title">{title}</div>
      </div>

      <div className="bag-quantity">
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={handleQuantityChange}
          className="bag-qty-input"
        />
      </div>

      <button onClick={() => onRemove(item)} className="bag-remove-btn">
        Remove
      </button>
    </div>
  );
};

export default BagItem;
