// src/components/Club/Football/FanArt.jsx
import React, { useState, useEffect, useContext } from 'react';
import Layout from '../../Layouts/Layout';
import ProductForm from '../../ProductForm/ProductForm';
import axios from 'axios';
import { UserContext } from '../../../Context/UserContext';
import '../Footbal.css';

const Fanart = () => {
  const { user } = useContext(UserContext);
  const [fanArtProducts, setFanArtProducts] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/products/get`);
        const fanOnly = res.data.products.filter(p => p.category === "Fan Art");
        setFanArtProducts(fanOnly);
      } catch (err) {
        console.error("Error fetching Fan Art products:", err);
      }
    };
    fetchProducts();
  }, []);

  const handleNewProduct = (newProduct) => {
    if (newProduct.category === "Fan Art") {
      setFanArtProducts(prev => [newProduct, ...prev]);
    }
  };

  const handleAddToCart = async (productId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return alert("You must be logged in to add to cart");

      await axios.post(`${API_URL}/api/carts/add`, { productId, quantity: 1 }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      window.dispatchEvent(new Event("cartUpdated"));
      alert("✅ Product added to cart!");
    } catch (error) {
      console.error(error.response?.data || error.message);
      alert(error.response?.data?.message || "Failed to add product to cart.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      const token = localStorage.getItem("token");
      if (!token || !user?.isAdmin) return alert("You must be logged in as admin");

      await axios.delete(`${API_URL}/api/products/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setFanArtProducts(prev => prev.filter(p => p._id !== id));
      alert("Product deleted successfully!");
    } catch (err) {
      console.error(err.response || err);
      alert(err.response?.data?.message || "Failed to delete product.");
    }
  };

  return (
    <Layout>
      <div className="collection-container">
        <h2>Fan Art Collection</h2>

        {user?.isAdmin && (
          <ProductForm
            onProductAdded={handleNewProduct}
            defaultCategory="Fan Art"
            hideCategorySelect={true}
          />
        )}

        {fanArtProducts.length > 0 ? (
          <div className="products-grid">
            {fanArtProducts.map(item => (
              <div key={item._id} className="product-card">
                <img src={`${API_URL}${item.imageUrl}`} alt={item.name} className="product-image" loading="lazy"/>
                <h3 className="product-name">{item.name}</h3>
                <p className="product-price">₦{item.price.toLocaleString()}</p>
                <p className="product-description">{item.description}</p>
                <p>Stock: {item.stockCount > 0 ? item.stockCount : <span className="out-of-stock">Out of stock</span>}</p>

                <button className="add-cart-btn" onClick={() => handleAddToCart(item._id)} disabled={item.stockCount <= 0}>
                  {item.stockCount > 0 ? "Add to Cart" : "Out of Stock"}
                </button>

                {user?.isAdmin && (
                  <button className="delete-btn" onClick={() => handleDelete(item._id)}>Delete</button>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p>No Fan Art products available.</p>
        )}
      </div>
    </Layout>
  );
};

export default Fanart;
