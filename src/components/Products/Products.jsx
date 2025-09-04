

// import React, { useState, useEffect, useContext, useRef } from "react";
// import axios from "axios";
// import ProductForm from "../ProductForm/ProductForm";
// import { UserContext } from "../../Context/UserContext";
// import Filters from "./Filters";
// import ProductCard from "./ProductCard";
// import Pagination from "./Pagination";
// import { useLocation } from "react-router-dom";
// import { motion } from "framer-motion"; 
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import "./Products.css";

// const Products = () => {
//   const { user } = useContext(UserContext);
//   const [products, setProducts] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [sortType, setSortType] = useState("");
//   const [filterCategory, setFilterCategory] = useState("All");
//   const [currentPage, setCurrentPage] = useState(1);
//   const productsPerPage = 12;
//   const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

//   const location = useLocation();
//   const queryParams = new URLSearchParams(location.search);
//   const searchQuery = queryParams.get("search") || "";

//   const productGridRef = useRef(null);

//   // Fetch products
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const res = await axios.get(`${API_URL}/api/products/get`);
//         setProducts(res.data.products);
//         const initialFiltered = res.data.products.filter((p) =>
//           p.name.toLowerCase().includes(searchQuery.toLowerCase())
//         );
//         setFilteredProducts(initialFiltered.length ? initialFiltered : res.data.products);
//       } catch (err) {
//         console.error("Error fetching products:", err);
//       }
//     };
//     fetchProducts();
//   }, [API_URL, searchQuery]);

//   // Scroll to top of grid when page changes
//   useEffect(() => {
//     if (productGridRef.current) {
//       productGridRef.current.scrollIntoView({ behavior: "smooth" });
//     }
//   }, [currentPage]);

//   const refreshProductList = (newProduct) => {
//     setProducts((prev) => [newProduct, ...prev]);
//     setFilteredProducts((prev) => [newProduct, ...prev]);
//   };

//   // Delete product
//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this product?")) return;
//     try {
//       const token = localStorage.getItem("token");
//       if (!token || !user?.isAdmin) {
//         return toast.warn("FanGear Central ⚠️ You must be logged in as admin");
//       }

//       await axios.delete(`${API_URL}/api/products/delete/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       setProducts((prev) => prev.filter((p) => p._id !== id));
//       setFilteredProducts((prev) => prev.filter((p) => p._id !== id));
//       toast.success("FanGear Central ✅ Product deleted successfully!");
//     } catch (err) {
//       console.error("Error deleting product:", err.response || err);
//       toast.error(
//         `FanGear Central ⚠️ ${err.response?.data?.message || "Failed to delete product"}`
//       );
//     }
//   };

//   // Sorting
//   const handleSort = (type) => {
//     let sorted = [...filteredProducts];
//     if (type === "low-high") sorted.sort((a, b) => a.price - b.price);
//     if (type === "high-low") sorted.sort((a, b) => b.price - a.price);
//     if (type === "newest") sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

//     setSortType(type);
//     setFilteredProducts(sorted);
//     setCurrentPage(1);
//   };

//   // Filter by category
//   const handleCategoryFilter = (category) => {
//     setFilterCategory(category);
//     if (category === "All") setFilteredProducts(products);
//     else setFilteredProducts(products.filter((p) => p.category === category));
//     setCurrentPage(1);
//   };

//   // Pagination
//   const indexOfLast = currentPage * productsPerPage;
//   const indexOfFirst = indexOfLast - productsPerPage;
//   const currentProducts = filteredProducts.slice(indexOfFirst, indexOfLast);
//   const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

//   // Add to Cart
//   const handleAddToCart = async (productId) => {
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) return toast.warn("FanGear Central ⚠️ You must be logged in to add to cart");

//       await axios.post(
//         `${API_URL}/api/carts/add`,
//         { productId, quantity: 1 },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       window.dispatchEvent(new Event("cartUpdated"));
//       toast.success("FanGear Central Product added to cart!");
//     } catch (error) {
//       console.error("Add to cart error:", error.response?.data || error.message);
//       toast.error(
//         `FanGear Central ⚠️ ${error.response?.data?.message || "Failed to add product to cart"}`
//       );
//     }
//   };

//   const cardVariants = {
//     hidden: { opacity: 0, y: 30 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
//   };

//   return (
//     <div className="shop-container">
//       <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
//       {user?.isAdmin && <ProductForm onProductAdded={refreshProductList} />}

