// import React, { useState, useEffect, useContext } from "react";
// import axios from "axios";
// import { UserContext } from "../../Context/UserContext";
// import { useNavigate } from "react-router-dom";
// import "./AdminDashboard.css";

// const AdminOrders = () => {
//   const { user } = useContext(UserContext);
//   const navigate = useNavigate();
//   const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Redirect non-admins
//   useEffect(() => {
//     if (!user || !user.isAdmin) navigate("/account");
//   }, [user, navigate]);

//   // Fetch orders
//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         setLoading(true);
//         const token = localStorage.getItem("token");
//         const res = await axios.get(`${API_URL}/api/admin/orders`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setOrders(res.data);
//         setError(null);
//       } catch (err) {
//         console.error("Error fetching orders:", err.response?.data || err.message);
//         setError(err.response?.data?.message || "Failed to fetch orders");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrders();
//   }, [API_URL]);

//   // Update order status
//   const handleStatusChange = async (orderId, newStatus) => {
//     try {
//       const token = localStorage.getItem("token");
//       await axios.put(
//         `${API_URL}/api/admin/orders/${orderId}/status`,
//         { status: newStatus },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setOrders(prev =>
//         prev.map(order =>
//           order._id === orderId ? { ...order, status: newStatus } : order
//         )
//       );
//       alert("Order status updated");
//     } catch (err) {
//       console.error("Error updating status:", err.response?.data || err.message);
//       alert(err.response?.data?.message || "Failed to update order status");
//     }
//   };

//   if (!user || !user.isAdmin) return null;

//   if (loading)
//     return (
//       <div className="admin-orders-container">
//         <p>Loading orders...</p>
//       </div>
//     );

//   if (error)
//     return (
//       <div className="admin-orders-container">
//         <p className="error">{error}</p>
//       </div>
//     );

//   return (
//     <div className="admin-orders-container">
//       <h2>All Orders</h2>
//       {orders.length === 0 ? (
//         <p>No orders found.</p>
//       ) : (
//         <div className="table-responsive">
//           <table className="admin-orders-table">
//             <thead>
//               <tr>
//                 <th>ID</th>
//                 <th>User</th>
//                 <th>Total (₦)</th>
//                 <th>Status</th>
//                 <th>Products</th>
//                 <th>Shipping Address</th>
//                 <th>Phone</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {orders.map(order => (
//                 <tr key={order._id}>
//                   <td>{order._id.slice(-6).toUpperCase()}</td>
//                   <td>{order.userId?.fullName || "Unknown"}</td>
//                   <td>{order.total.toLocaleString()}</td>
//                   <td>{order.status}</td>
//                   <td>
//                     {order.products.map(p => (
//                       <div key={p.productId?._id || p._id}>
//                         {p.productId?.name || p.name} x {p.quantity}
//                       </div>
//                     ))}
//                   </td>
//                   <td>
//                     {order.shippingAddress ? (
//                       <>
//                         {order.shippingAddress.address}, {order.shippingAddress.city}
//                         <br />
//                         {order.shippingAddress.state}, {order.shippingAddress.country}
//                         <br />
//                         Postal Code: {order.shippingAddress.postalCode}
//                       </>
//                     ) : (
//                       "No address"
//                     )}
//                   </td>
//                   <td>
//                     {order.shippingAddress?.phoneNumber || "N/A"}
//                   </td>
//                   <td>
//                     <select
//                       value={order.status}
//                       onChange={e => handleStatusChange(order._id, e.target.value)}
//                     >
//                       <option value="Pending">Pending</option>
//                       <option value="Processing">Processing</option>
//                       <option value="Shipped">Shipped</option>
//                       <option value="Delivered">Delivered</option>
//                       <option value="Cancelled">Cancelled</option>
//                     </select>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminOrders;


import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../../Context/UserContext";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

const AdminOrders = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortOrder, setSortOrder] = useState("newest"); // ✅ default: newest first

  // Redirect non-admins
  useEffect(() => {
    if (!user || !user.isAdmin) navigate("/account");
  }, [user, navigate]);

  // Fetch orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const res = await axios.get(`${API_URL}/api/admin/orders`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setOrders(res.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching orders:", err.response?.data || err.message);
        setError(err.response?.data?.message || "Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [API_URL]);

  // Update order status
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${API_URL}/api/admin/orders/${orderId}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setOrders(prev =>
        prev.map(order =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
      alert("Order status updated");
    } catch (err) {
      console.error("Error updating status:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Failed to update order status");
    }
  };

  // Format date like "Sep 3, 2025 • 14:32"
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    const date = new Date(dateString);
    return `${date.toLocaleDateString(undefined, options)} • ${date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
  };

  // ✅ Sort orders dynamically
  const sortedOrders = [...orders].sort((a, b) => {
    if (sortOrder === "newest") {
      return new Date(b.createdAt) - new Date(a.createdAt); // newest first
    } else {
      return new Date(a.createdAt) - new Date(b.createdAt); // oldest first
    }
  });

  if (!user || !user.isAdmin) return null;

  if (loading)
    return (
      <div className="admin-orders-container">
        <p>Loading orders...</p>
      </div>
    );

  if (error)
    return (
      <div className="admin-orders-container">
        <p className="error">{error}</p>
      </div>
    );

  return (
    <div className="admin-orders-container">
      <div className="admin-orders-header">
        <h2>All Orders</h2>

        {/* ✅ Sort dropdown */}
        <div className="sort-container">
          <label htmlFor="sortOrder">Sort By: </label>
          <select
            id="sortOrder"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>
      </div>

      {sortedOrders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="table-responsive">
          <table className="admin-orders-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>User</th>
                <th>Total (₦)</th>
                <th>Status</th>
                <th>Products</th>
                <th>Shipping Address</th>
                <th>Phone</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedOrders.map(order => (
                <tr key={order._id}>
                  <td>{order._id.slice(-6).toUpperCase()}</td>
                  <td>{order.userId?.fullName || "Unknown"}</td>
                  <td>{order.total.toLocaleString()}</td>
                  <td>{order.status}</td>
                  <td>
                    {order.products.map(p => (
                      <div key={p.productId?._id || p._id}>
                        {p.productId?.name || p.name} x {p.quantity}
                      </div>
                    ))}
                  </td>
                  <td>
                    {order.shippingAddress ? (
                      <>
                        {order.shippingAddress.address}, {order.shippingAddress.city}
                        <br />
                        {order.shippingAddress.state}, {order.shippingAddress.country}
                        <br />
                        Postal Code: {order.shippingAddress.postalCode}
                      </>
                    ) : (
                      "No address"
                    )}
                  </td>
                  <td>{order.shippingAddress?.phoneNumber || "N/A"}</td>
                  <td>{formatDate(order.createdAt)}</td>
                  <td>
                    <select
                      value={order.status}
                      onChange={e => handleStatusChange(order._id, e.target.value)}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
