import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomeItem = ({ item, onAddToCart }) => {
  const navigate = useNavigate();
   const { name, title, price, image, category } = item;

  const handleItemClick = () => {
    navigate(`/product/${item.id}`, { state: { product: item } });
  };

  return (
    <div className="item-container" onClick={handleItemClick}>
      <img className="item-image"src={image} alt="item" />
      {/* <div className="rating">{item.rating.rate}</div> */}
      <div className="company-name">{category}</div>
      <div className="item-name">{name || title}</div>
      <div className="price">
        <span className="current-price">Rs. {price}</span> 
        <span className="discount">20% off</span>
      </div>
      <button
        className="btn-add-bag"
        onClick={(e) => {
          e.stopPropagation(); 
          onAddToCart(item);
        }}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default HomeItem;