import React from "react";

const CartTotal = ({ total, onQuickCheckout, onDetailedCheckout }) => {
  return (
    <div className="cart-total">
      <h3>Total: ₦{total.toLocaleString()}</h3>
      <div className="checkout-options">
        <button className="simple-checkout-btn" onClick={onQuickCheckout}>
          Quick Checkout
        </button>
        <button className="detailed-checkout-btn" onClick={onDetailedCheckout}>
          Detailed Checkout
        </button>
      </div>
    </div>
  );
};

export default CartTotal;
