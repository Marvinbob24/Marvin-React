import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../../Context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./ChangePassword.css";


const ChangePassword = () => {
  const { user, loading } = useContext(UserContext);
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  const [passwordData, setPasswordData] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!loading && !user) navigate("/account");
  }, [user, loading, navigate]);

  if (loading) return <p>Loading password settings...</p>;
  if (!user) return null;

  const handleChange = (e) => setPasswordData({ ...passwordData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage("New password and confirmation do not match.");
      return;
    }
    setSaving(true);
    setMessage("");
    try {
      await axios.put(`${API_URL}/api/users/change-password`, passwordData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
      setMessage("Password changed successfully!");
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to change password.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="account-container">
      <h2>Change Password</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input type="password" name="currentPassword" value={passwordData.currentPassword} onChange={handleChange} placeholder="Current Password" required />
        <input type="password" name="newPassword" value={passwordData.newPassword} onChange={handleChange} placeholder="New Password" required />
        <input type="password" name="confirmPassword" value={passwordData.confirmPassword} onChange={handleChange} placeholder="Confirm New Password" required />
        <button type="submit" disabled={saving}>{saving ? "Updating..." : "Change Password"}</button>
      </form>
    </div>
  );
};

export default ChangePassword;
