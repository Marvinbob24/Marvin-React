// src/components/Orders/OrderList.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import OrderItem from "./OrderItem";
import "./Orders.css";

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");

        if (!token) {
          setError("Please log in to view your orders (prices shown in ₦)");
          setLoading(false);
          return;
        }

        const response = await axios.get(`${API_URL}/api/orders/my-orders`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setOrders(response.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError(err.response?.data?.message || "Failed to fetch orders (prices are in ₦)");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [API_URL]);

  if (loading)
    return (
      <div className="orders-container">
        <p>Loading orders...</p>
      </div>
    );

  if (error)
    return (
      <div className="orders-container">
        <p className="error">{error}</p>
      </div>
    );

  if (orders.length === 0)
    return (
      <div className="orders-container">
        <h2>Your Orders</h2>
        <p>You haven't placed any orders yet. All prices are shown in ₦.</p>
      </div>
    );

  return (
    <div className="orders-container">
      <h2>Your Orders</h2>
      <div className="orders-list">
        {orders.map(order => (
          <OrderItem key={order._id} order={order} />
        ))}
      </div>
    </div>
  );
};

export default OrderList;
