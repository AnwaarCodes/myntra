import "./Category.css";
import Input from "../../components/Input";

function Category({ handleCategoryChange, categories }) {
  return (
    <div className="w-40 bg-slate-600 border-2 border-black">
      <h2 className="sidebar-title">Category</h2>
      <div>
        <label className="sidebar-label-container">
          <input onChange={ handleCategoryChange} type="radio" value="" name="category" />
          <span className="checkmark"></span>All
        </label>
        {categories.map((category) => (
          <Input
            key={category}
            handleCategoryChange={ handleCategoryChange }
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
