const Label = ({ handleChange, value, title, name, color }) => {
    return (
      <label className="label-container">
      <input onChange={handleChange} type="radio" value={value} name={name} className="inpt" />
      <span className="check" style={{ backgroundColor: color }}></span>
      <span className="check">{title}</span>
    </label>
    );
  };
  
  export default Label;