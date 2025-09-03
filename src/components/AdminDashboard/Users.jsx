import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminDashboard.css";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        if (!token) {
          setError("You must be logged in as admin");
          setLoading(false);
          return;
        }

        const res = await axios.get(`${API_URL}/api/admin/users`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUsers(res.data);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || "Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [API_URL, token]);

  if (loading) return <p>Loading users...</p>;
  if (error) return <p>{error}</p>;
  if (!users.length) return <p>No users found.</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Registered Users</h2>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id} style={{ borderBottom: "1px solid #ccc" }}>
              <td>{user._id.slice(-6).toUpperCase()}</td>
              <td>{user.fullName}</td>
              <td>{user.email}</td>
              <td>{user.isAdmin ? "Admin" : "User"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
