import React from 'react';


const BagItem = ({ item, onRemove }) => {
  return (
    <div className="bag-item">
      <img className="item-image" src={item.image} alt="item image" />
        <div className="rating">
        {item.rating.rate} | {item.rating.count}
        </div>
        <div className="company-name">{item.category}</div>
        <div className="item-name">{item.title}</div>
      <button className="btn-remove" onClick={onRemove}>Remove</button>
    </div>
  );
};

export default BagItem;

