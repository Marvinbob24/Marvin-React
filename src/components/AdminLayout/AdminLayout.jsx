import React, { useContext } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  FaUsers,
  FaShoppingCart,
  FaBoxOpen,
  FaBoxes,
  FaChartLine,
  FaSignOutAlt,
  FaHome
} from "react-icons/fa";
import { UserContext } from "../../Context/UserContext";
import "./AdminLayout.css";

const AdminLayout = () => {
  const navigate = useNavigate();
  const { logout } = useContext(UserContext);

  const handleLogout = () => {
    logout(); 
    navigate("/account"); 
  };

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <h2 className="admin-logo">Admin Panel</h2>
        <nav className="admin-nav">
          <NavLink
            to="/admin/users"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <FaUsers /> Users
          </NavLink>
          <NavLink
            to="/admin/orders"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <FaShoppingCart /> Orders
          </NavLink>
          <NavLink
            to="/admin/products"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <FaBoxOpen /> Products
          </NavLink>
          {/* <NavLink
            to="/admin/inventory"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <FaBoxes /> Inventory
          </NavLink> */}
          <NavLink
            to="/admin/analytics"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <FaChartLine /> Analytics
          </NavLink>

          {/* Back to Home Button */}
          <button className="home-btn" onClick={() => navigate("/")}>
            <FaHome /> Back to Home
          </button>

          {/* Logout Button */}
          <button className="logout-btn" onClick={handleLogout}>
            <FaSignOutAlt /> Logout
          </button>
        </nav>
      </aside>

      {/* Main content */}
      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
