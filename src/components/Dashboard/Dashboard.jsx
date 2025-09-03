// import React, { useContext } from "react";
// import "./Dashboard.css";
// import { FaShoppingCart, FaUser, FaPaintBrush } from "react-icons/fa";
// import { UserContext } from "../../Context/UserContext";
// import { useNavigate } from "react-router-dom";
// import Layout from "../Layouts/Layout";

// const Dashboard = () => {
//   const { user } = useContext(UserContext);
//   const navigate = useNavigate();

//   if (!user) {
//     // Redirect to account page if not logged in
//     navigate("/account");
//     return null;
//   }

//   return (
//     <Layout>
//       <div className="dashboard-container">
//         <h1 className="dashboard-title">Welcome, {user.fullName}!</h1>
//         <p className="dashboard-email">{user.email}</p>

//         <div className="dashboard-grid">
//           <div className="dashboard-card">
//             <FaShoppingCart className="dashboard-icon" />
//             <h3>My Orders</h3>
//             <p>View and track all your orders.</p>
//             <button onClick={() => navigate("/orders")}>View Orders</button>
//           </div>

//           <div className="dashboard-card">
//             <FaPaintBrush className="dashboard-icon" />
//             <h3>Fan Art Submissions</h3>
//             <p>View our Fan Art Wears.</p>
//             <button onClick={() => navigate("/collections/fanart")}>
//               View Fan Art
//             </button>
//           </div>

//           <div className="dashboard-card">
//             <FaUser className="dashboard-icon" />
//             <h3>Account Settings</h3>
//             <p>Update your profile and password.</p>
//             <button onClick={() => navigate("/account/settings")}>Manage Account</button>
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default Dashboard;


import React, { useContext } from "react";
import "./Dashboard.css";
import { FaShoppingCart, FaUser, FaPaintBrush, FaSignOutAlt } from "react-icons/fa";
import { UserContext } from "../../Context/UserContext";
import { useNavigate } from "react-router-dom";
import Layout from "../Layouts/Layout";

const Dashboard = () => {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();

  if (!user) {
    navigate("/account");
    return null;
  }

  const handleLogout = () => {
    logout(); // clear context and localStorage
    navigate("/account"); // redirect to login page
  };

  return (
    <Layout>
      <div className="dashboard-container">
        <h1 className="dashboard-title">Welcome, {user.fullName}!</h1>
        <p className="dashboard-email">{user.email}</p>

        {/* Spacer */}
        <div style={{ margin: "2rem 0" }}></div>

        <div className="dashboard-grid">
          <div className="dashboard-card">
            <FaShoppingCart className="dashboard-icon" />
            <h3>My Orders</h3>
            <p>View and track all your orders.</p>
            <button onClick={() => navigate("/orders")}>View Orders</button>
          </div>

          <div className="dashboard-card">
            <FaPaintBrush className="dashboard-icon" />
            <h3>Fan Art Submissions</h3>
            <p>View our Fan Art Wears.</p>
            <button onClick={() => navigate("/collections/fanart")}>
              View Fan Art
            </button>
          </div>

          <div className="dashboard-card">
            <FaUser className="dashboard-icon" />
            <h3>Account Settings</h3>
            <p>Update your profile and password.</p>
            <button onClick={() => navigate("/account/settings")}>Manage Account</button>
          </div>
        </div>

        {/* Logout button at the bottom */}
        <div className="dashboard-logout">
          <button className="logout-btn" onClick={handleLogout}>
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
