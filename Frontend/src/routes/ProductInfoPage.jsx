import React, { useState } from 'react';
import './styles.css';
import { useLocation, useParams } from 'react-router-dom';

const ProductInfoPage = () => {
  const [selectedSize, setSelectedSize] = useState('');
  const [pincode, setPincode] = useState('');
  const { state } = useLocation(); // Access state passed during navigation
  const { id } = useParams();

  const sizes = ['S', 'M', 'L', 'XL', 'XXL'];

  const handleAddToBag = () => {
    if (!selectedSize) {
      alert('Please select a size');
    } else {
      alert(`Added size ${selectedSize} to bag`);
    }
  };
  
  const product = state?.product; 

  if (!product) {
    return <p>Loading product details...</p>;
  }

  return (
    <div className="container">
      <div className="breadcrumb">
        {product.category} / {product.title}
      </div>
      <div className="product-grid">
        <div className="product-images">
        <img src={product.image} alt={product.title} className="product-image" />
        </div>
        <div className="product-info">
        <h1 className="product-title">{product.title}</h1>
          <p className="product-subtitle">{product.category}</p>
          <div className="rating">
            <span className="stars">★★★★☆</span>
            <span className="rating-count">{product.rating.rate} | {product.rating.count} Ratings</span>
          </div>
          <div className="price">
          <span className="current-price cur-price">₹{product.price}</span>
            <span className="original-price">₹2799</span>
            <span className="discount">(35% OFF)</span>
          </div>
          <p className="tax-info">Inclusive of all taxes</p>
          <div className="size-selector">
            <div className="size-header">
              <span>SELECT SIZE</span>
              <a href="#" className="size-chart">SIZE CHART &gt;</a>
            </div>
            <div className="size-options">
              {sizes.map(size => (
                <button
                  key={size}
                  className={`size-button ${selectedSize === size ? 'selected' : ''}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          <div className="action-buttons">
            <button className="add-to-bag" onClick={handleAddToBag}>ADD TO BAG</button>
            <button className="wishlist">WISHLIST</button>
          </div>
          <div className="delivery-options">
            <h3 className="delivery-title">DELIVERY OPTIONS</h3>
            <div className="pincode-checker">
              <input
                type="text"
                className="pincode-input"
                placeholder="Enter pincode"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
              />
              <button className="check-button">Check</button>
            </div>
            <ul className="delivery-info">
              <li>100% Original Products</li>
              <li>Pay on delivery might be available</li>
              <li>Easy 7 days returns and exchanges</li>
            </ul>
          </div>
          <p className="description">{product.description}</p>
          <div className="offers">
            <h3 className="offers-title">BEST OFFERS</h3>
            <ul className="offer-list">
              <li>Best Price: Rs.{product.price}</li>
              <li>Applicable on: Orders above Rs. 299 (only on first purchase)</li>
              <li>Coupon code: WINTER50AL</li>
              <li>Max Discount: Rs.300 off (check cart for final savings)</li>
            </ul>
            <a href="#" className="view-products">View Eligible Products</a>
            <div className="credit-card-offer">
              <h4>7.5% Discount on Myntra Kotak Credit Card</h4>
              <ul className="offer-list">
                <li>Max Discount up to ₹750 on every prepaid order</li>
              </ul>
              <a href="#" className="terms">Terms & Condition</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfoPage;

