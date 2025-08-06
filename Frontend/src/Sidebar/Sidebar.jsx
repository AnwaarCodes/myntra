import React, { useState, useEffect } from "react";
import Category from "./Category/Category";
import { IoMenu, IoClose } from "react-icons/io5";
import "./Sidebar.css";

const Sidebar = ({ categories, handleCategoryChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Auto-close sidebar on desktop screen resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsOpen(true);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* Toggle Button - small screens only */}
      <button
        className="sidebar-toggle-btn"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {isOpen ? <IoClose size={22} /> : <IoMenu size={22} />}
      </button>

      {/* Sidebar */}
      <aside className={`sidebar ${isOpen ? "sidebar-open" : ""}`}>
        <div className="logo-container">
          <h1 className="heading">🛒</h1>
        </div>
        <Category
          categories={categories}
          handleCategoryChange={handleCategoryChange}
        />
      </aside>
    </>
  );
};

export default Sidebar;
