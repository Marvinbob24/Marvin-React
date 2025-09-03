import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../Context/UserContext";
import { useNavigate } from "react-router-dom";
import { FaUsers, FaShoppingCart, FaBoxOpen, FaBoxes, FaChartLine } from "react-icons/fa";
import axios from "axios";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const { user, loading } = useContext(UserContext); // get loading
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  const [stats, setStats] = useState({
    usersCount: 0,
    ordersCount: 0,
    productsCount: 0,
    inventoryCount: 0,
    totalSales: 0,
  });
  const [statsLoading, setStatsLoading] = useState(true);

  // Wait until UserContext finishes loading before redirecting
  useEffect(() => {
    if (!loading) {
      if (!user || !user.isAdmin) {
        console.log("Redirecting non-admin user to /account");
        navigate("/account");
      } else {
        console.log("Admin user detected:", user);
      }
    }
  }, [loading, user, navigate]);

  // Fetch admin stats
  useEffect(() => {
    const fetchStats = async () => {
      if (!user || !user.isAdmin) return;

      try {
        setStatsLoading(true);
        const token = localStorage.getItem("token");
        const [usersRes, ordersRes, productsRes, inventoryRes, analyticsRes] =
          await Promise.all([
            axios.get(`${API_URL}/api/admin/users/count`, { headers: { Authorization: `Bearer ${token}` } }),
            axios.get(`${API_URL}/api/admin/orders/count`, { headers: { Authorization: `Bearer ${token}` } }),
            axios.get(`${API_URL}/api/admin/products/count`, { headers: { Authorization: `Bearer ${token}` } }),
            axios.get(`${API_URL}/api/admin/inventory/count`, { headers: { Authorization: `Bearer ${token}` } }),
            axios.get(`${API_URL}/api/admin/analytics/summary`, { headers: { Authorization: `Bearer ${token}` } }),
          ]);

        setStats({
          usersCount: usersRes.data.count,
          ordersCount: ordersRes.data.count,
          productsCount: productsRes.data.count,
          inventoryCount: inventoryRes.data.totalStock,
          totalSales: analyticsRes.data.totalSales,
        });
      } catch (err) {
        console.error("Error fetching admin stats:", err.response?.data || err);
      } finally {
        setStatsLoading(false);
      }
    };

    fetchStats();
  }, [user, API_URL]);

  if (loading) return <p>Loading user info...</p>;
  if (!user || !user.isAdmin) return null; 

  return (
    <div className="admin-dashboard-container">
      <h1 className="admin-dashboard-title">Admin Dashboard</h1>
      <p className="admin-dashboard-welcome">Welcome, {user.fullName}</p>

      <div className="admin-dashboard-grid">
        <div className="admin-dashboard-card">
          <FaUsers className="admin-dashboard-icon" />
          <h3>Manage Users</h3>
          <p>Registered users: {statsLoading ? "..." : stats.usersCount}</p>
        </div>

        <div className="admin-dashboard-card">
          <FaShoppingCart className="admin-dashboard-icon" />
          <h3>All Orders</h3>
          <p>Total orders: {statsLoading ? "..." : stats.ordersCount}</p>
        </div>

        <div className="admin-dashboard-card">
          <FaBoxOpen className="admin-dashboard-icon" />
          <h3>Products</h3>
          <p>Total products: {statsLoading ? "..." : stats.productsCount}</p>
        </div>

        {/* <div className="admin-dashboard-card">
          <FaBoxes className="admin-dashboard-icon" />
          <h3>Inventory</h3>
          <p>Total stock: {statsLoading ? "..." : stats.inventoryCount}</p>
        </div> */}

        <div className="admin-dashboard-card">
          <FaChartLine className="admin-dashboard-icon" />
          <h3>Analytics</h3>
          <p>Total sales: ₦{statsLoading ? "..." : stats.totalSales.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
