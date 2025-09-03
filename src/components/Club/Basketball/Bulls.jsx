// // src/components/Club/Football/Bulls.jsx
// import React, { useState } from 'react';
// import Layout from '../../Layouts/Layout';
// import '../Footbal.css';

// import home from '../../../assets/psg/home.jpeg';
// import away from '../../../assets/psg/away.jpeg';
// import goal from '../../../assets/psg/goal.jpeg';
// import shorts from '../../../assets/psg/shorts.jpg';
// import scarf from '../../../assets/psg/scarf.jpeg';
// import cap from '../../../assets/psg/cap.jpeg';
// import jacket from '../../../assets/psg/jacket.jpeg';
// import socks from '../../../assets/psg/socks.jpeg';
// import training from '../../../assets/psg/training.jpeg';
// import boot from '../../../assets/psg/boot.jpeg';

// const psgProducts = [
//   { id: 1, name: "Home Jersey", price: 90, image: home },
//   { id: 2, name: "Away Jersey", price: 85, image: away },
//   { id: 3, name: "Goalkeeper Jersey", price: 95, image: goal },
//   { id: 4, name: "Shorts", price: 45, image: shorts },
//   { id: 5, name: "Scarf", price: 25, image: scarf },
//   { id: 6, name: "Cap", price: 20, image: cap },
//   { id: 7, name: "Jacket", price: 120, image: jacket },
//   { id: 8, name: "Socks", price: 15, image: socks },
//   { id: 9, name: "Training Jersey", price: 70, image: training },
//   { id: 10, name: "Boot", price: 50, image: boot },
// ];

// const Bulls = () => {
//   const [cart, setCart] = useState([]);

//   const addToCart = (product) => {
//     setCart(prev => [...prev, product]);
//     alert(`${product.name} added to cart!`);
//   };

//   return (
//     <Layout>
//       <div className="collection-container">
//         <h2>Bulls Collection</h2>
//         <div className="products-grid">
//           {psgProducts.map(item => (
//             <div key={item.id} className="product-card">
//               <img
//                 src={item.image}
//                 alt={item.name}
//                 className="product-image"
//                 loading="lazy"
//               />
//               <h4 className="product-name">{item.name}</h4>
//               <p className="product-price">${item.price}</p>
//               <button
//                 className="add-to-cart-btn"
//                 onClick={() => addToCart(item)}
//               >
//                 Add to Cart
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>
//     </Layout>
//   );
// };


// export default Bulls;



// src/components/Club/Football/Bulls.jsx
// src/components/Club/Football/Bulls.jsx
import React, { useState, useEffect, useContext } from 'react';
import Layout from '../../Layouts/Layout';
import ProductForm from '../../ProductForm/ProductForm';
import axios from 'axios';
import { UserContext } from '../../../Context/UserContext';
import '../Footbal.css';

const Bulls = () => {
  const { user } = useContext(UserContext);
  const [bullsProducts, setBullsProducts] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  // Fetch Bulls products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/products/get`);
        const bullsOnly = res.data.products.filter(p => p.category === "Bulls");
        setBullsProducts(bullsOnly);
      } catch (err) {
        console.error("Error fetching Bulls products:", err);
      }
    };
    fetchProducts();
  }, []);

  // Handle new product added via ProductForm
  const handleNewProduct = (newProduct) => {
    if (newProduct.category === "Bulls") {
      setBullsProducts(prev => [newProduct, ...prev]);
    }
  };

  // Add to cart function
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

      setBullsProducts(prev => prev.filter(p => p._id !== id));
      alert("Product deleted successfully!");
    } catch (err) {
      console.error("Error deleting product:", err.response || err);
      alert(err.response?.data?.message || "Failed to delete product.");
    }
  };

  return (
    <Layout>
      <div className="collection-container">
        <h2>Bulls Collection</h2>

        {/* Admin ProductForm */}
        {user?.isAdmin && (
          <ProductForm
            onProductAdded={handleNewProduct}
            defaultCategory="Bulls"
            hideCategorySelect={true}
          />
        )}

        {/* Bulls Products Grid */}
        {bullsProducts.length > 0 ? (
          <div className="products-grid">
            {bullsProducts.map(item => (
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
          <p>No Bulls products available.</p>
        )}
      </div>
    </Layout>
  );
};

export default Bulls;
