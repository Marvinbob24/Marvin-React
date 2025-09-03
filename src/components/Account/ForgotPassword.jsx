// src/components/Account/ForgotPassword.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Account.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const res = await axios.post(
        `${API_URL}/api/users/forgot-password`,
        { email },
        { headers: { "Content-Type": "application/json" } }
      );

      setMessage(res.data.message || "Check your email for reset instructions.");
      setEmail("");
    } catch (err) {
      setError(err.response?.data?.message || "Network error. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="account-container">
      <div className="account-box">
        <h2>Forgot Password</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
        {message && <p className="success">{message}</p>}
        {error && <p className="error">{error}</p>}
        <p
          className="toggle"
          onClick={() => navigate("/account")}
          style={{ cursor: "pointer" }}
        >
          Back to Login
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
