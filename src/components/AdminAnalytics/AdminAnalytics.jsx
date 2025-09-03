import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../../Context/UserContext";
import { useNavigate } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "./AdminAnalytics.css";

const AdminAnalytics = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  useEffect(() => {
    if (!user || !user.isAdmin) {
      navigate("/account");
      return;
    }

    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const res = await axios.get(`${API_URL}/api/orders/admin-stats`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStats(res.data);
        setError(null);
      } catch (err) {
        console.error("AxiosError", err);
        setError("Failed to load analytics");
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [user, navigate, API_URL]);

  if (loading) return <p>Loading analytics...</p>;
  if (error) return <p className="error">{error}</p>;
  if (!stats) return null;

  // Convert statusCounts array to chart-friendly format
  const chartData = stats.statusCounts.map((item) => ({
    status: item._id,
    count: item.count,
  }));

  return (
    <div className="admin-analytics-container">
      <h1>Admin Analytics</h1>

      <div className="analytics-summary">
        <div className="summary-card">
          <h3>Total Orders</h3>
          <p>{stats.totalOrders}</p>
        </div>
        <div className="summary-card">
          <h3>Total Revenue</h3>
          <p>₦{stats.totalRevenue.toLocaleString()}</p>
        </div>
      </div>

      <div className="analytics-chart">
        <h3>Orders by Status</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <XAxis dataKey="status" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AdminAnalytics;
