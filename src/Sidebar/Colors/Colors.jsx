import "./Colors.css";
import Input from "../../components/Input";

const Colors = ({ handleColorChange}) => {
  return (
    <div>
      <h2 className="sidebar-title color-title">Colors</h2>

      {/* All Colors Option */}
      <label className="sidebar-label-container">
        <input 
          onChange={handleColorChange} 
          type="radio" 
          value="" 
          name="color-filter" 
        />
        <span className="checkmark all"></span>
        All
      </label>

     
      <Input handleChange={handleColorChange} value="black" title="Black" name="color-filter" color="black" />
      {/* <Input handleChange={handleColorChange} value="blue" title="Blue" name="color-filter" color="blue" /> */}
      {/* <Input handleChange={handleColorChange} value="red" title="Red" name="color-filter" color="red" /> */}
      {/* <Input handleChange={handleColorChange} value="green" title="Green" name="color-filter" color="green" /> */}

      {/* White Color with Custom Style */}
      <label className="sidebar-label-container">
        <input 
          onChange={handleColorChange} 
          type="radio" 
          value="white" 
          name="color-filter" 
        />
        <span 
          className="checkmark" 
          style={{ background: "white", border: "2px solid black" }}
        ></span>
        White
      </label>
    </div>
  );
};

export default Colors;
