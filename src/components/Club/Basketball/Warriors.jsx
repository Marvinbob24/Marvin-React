// src/components/Club/Football/Warriors.jsx
import React, { useState, useEffect, useContext } from 'react';
import Layout from '../../Layouts/Layout';
import ProductForm from '../../ProductForm/ProductForm';
import axios from 'axios';
import { UserContext } from '../../../Context/UserContext';
import '../Footbal.css';

const Warriors = () => {
  const { user } = useContext(UserContext);
  const [warriorsProducts, setWarriorsProducts] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  // Fetch Warriors products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/products/get`);
        const warriorsOnly = res.data.products.filter(p => p.category === "Warriors");
        setWarriorsProducts(warriorsOnly);
      } catch (err) {
        console.error("Error fetching Warriors products:", err);
      }
    };
    fetchProducts();
  }, []);

  // Handle new product added via ProductForm
  const handleNewProduct = (newProduct) => {
    if (newProduct.category === "Warriors") {
      setWarriorsProducts(prev => [newProduct, ...prev]);
    }
  };

  // Add to cart
  const handleAddToCart = async (productId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return alert("You must be logged in to add to cart");

      await axios.post(
        `${API_URL}/api/carts/add`,
        { productId, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      window.dispatchEvent(new Event("cartUpdated"));
      alert("✅ Product added to cart!");
    } catch (error) {
      console.error("Add to cart error:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Failed to add product to cart.");
    }
  };

  // Delete product
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      const token = localStorage.getItem("token");
      if (!token || !user?.isAdmin) return alert("You must be logged in as admin");

      await axios.delete(`${API_URL}/api/products/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setWarriorsProducts(prev => prev.filter(p => p._id !== id));
      alert("Product deleted successfully!");
    } catch (err) {
      console.error("Error deleting product:", err.response || err);
      alert(err.response?.data?.message || "Failed to delete product.");
    }
  };

  return (
    <Layout>
      <div className="collection-container">
        <h2>Warriors Collection</h2>

        {/* Admin ProductForm */}
        {user?.isAdmin && (
          <ProductForm
            onProductAdded={handleNewProduct}
            defaultCategory="Warriors"
            hideCategorySelect={true}
          />
        )}

        {/* Warriors Products Grid */}
        {warriorsProducts.length > 0 ? (
          <div className="products-grid">
            {warriorsProducts.map(item => (
              <div key={item._id} className="product-card">
                <img
                  src={`${API_URL}${item.imageUrl}`}
                  alt={item.name}
                  className="product-image"
                  loading="lazy"
                />
                <h3 className="product-name">{item.name}</h3>
                <p className="product-price">₦{item.price.toLocaleString()}</p>
                <p className="product-description">{item.description}</p>
                <p>
                  Stock:{" "}
                  {item.stockCount > 0 ? (
                    item.stockCount
                  ) : (
                    <span className="out-of-stock">Out of stock</span>
                  )}
                </p>

                <button
                  className="add-cart-btn"
                  onClick={() => handleAddToCart(item._id)}
                  disabled={item.stockCount <= 0}
                >
                  {item.stockCount > 0 ? "Add to Cart" : "Out of Stock"}
                </button>

                {/* Admin Delete button */}
                {user?.isAdmin && (
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(item._id)}
                  >
                    Delete
                  </button>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p>No Warriors products available.</p>
        )}
      </div>
    </Layout>
  );
};

export default Warriors;
