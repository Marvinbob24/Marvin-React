import React, { useContext, useEffect } from "react";
import { UserContext } from "../../Context/UserContext";
import { useNavigate } from "react-router-dom";
import Profile from "./Profile";
import ChangePassword from "./ChangePassword";
import "./AccountSettings.css";

const AccountSettings = () => {
  const { user, loading } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) navigate("/account");
  }, [user, loading, navigate]);

  if (loading) return <p className="account-loading">Loading account settings...</p>;
  if (!user) return null;

  return (
    <div className="account-container">
      <h1>Account Settings</h1>

      <div className="account-section">
        <h2>Profile</h2>
        <Profile />
      </div>

      <div className="account-section">
        <h2>Password</h2>
        <ChangePassword />
      </div>
    </div>
  );
};

export default AccountSettings;
