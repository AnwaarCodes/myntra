import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomeItem = ({ item, onAddToCart }) => {
  const navigate = useNavigate();

  const handleItemClick = () => {
    navigate(`/product/${item.id}`, { state: { product: item } });
  };

  return (
    <div className="item-container" onClick={handleItemClick}>
      <img className="item-image" src={item.image} alt="item" />
      <div className="rating">{item.rating.rate}</div>
      <div className="company-name">{item.category}</div>
      <div className="item-name">{item.title}</div>
      <div className="price">
        <span className="current-price">{item.price}</span> 
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
