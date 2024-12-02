import React from 'react'

const BagSummary = () => {


    const bagSummary = {
        totalItem: 3, 
        totalMRP: 345,
        totalDiscount:999,
        finalPayment:1346,
    }


  return (
    <>
     <div className="bag-summary">
    
     <div class="bag-details-container">
    <div class="price-header">PRICE DETAILS ({bagSummary.totalItem} Items) </div>
    <div class="price-item">
      <span class="price-item-tag">Total MRP</span>
      <span class="price-item-value">₹{bagSummary.totalMRP}</span>
    </div>
    <div class="price-item">
      <span class="price-item-tag">Discount on MRP</span>
      <span class="price-item-value priceDetail-base-discount">-₹{bagSummary.totalDiscount}</span>
    </div>
    <div class="price-item">
      <span class="price-item-tag">Convenience Fee</span>
      <span class="price-item-value">₹99</span>
    </div>
    <hr/>
    <div class="price-footer">
      <span class="price-item-tag">Total Amount</span>
      <span class="price-item-value">₹{bagSummary.finalPayment}</span>
    </div>
  </div>
  <button class="btn-place-order">
    <div class="css-xjhrni">PLACE ORDER</div>
  </button>
  </div>
    </>
  )
}

export default BagSummary