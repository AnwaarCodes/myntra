import React from "react";
import { Link } from "react-router-dom";

const BagSummary = ({ cartItems }) => {
  const totalItem = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalMRP = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );
  const discount = Math.floor(totalMRP * 0.2); // 20% fake discount
  const convenienceFee = 99;
  const finalPayment = totalMRP - discount + convenienceFee;

  return (
    <div className="bag-summary">
      <div className="bag-summary-title">
        PRICE DETAILS ({totalItem} item{totalItem !== 1 ? "s" : ""})
      </div>

      <div className="bag-summary-row">
        <span>Total MRP</span>
        <span>₹{totalMRP}</span>
      </div>

      <div className="bag-summary-row discount">
        <span>Discount</span>
        <span>-₹{discount}</span>
      </div>

      <div className="bag-summary-row">
        <span>Convenience Fee</span>
        <span>₹{convenienceFee}</span>
      </div>

      <hr style={{ margin: "16px 0" }} />

      <div className="bag-summary-row bag-summary-total">
        <span>Total Amount</span>
        <span>₹{finalPayment}</span>
      </div>

      <div className="mt-6">
        <Link to="/placeorder">
          <button className="bag-summary-btn">Place Order</button>
        </Link>
      </div>
    </div>
  );
};

export default BagSummary;
