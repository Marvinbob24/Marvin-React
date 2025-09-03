// // src/components/Orders/OrderItem.jsx
// import React, { useState } from "react";
// import OrderDetails from "./OrderDetails";
// import "./Orders.css";

// const OrderItem = ({ order }) => {
//   const [showDetails, setShowDetails] = useState(false);

//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   };

//   const getStatusClass = (status) => {
//     switch (status) {
//       case "delivered": return "status-delivered";
//       case "shipped": return "status-shipped";
//       case "processing": return "status-processing";
//       case "cancelled": return "status-cancelled";
//       default: return "status-pending";
//     }
//   };

//   return (
//     <div className="order-item">
//       <div
//         className="order-summary"
//         onClick={() => setShowDetails(!showDetails)}
//       >
//         <div className="order-info">
//           <div className="order-id">
//             Order #: {order._id.slice(-8).toUpperCase()}
//           </div>
//           <div className="order-date">
//             Placed on: {formatDate(order.createdAt)}
//           </div>
//           <div className="order-total">
//             Total: ₦{(order.total || 0).toLocaleString()}
//           </div>
//         </div>
//         <div className="order-status">
//           <span className={`status-badge ${getStatusClass(order.status)}`}>
//             {order.status}
//           </span>
//         </div>
//         <div className="order-toggle">{showDetails ? "▲" : "▼"}</div>
//       </div>

//       {showDetails && <OrderDetails order={order} />}
//     </div>
//   );
// };

// export default OrderItem;


// src/components/Orders/OrderItem.jsx
import React, { useState } from "react";
import OrderDetails from "./OrderDetails";
import "./Orders.css";

const OrderItem = ({ order }) => {
  const [showDetails, setShowDetails] = useState(false);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // ✅ Convert status to lowercase for CSS class matching
  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case "delivered": return "status-delivered";
      case "shipped": return "status-shipped";
      case "processing": return "status-processing";
      case "cancelled": return "status-cancelled";
      default: return "status-pending";
    }
  };

  // ✅ Capitalize first letter for display
  const formatStatusText = (status) => {
    if (!status) return "";
    return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
  };

  return (
    <div className="order-item">
      <div
        className="order-summary"
        onClick={() => setShowDetails(!showDetails)}
      >
        <div className="order-info">
          <div className="order-id">
            Order #: {order._id.slice(-8).toUpperCase()}
          </div>
          <div className="order-date">
            Placed on: {formatDate(order.createdAt)}
          </div>
          <div className="order-total">
            Total: ₦{(order.total || 0).toLocaleString()}
          </div>
        </div>
        <div className="order-status">
          <span className={`status-badge ${getStatusClass(order.status)}`}>
            {formatStatusText(order.status)}
          </span>
        </div>
        <div className="order-toggle">{showDetails ? "▲" : "▼"}</div>
      </div>

      {showDetails && <OrderDetails order={order} />}
    </div>
  );
};

export default OrderItem;
