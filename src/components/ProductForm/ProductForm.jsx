// // src/components/ProductForm/ProductForm.jsx
// import React, { useState } from "react";
// import axios from "axios";
// import "./ProductForm.css";

// const ProductForm = ({ onProductAdded }) => {
//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");
//   const [price, setPrice] = useState("");
//   const [category, setCategory] = useState("Football");
//   const [stockCount, setStockCount] = useState(""); // new state for stock
//   const [image, setImage] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");

//   const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!name || !description || !price || !image || !category || stockCount === "") {
//       setMessage("All fields are required.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("name", name);
//     formData.append("description", description);
//     formData.append("price", price);
//     formData.append("category", category);
//     formData.append("stockCount", stockCount); // append stockCount
//     formData.append("image", image);

//     setLoading(true);
//     setMessage("");

//     try {
//       const token = localStorage.getItem("token");

//       if (!token) {
//         setMessage("You must be logged in as admin.");
//         setLoading(false);
//         return;
//       }

//       const res = await axios.post(`${API_URL}/api/products/create`, formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       setMessage("Product added successfully!");
//       setName("");
//       setDescription("");
//       setPrice("");
//       setCategory("Football");
//       setStockCount("");
//       setImage(null);

//       if (onProductAdded) onProductAdded(res.data.product);
//     } catch (err) {
//       console.error("Error adding product:", err);
//       setMessage(err.response?.data?.message || "Error adding product. Make sure you are logged in as admin.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="product-form-container">
//       <h2>Add New Product</h2>
//       {message && <p className="message">{message}</p>}
//       <form onSubmit={handleSubmit} className="product-form">
//         <input
//           type="text"
//           placeholder="Product Name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//         />
//         <textarea
//           placeholder="Description"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//         />
//         <input
//           type="number"
//           placeholder="Price"
//           value={price}
//           onChange={(e) => setPrice(e.target.value)}
//         />
//         <input
//           type="number"
//           placeholder="Stock Count"
//           value={stockCount}
//           onChange={(e) => setStockCount(e.target.value)}
//         />
//         <select value={category} onChange={(e) => setCategory(e.target.value)}>
//           <option value="Football">Football</option>
//           <option value="Basketball">Basketball</option>
//           <option value="Tennis">Tennis</option>
//           <option value="Accessories">Accessories</option>
//           <option value="Fan Art">Fan Art</option>
//         </select>
//         <input
//           type="file"
//           accept="image/*"
//           onChange={(e) => setImage(e.target.files[0])}
//         />
//         <button type="submit" disabled={loading}>
//           {loading ? "Adding..." : "Add Product"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default ProductForm;


// src/components/ProductForm/ProductForm.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ProductForm.css";

const ProductForm = ({ onProductAdded, defaultCategory, hideCategorySelect }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState(defaultCategory || "Football");
  const [stockCount, setStockCount] = useState(""); 
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  // Ensure category is set if defaultCategory is passed
  useEffect(() => {
    if (defaultCategory) setCategory(defaultCategory);
  }, [defaultCategory]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !description || !price || !image || !category || stockCount === "") {
      setMessage("All fields are required.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("stockCount", stockCount);
    formData.append("image", image);

    setLoading(true);
    setMessage("");

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setMessage("You must be logged in as admin.");
        setLoading(false);
        return;
      }

      const res = await axios.post(`${API_URL}/api/products/create`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      setMessage("Product added successfully!");
      setName("");
      setDescription("");
      setPrice("");
      setStockCount("");
      setImage(null);
      setCategory(defaultCategory || "Football");

      if (onProductAdded) onProductAdded(res.data.product);
    } catch (err) {
      console.error("Error adding product:", err);
      setMessage(err.response?.data?.message || "Error adding product. Make sure you are logged in as admin.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="product-form-container">
      <h2>Add New Product</h2>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleSubmit} className="product-form">
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          type="number"
          placeholder="Stock Count"
          value={stockCount}
          onChange={(e) => setStockCount(e.target.value)}
        />

        {/* ✅ Show category select only if not forced */}
        {!hideCategorySelect && (
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="Football">Football</option>
            <option value="Basketball">Basketball</option>
            <option value="Tennis">Tennis</option>
            <option value="Accessories">Accessories</option>
            <option value="Fan Art">Fan Art</option>
            <option value="Bulls">Bulls</option>
          </select>
        )}

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
