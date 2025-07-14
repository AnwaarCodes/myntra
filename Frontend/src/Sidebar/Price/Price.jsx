import Input from "../../components/Input";
import "./Price.css";

const Price = ({ handlePriceRangeChange }) => {
  return (
    <div className="ml">
      <h2 className="sidebar-title height-title">Price</h2>

      {/* All Price Range Option */}
      <label className="sidebar-label-container">
        <input 
          onChange={handlePriceRangeChange} 
          type="radio" 
          value="" 
          name="price-filter" 
        />
        <span className="checkmark"></span>
        All
      </label>

    
      <Input handlePriceRangeChange={handlePriceRangeChange} value={50} title="$0 - 50" name="price-filter" />
      <Input handlePriceRangeChange={handlePriceRangeChange} value={100} title="$50 - $100" name="price-filter" />
      <Input handlePriceRangeChange={handlePriceRangeChange} value={150} title="$100 - $150" name="price-filter" />
      <Input handlePriceRangeChange={handlePriceRangeChange} value={200} title="Over $150" name="price-filter" />
    </div>
  );
};

export default Price;
