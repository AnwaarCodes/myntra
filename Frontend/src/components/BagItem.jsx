import React from "react";

const BagItem = ({ item, onRemove, onQuantityChange }) => {
  const { product, quantity } = item;
  const {title, price, image, category } = product;

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value);
    if (newQuantity >= 1) onQuantityChange(item, newQuantity);
  };

  return (
    // <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 border rounded-lg shadow-sm bg-white">
    //   <img className="w-24 h-24 object-contain" src={image} alt={title} />
    //   <div className="flex-1 text-center sm:text-left">
    //     {/* <div className="text-sm text-gray-500 mb-1">
    //       {item.rating.rate} ⭐ | {item.rating.count} ratings
    //     </div> */}
    //     <div className="text-blue-600 font-semibold text-sm uppercase tracking-wide">
    //       Category: {category}
    //     </div>
    //     <div className="text-lg font-bold text-gray-800 mt-1">
    //      Price: Rs. {price}
    //     </div>
    //     <div className="text-lg font-bold text-gray-800 line-clamp-2 mt-1">
    //       {title}
    //     </div>
    //   </div>
    //   {/* Quantity Input */}
    //   <div className="flex items-center gap-2">
    //     <input
    //       type="number"
    //       min="1"
    //       value={quantity}
    //       onChange={handleQuantityChange}
    //       className="w-16 px-2 py-1 border rounded-md text-center"
    //     />
    //   </div>
    //   {/* Remove Button */}
    //   <button
    //     onClick={() => onRemove(item)}
    //     className="text-sm bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition"
    //   >
    //    Remove
    //   </button>
    // </div>


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

  <button
    onClick={() => onRemove(item)}
    className="bag-remove-btn"
  >
    Remove
  </button>
</div>

  );
};

export default BagItem;
