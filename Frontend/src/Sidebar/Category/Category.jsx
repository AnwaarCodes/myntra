// Category.jsx
import Input from "../../components/Input";
import "./Category.css";

function Category({ handleCategoryChange, categories }) {
  return (
    <div className="category-container">
      <h2 className="category-title">Categories</h2>
      <div className="category-list">
        <label className="category-option">
          <input
            type="radio"
            value=""
            name="category"
            onChange={handleCategoryChange}
          />
          <span className="checkmark"></span>
          All
        </label>
        {categories.map((category) => (
          <Input
            key={category}
            handleCategoryChange={handleCategoryChange}
            value={category}
            title={category}
            name="category"
          />
        ))}
      </div>
    </div>
  );
}

export default Category;
