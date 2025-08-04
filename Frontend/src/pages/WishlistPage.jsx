import React, { useEffect } from 'react';
import { useWishlist } from '../context/WishlistContext';
import './WishlistPage.css';


const WishlistPage = () => {
  const { wishlist, fetchWishlist } = useWishlist();

  useEffect(() => {
    fetchWishlist();
  }, []);

  return (
    <div className="wishlist-fullscreen"> 
      <div className="wishlist-wrapper">
        <h2 className="wishlist-heading">Your Wishlist ❤️</h2>

        {wishlist.length === 0 ? (
          <p className="wishlist-empty">No items in your wishlist.</p>
        ) : (
          <div className="wishlist-flex">
            {wishlist.map((item) => (
              <div key={item._id} className="wishlist-card">
                <img
                  src={item.image}
                  alt={item.name}
                  className="wishlist-image"
                />
                <h3 className="wishlist-name">{item.name}</h3>
                <p className="wishlist-price">Rs. {item.price}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;
