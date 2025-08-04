import React, { useState } from "react";
import { FaHandHoldingHeart, FaShoppingBag } from "react-icons/fa";
import { MdPerson } from "react-icons/md";
import { Link } from "react-router-dom";
import Input from "./Input";
import Label from "./Label";

const Header = ({
  cartCount,
  handleFilter,
  handleInputChange,
  query,
  handleCategoryChange,
  categories,
}) => {
  return (
    <header className="flex items-center justify-between h-[80px] border-b border-gray-300 bg-white shadow-sm">
      {/* Logo */}
      <div className="logo_container ml-[4%]">
        <Link to="/">
          <img
            className="myntra_home h-[45px]"
            src="../images/myntra_logo.webp"
            alt="Myntra Home"
          />
        </Link>
      </div>

      {/* Nav Bar */}
      <nav className="nav_bar flex gap-6 justify-center min-w-[500px] text-sm font-bold uppercase tracking-wide text-gray-800">
        {categories.map((category) => (
          <Link
            key={category}
            to="#"
            onClick={() => handleCategoryChange(category)}
            className="border-b-4 border-transparent hover:border-pink-500 pb-[28px] transition"
          >
            {category}
          </Link>
        ))}
      </nav>

      <div className="search_bar flex items-center w-[30%] h-[42px] bg-gray-100 border border-gray-300 rounded-lg overflow-hidden transition-all duration-200 focus-within:ring-2 focus-within:ring-pink-500 hover:shadow-sm">
        <span className="material-symbols-outlined search_icon  text-gray-500 flex justify-center items-center text-[14.5px]">
          search
        </span>
        <input
          className="search_input w-full bg-gray-100 text-sm text-gray-700 placeholder-gray-500 focus:outline-none"
          type="text"
          placeholder="Search your products..."
          value={query}
          onChange={handleInputChange}
        />
      </div>

      {/* Action Bar */}
      <div className="action_bar flex items-center gap-6 min-w-[200px] justify-evenly">
        <div className="action_container flex flex-col items-center text-gray-800 hover:text-pink-600 transition">
          <MdPerson size={22} />
          <span className="action_name text-xs font-medium">Profile</span>
        </div>

        <Link
          to="/wishlist"
          className="action_container flex flex-col items-center text-gray-800 hover:text-pink-600 transition"
        >
          <FaHandHoldingHeart size={22} />
          <span className="action_name text-xs font-medium">Wishlist</span>
        </Link>

        <Link
          to="/bag"
          className="action_container relative flex flex-col items-center text-gray-800 hover:text-pink-600 transition"
        >
          <FaShoppingBag size={22} />
          <span className="action_name text-xs font-medium">Bag</span>
          {cartCount > 0 && (
            <span className="bag-item-count absolute -top-3 left-3 text-white text-[10px] font-bold px-[6px] py-[2px] bg-red-500 rounded-full">
              {cartCount}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
};

export default Header;
