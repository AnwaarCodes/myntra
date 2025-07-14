import React from 'react';

const BagItem = ({ item, onRemove }) => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 border rounded-lg shadow-sm bg-white">
      
      
      <img
        className="w-24 h-24 object-contain"
        src={item.image}
        alt="item"
      />

      <div className="flex-1 text-center sm:text-left">
        {/* <div className="text-sm text-gray-500 mb-1">
          {item.rating.rate} ⭐ | {item.rating.count} ratings
        </div> */}
        <div className="text-blue-600 font-semibold text-sm uppercase tracking-wide">
          {item.category}
        </div>
        <div className="text-lg font-bold text-gray-800 line-clamp-2 mt-1">
          {item.title}
        </div>
      </div>

      {/* Remove Button */}
      <button
        onClick={onRemove}
        className="text-sm bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition"
      >
        Remove
      </button>
    </div>
  );
};

export default BagItem;
