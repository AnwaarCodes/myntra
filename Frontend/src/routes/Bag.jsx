// Bag.js
import React, { useEffect, useState } from 'react';
import BagSummary from '../components/BagSummary';
import BagItem from '../components/BagItem';

const Bag = () => {
  const [cartItems, setCartItems] = useState([]);
  
  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(storedItems);
  }, []);

  const handleRemoveItem = (id) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCartItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  };

  return (
    <main>
      <div className="bag-page">
        <div className="bag-items-container">
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <BagItem key={item.id} item={item} onRemove={() => handleRemoveItem(item.id)} />
            ))
          ) : (
            <p>Your bag is empty</p>
          )}
        </div>
        <BagSummary />
      </div>

    </main>
  );
};

export default Bag;
