import Category from "./Category/Category";
import Colors from "./Colors/Colors";
import Price from "./Price/Price";
import "./Sidebar.css";

const Sidebar = ({ 
  handleCategoryChange, 
  categories, 
  // handleColorChange, 
  // handlePriceRangeChange,
  // colors,
  // priceRanges 
}) => {
  return (
    <aside className="sidebar">
      {/* Sidebar Logo */}
      <div className="logo-container">
        <h1 className="heading">🛒</h1>
      </div>
      <Category categories={categories} handleChange={handleCategoryChange} />
      {/* <Price priceRanges={priceRanges} handlePriceRangeChange={handlePriceRangeChange} />
      <Colors colors={colors} handleColorChange={handleColorChange} /> */}
    </aside>
  );
};

export default Sidebar;
