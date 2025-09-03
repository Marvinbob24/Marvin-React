// src/components/Orders/OrderDetails.jsx
import React from "react";
import "./Orders.css";

const OrderDetails = ({ order }) => {
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  return (
    <div className="order-details">
      <h4>Order Details</h4>

      <div className="products-list">
        <h5>Products:</h5>
        {order.products.map((item, index) => (
          <div key={index} className="order-product">
            <img
              src={`${API_URL}${item.productId?.imageUrl || item.imageUrl || "/images/placeholder.jpg"}`}
              alt={item.productId?.name || item.name || "Product"}
            />
            <div className="product-info">
              <div className="product-name">
                {item.productId?.name || item.name || "Unknown Product"}
              </div>
              <div className="product-price">
                ₦{(item.productId?.price || item.price || 0).toLocaleString()}
              </div>
              <div className="product-quantity">
                Quantity: {item.quantity}
              </div>
            </div>
          </div>
        ))}
      </div>

      {order.shippingAddress && (
        <div className="shipping-info">
          <h5>Shipping Address:</h5>
          <p>
            {order.shippingAddress.street}<br />
            {order.shippingAddress.city}, {order.shippingAddress.zipCode}<br />
            {order.shippingAddress.country}
          </p>
        </div>
      )}

      <div className="payment-info">
        <h5>Payment Method:</h5>
        <p>{order.paymentMethod?.replace("_", " ").toUpperCase() || "Not specified"}</p>
      </div>
    </div>
  );
};

export default OrderDetails;
