import React, { useState } from 'react';
import { FaHandHoldingHeart, FaShoppingBag } from "react-icons/fa";
import { MdPerson } from "react-icons/md";
import { Link } from 'react-router-dom';
import Input from './Input';
import Label from './Label';

const Header = ({ cartCount, handleFilter, handleInputChange, query, handleCategoryChange, categories }) => {

    return (
        <header>
            <div className="logo_container">
                <Link to="/">
                    <img className="myntra_home" src="../images/myntra_logo.webp" alt="Myntra Home" />
                </Link>
            </div>
            <nav className="nav_bar">
                {categories.map((category) => (
                    <Link key={category} to="#"   onClick={() => handleCategoryChange(category)}>
                        {category}
                    </Link>
                ))}
            </nav>

            <div className="search_bar">
                <span className="material-symbols-outlined search_icon">search</span>
                <input className="search_input" type='text' placeholder="Search your title" onChange={handleInputChange} value={query} />
            </div>
            <div className="action_bar">
                <div className="action_container">
                    <MdPerson />
                    <span className="action_name">Profile</span>
                </div>

                <div className="action_container">
                    <FaHandHoldingHeart />
                    <span className="action_name">Wishlist</span>
                </div>

                <Link to="/bag" className="action_container">
                    <FaShoppingBag />
                    <span className="action_name">Bag</span>
                    <span className="bag-item-count">{cartCount}</span>
                </Link>
            </div>
        </header>
    );
}

export default Header;
