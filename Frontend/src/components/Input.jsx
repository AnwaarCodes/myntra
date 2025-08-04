const Input = ({ handleCategoryChange, value, title, name, color }) => {
    return (
      <label className="sidebar-label-container">
        <input onChange={(e) => handleCategoryChange(e.target.value)} type="radio" value={value} name={name} />
        <span className="checkmark" style={{ backgroundColor: color }}></span>
        {title}
      </label>
    );
  };
  
  export default Input;