//       <Filters
//         sortType={sortType}
//         filterCategory={filterCategory}
//         handleSort={handleSort}
//         handleCategoryFilter={handleCategoryFilter}
//       />

//       <div ref={productGridRef} className="products-grid">
//         {currentProducts.map((product) => (
//           <motion.div
//             key={product._id}
//             variants={cardVariants}
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true, amount: 0.3 }}
//           >
//             <ProductCard
//               product={product}
//               API_URL={API_URL}
//               user={user}
//               handleAddToCart={handleAddToCart}
//               handleDelete={handleDelete}
//             />
//           </motion.div>
//         ))}
//         {currentProducts.length === 0 && <p>No products found.</p>}
//       </div>

//       <Pagination
//         currentPage={currentPage}
//         totalPages={totalPages}
//         setCurrentPage={setCurrentPage}
//       />
//     </div>
//   );
// };

// export default Products;


import React, { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import ProductForm from "../ProductForm/ProductForm";
import { UserContext } from "../../Context/UserContext";
import Filters from "./Filters";
import ProductCard from "./ProductCard";
import Pagination from "./Pagination";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion"; 
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Products.css";

const Products = () => {
  const { user } = useContext(UserContext);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortType, setSortType] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  // ✅ Always use this variable for API requests
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("search") || "";

  const productGridRef = useRef(null);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/products/get`);
        setProducts(res.data.products);

        const initialFiltered = res.data.products.filter((p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredProducts(
          initialFiltered.length ? initialFiltered : res.data.products
        );
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    fetchProducts();
  }, [API_URL, searchQuery]);

  // Scroll to top of grid when page changes
  useEffect(() => {
    if (productGridRef.current) {
      productGridRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [currentPage]);

  const refreshProductList = (newProduct) => {
    setProducts((prev) => [newProduct, ...prev]);
    setFilteredProducts((prev) => [newProduct, ...prev]);
  };

  // Delete product
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      const token = localStorage.getItem("token");
      if (!token || !user?.isAdmin) {
        return toast.warn("FanGear Central ⚠️ You must be logged in as admin");
      }

      await axios.delete(`${API_URL}/api/products/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setProducts((prev) => prev.filter((p) => p._id !== id));
      setFilteredProducts((prev) => prev.filter((p) => p._id !== id));
      toast.success("FanGear Central ✅ Product deleted successfully!");
    } catch (err) {
      console.error("Error deleting product:", err.response || err);
      toast.error(
        `FanGear Central ⚠️ ${
          err.response?.data?.message || "Failed to delete product"
        }`
      );
    }
  };

  // Sorting
  const handleSort = (type) => {
    let sorted = [...filteredProducts];
    if (type === "low-high") sorted.sort((a, b) => a.price - b.price);
    if (type === "high-low") sorted.sort((a, b) => b.price - a.price);
    if (type === "newest")
      sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    setSortType(type);
    setFilteredProducts(sorted);
    setCurrentPage(1);
  };

  // Filter by category
  const handleCategoryFilter = (category) => {
    setFilterCategory(category);
    if (category === "All") setFilteredProducts(products);
    else setFilteredProducts(products.filter((p) => p.category === category));
    setCurrentPage(1);
  };

  // Pagination
  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // Add to Cart
  const handleAddToCart = async (productId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token)
        return toast.warn(
          "FanGear Central ⚠️ You must be logged in to add to cart"
        );

      await axios.post(
        `${API_URL}/api/carts/add`,
        { productId, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      window.dispatchEvent(new Event("cartUpdated"));
      toast.success("FanGear Central ✅ Product added to cart!");
    } catch (error) {
      console.error("Add to cart error:", error.response?.data || error.message);
      toast.error(
        `FanGear Central ⚠️ ${
          error.response?.data?.message || "Failed to add product to cart"
        }`
      );
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="shop-container">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
      {user?.isAdmin && <ProductForm onProductAdded={refreshProductList} />}

      <Filters
        sortType={sortType}
        filterCategory={filterCategory}
        handleSort={handleSort}
        handleCategoryFilter={handleCategoryFilter}
      />

      <div ref={productGridRef} className="products-grid">
        {currentProducts.map((product) => (
          <motion.div
            key={product._id}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <ProductCard
              product={product}
              API_URL={API_URL}
              user={user}
              handleAddToCart={handleAddToCart}
              handleDelete={handleDelete}
            />
          </motion.div>
        ))}
        {currentProducts.length === 0 && <p>No products found.</p>}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default Products;

