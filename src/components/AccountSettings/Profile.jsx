import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../../Context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Profile.css";

const Profile = () => {
  const { user, login, loading } = useContext(UserContext);
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  const [profileData, setProfileData] = useState({ fullName: "", email: "" });
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!loading && !user) navigate("/account");
    if (user) setProfileData({ fullName: user.fullName, email: user.email });
  }, [user, loading, navigate]);

  if (loading) return <p>Loading profile...</p>;
  if (!user) return null;

  const handleChange = (e) => setProfileData({ ...profileData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");
    try {
      const res = await axios.put(`${API_URL}/api/users/update-profile`, profileData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      login(res.data.user, localStorage.getItem("token"));
      setMessage("Profile updated successfully!");
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="account-container">
      <h2>Update Profile</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" name="fullName" value={profileData.fullName} onChange={handleChange} required />
        <input type="email" name="email" value={profileData.email} onChange={handleChange} required />
        <button type="submit" disabled={saving}>{saving ? "Saving..." : "Update Profile"}</button>
      </form>
    </div>
  );
};

export default Profile;
