import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../../Context/UserContext";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

const AdminProducts = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Redirect non-admins
  useEffect(() => {
    if (!user || !user.isAdmin) {
      navigate("/account");
    }
  }, [user, navigate]);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await axios.get(`${API_URL}/api/products/get`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setProducts(res.data.products);
        setError(null);
      } catch (err) {
        console.error("Error fetching products:", err.response?.data || err.message);
        setError(err.response?.data?.message || "Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [API_URL]);

  // Delete product
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_URL}/api/products/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setProducts(products.filter(p => p._id !== id));
      alert("Product deleted successfully");
    } catch (err) {
      console.error("Error deleting product:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Failed to delete product");
    }
  };

  if (!user || !user.isAdmin) return null;

  if (loading) return <div className="admin-products-container"><p>Loading products...</p></div>;
  if (error) return <div className="admin-products-container"><p className="error">{error}</p></div>;

  return (
    <div className="admin-products-container">
      <h2>Manage Products</h2>

      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="table-responsive">
          <table className="admin-products-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price (₦)</th>
                <th>Stock</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(p => (
                <tr key={p._id}>
                  <td>{p._id.slice(-6).toUpperCase()}</td>
                  <td>{p.name}</td>
                  <td>{p.category}</td>
                  <td>{p.price.toLocaleString()}</td>
                  <td>{p.stock}</td>
                  <td>
                    <button onClick={() => handleDelete(p._id)} className="delete-btn">
                      Delete
                    </button>
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

export default AdminProducts;
