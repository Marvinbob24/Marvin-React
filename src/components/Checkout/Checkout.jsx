// src/components/Checkout/Checkout.jsx
import React, { useState } from "react";
import axios from "axios";
import "./Checkout.css";

const Checkout = ({ cart, onOrderComplete }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    shippingAddress: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: ""
    },
    paymentMethod: "credit_card"
  });

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name.startsWith("shipping.")) {
      const field = name.split(".")[1];
      setFormData(prev => ({
        ...prev,
        shippingAddress: {
          ...prev.shippingAddress,
          [field]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      setError(null);
      
      const token = localStorage.getItem("token");
      await axios.post(
        `${API_URL}/api/orders/create`,
        {
          cartId: cart._id,
          ...formData
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      alert("Order placed successfully!");
      if (onOrderComplete) onOrderComplete();
      
    } catch (err) {
      console.error("Checkout error:", err);
      setError(err.response?.data?.message || "Failed to process order");
    } finally {
      setLoading(false);
    }
  };

  if (!cart || cart.products.length === 0) {
    return <div className="checkout-container"><p>Your cart is empty.</p></div>;
  }

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      
      <div className="order-summary">
        <h3>Order Summary</h3>

        {/* List each item */}
        <ul className="order-items">
          {cart.products.map((item, index) => (
            <li key={index} className="order-item">
              <span>{item.productId?.name || "Product"}</span>
              <span>
                ₦{(item.productId?.price || item.price).toLocaleString()} × {item.quantity}
              </span>
            </li>
          ))}
        </ul>

        {/* Totals */}
        <p><strong>Items:</strong> {cart.products.length}</p>
        <p><strong>Total:</strong> ₦{cart.total.toLocaleString()}</p>
      </div>

      <form onSubmit={handleSubmit} className="checkout-form">
        <div className="form-section">
          <h3>Shipping Information</h3>
          
          <div className="form-group">
            <label>Street Address</label>
            <input
              type="text"
              name="shipping.street"
              value={formData.shippingAddress.street}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>City</label>
            <input
              type="text"
              name="shipping.city"
              value={formData.shippingAddress.city}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>State</label>
            <input
              type="text"
              name="shipping.state"
              value={formData.shippingAddress.state}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>ZIP Code</label>
            <input
              type="text"
              name="shipping.zipCode"
              value={formData.shippingAddress.zipCode}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Country</label>
            <input
              type="text"
              name="shipping.country"
              value={formData.shippingAddress.country}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="form-section">
          <h3>Payment Method</h3>
          
          <div className="form-group">
            <select
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleInputChange}
              required
            >
              <option value="credit_card">Credit Card</option>
              <option value="paypal">PayPal</option>
              <option value="stripe">Stripe</option>
              <option value="cash_on_delivery">Cash on Delivery</option>
            </select>
          </div>
        </div>

        {error && <div className="error-message">{error}</div>}

        <button 
          type="submit" 
          className="place-order-btn"
          disabled={loading}
        >
          {loading ? "Processing..." : "Place Order"}
        </button>
      </form>
    </div>
  );
};

export default Checkout;
