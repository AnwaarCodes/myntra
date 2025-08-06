import React, { useState } from "react";
import { FaHandHoldingHeart, FaShoppingBag } from "react-icons/fa";
import { MdPerson } from "react-icons/md";
import { Link } from "react-router-dom";
import Input from "../Input";
import Label from "../Label";
import "./Header.css";

const Header = ({
  cartCount,
  handleFilter,
  handleInputChange,
  query,
  handleCategoryChange,
  // categories,
}) => {

  
  return (
    <header className="header">
      {/* Logo */}
      <div className="header__logo">
        <Link to="/">
          <img src="../images/myntra_logo.webp" alt="Myntra Home" />
        </Link>
      </div>

      {/* Search Bar */}
      <div className="header__search">
        <input
          type="text"
          placeholder="Search your products..."
          value={query}
          onChange={handleInputChange}
        />
      </div>

      {/* Action Bar */}
      <div className="header__actions">
        <div className="action">
          <MdPerson size={22} />
          <span>Profile</span>
        </div>

        <Link to="/wishlist" className="action">
          <FaHandHoldingHeart size={22} />
          <span>Wishlist</span>
        </Link>

        <Link to="/bag" className="action bag-icon">
          <FaShoppingBag size={22} />
          <span>Bag</span>
          {cartCount > 0 && <span className="bag-count">{cartCount}</span>}
        </Link>
      </div>
    </header>
  );
};

export default Header;
