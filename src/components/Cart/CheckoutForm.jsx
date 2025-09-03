import React from "react";
import { toast } from "react-toastify";

const CheckoutForm = ({ checkoutForm, onChange, onCancel, onSubmit, orderId }) => {
  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!checkoutForm.shippingAddress.fullName || !checkoutForm.shippingAddress.address) {
      toast.warn("FanGear Central ⚠️ Please fill in all required fields");
      return;
    }

    onSubmit();
  };

  return (
    <div className="checkout-modal">
      <h2>Checkout</h2>
      <form className="checkout-form" onSubmit={handleSubmit}>
        {/* Shipping Fields */}
        {Object.keys(checkoutForm.shippingAddress).map((key) => (
          <div className="form-group" key={key}>
            <label>{key.charAt(0).toUpperCase() + key.slice(1)}</label>
            <input
              type={key === "phoneNumber" ? "tel" : "text"}
              name={`shipping.${key}`}
              value={checkoutForm.shippingAddress[key]}
              onChange={onChange}
              required
            />
          </div>
        ))}

        {/* Payment Instructions */}
        <div className="form-group">
          <label>Payment Instructions</label>
          <div className="payment-instructions">
            <p>
              {/* Our payment system is experiencing minor issues.*/} For now, please make payment to any of the following Nigerian accounts:
            </p>
            <ul>
              <li>GTBank: 0123456789</li>
              <li>UBA: 9876543210</li>
              <li>Access Bank: 1122334455</li>
            </ul>
            <p>
              After making payment, please chat the admin on WhatsApp at{" "}
              <a
                href={`https://wa.me/2349132324889?text=Hello%20Admin,%20I%20have%20made%20payment.`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "green", fontWeight: "bold" }}
              >
                +2349132324889
              </a>{" "}
              with:  <strong>  {orderId || "Your Order ID"}</strong> and proof of payment.
            </p>

            <p>We apologize for the inconvenience and appreciate your understanding.</p>
          </div>
        </div>

        <div className="checkout-actions">
          <button type="button" className="cancel-btn" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="place-order-btn">
            Place Order
          </button>
        </div>
      </form>
    </div>
  );
};

export default CheckoutForm;
