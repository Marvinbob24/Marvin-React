import React from "react";
import { motion } from "framer-motion"; // Import framer-motion
import "./bestSelling.css";

// Import BsIMG
import jerseyImg from "../../assets/BsIMG/Bs1.jpeg";
import shortsImg from "../../assets/BsIMG/Bs2.jpeg";
import capImg from "../../assets/BsIMG/Bs3.jpeg";
import hoodieImg from "../../assets/BsIMG/Bs4.jpeg";

const products = [
  { id: 1, name: "Limited Edition Team Jersey", category: "Football", price: 20.99, rating: 4.8, image: jerseyImg },
  { id: 2, name: "Premium Basketball Shorts", category: "Basketball", price: 10.99, rating: 4.6, image: shortsImg },
  { id: 3, name: "Designer Team Cap", category: "Accessories", price: 10.99, rating: 4.9, image: capImg },
  { id: 4, name: "Player Signature Hoodie", category: "Basketball", price: 10.99, rating: 4.7, image: hoodieImg },
];

// Parent container variants
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

// Individual card variants
const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const BestSellingProducts = () => {
  return (
    <section className="bs-products-section">
      <div className="bs-container">
        <div className="bs-section-header">
          <motion.h2
            className="bs-section-title"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Best Selling Gear
          </motion.h2>
          <motion.p
            className="bs-section-subtitle"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Top picks from passionate fans like you
          </motion.p>
        </div>

        <motion.div
          className="bs-products-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {products.map((product) => (
            <motion.div className="bs-product-card" key={product.id} variants={cardVariants}>
              <div className="bs-product-img-wrapper">
                <img src={product.image} alt={product.name} className="bs-product-img" />
              </div>
              <div className="bs-product-content">
                <div className="bs-product-category">{product.category}</div>
                <h3 className="bs-product-title">{product.name}</h3>
                <div className="bs-product-price">
                  ₦{(product.price * 900).toLocaleString()}
                </div>
                <div className="bs-product-rating">
                  {[...Array(5)].map((_, i) => (
                    <i
                      key={i}
                      className={`fas fa-star ${i < Math.floor(product.rating) ? "bs-filled" : ""}`}
                    ></i>
                  ))}
                  <span>({product.rating})</span>
                </div>
                <div className="bs-product-actions">
                  {/* Removed the Shop Now button */}
                  <button className="bs-wishlist-btn">
                    <i className="far fa-heart"></i>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="bs-text-center">
          <a href="/shop" className="bs-btnn">
            View All
          </a>
        </div>
      </div>
    </section>
  );
};

export default BestSellingProducts;
