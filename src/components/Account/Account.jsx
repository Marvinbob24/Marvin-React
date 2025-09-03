import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../Context/UserContext";
import "./Account.css";

const Account = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ fullName: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useContext(UserContext);
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setError("");
    setFormData({ fullName: "", email: "", password: "" });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const url = isLogin
        ? `${API_URL}/api/users/login`
        : `${API_URL}/api/users/register`;

      const data = isLogin
        ? { email: formData.email, password: formData.password }
        : { fullName: formData.fullName, email: formData.email, password: formData.password };

      const res = await axios.post(url, data, { headers: { "Content-Type": "application/json" } });

      const user = res.data.user;
      const token = res.data.token;

      // Debug: see what the server returns
      console.log("Logged in user:", user);

      if (token) {
        // TEMP: Ensure isAdmin exists for testing (remove in production)
        if (user.isAdmin === undefined) user.isAdmin = false;

        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        login(user, token);

        // Navigate based on admin flag
        navigate(user.isAdmin ? "/admin" : "/dashboard");
      } else {
        setError(res.data.message || "Registration successful! Please log in.");
        toggleForm();
      }
    } catch (err) {
      console.error("Login/Register error:", err.response?.data || err);
      setError(err.response?.data?.message || "Network error: Could not reach the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="account-container">
      <div className="account-box">
        <h2>{isLogin ? "Login" : "Register"}</h2>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Please wait..." : isLogin ? "Login" : "Register"}
          </button>
        </form>

        {/* Toggle Login/Register */}
        <p
          className="toggle"
          onClick={toggleForm}
          style={{ cursor: "pointer", marginTop: "10px" }}
        >
          {isLogin
            ? "Don't have an account? Register"
            : "Already have an account? Login"}
        </p>

        {/* Forgot password */}
        {isLogin && (
          <p
            className="forgot-password"
            onClick={() => navigate("/forgot-password")}
            style={{ cursor: "pointer", color: "#007bff", marginTop: "5px" }}
          >
            Forgotten Password? Click here
          </p>
        )}

        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
};

export default Account;
