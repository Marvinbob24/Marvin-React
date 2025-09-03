

// // src/components/FeaturesSection/FeaturesSection.jsx
// import React from "react";
// import {
//   FaTruck,      // replacement for FaTruckFast
//   FaTshirt,
//   FaAward,
//   FaUndoAlt,    // replacement for FaRotateLeft
// } from "react-icons/fa";
// import "./Features.css";

// const features = [
//   {
//     icon: <FaTruck />,
//     title: "Fast Shipping",
//     description: "Get your gear in 2-4 business days with our express delivery",
//   },
//   {
//     icon: <FaTshirt />,
//     title: "Custom Designs",
//     description: "Personalize your merch with custom prints and designs",
//   },
//   {
//     icon: <FaAward />,
//     title: "Premium Quality",
//     description: "All products made with high-quality materials for durability",
//   },
//   {
//     icon: <FaUndoAlt />,
//     title: "Easy Returns",
//     description: "30-day hassle-free return policy on all items",
//   },
// ];

// const FeaturesSection = () => {
//   return (
//     <section className="features-section">
//       <div className="features-container">
//         <div className="features-header">
//           <h2 className="features-title">Features</h2>
//           <p className="features-subtitle">What makes our store the fan favorite</p>
//         </div>

//         <div className="features-grid">
//           {features.map(({ icon, title, description }, idx) => (
//             <article className="feature-card" key={idx}>
//               <div className="feature-icon" aria-hidden="true">
//                 {icon}
//               </div>
//               <h3 className="feature-title">{title}</h3>
//               <p className="feature-description">{description}</p>
//             </article>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default FeaturesSection;


// src/components/FeaturesSection/FeaturesSection.jsx
import React from "react";
import { FaTruck, FaTshirt, FaAward, FaUndoAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import "./Features.css";

const features = [
  {
    icon: <FaTruck />,
    title: "Fast Shipping",
    description: "Get your gear in 2-4 business days with our express delivery",
  },
  {
    icon: <FaTshirt />,
    title: "Custom Designs",
    description: "Personalize your merch with custom prints and designs",
  },
  {
    icon: <FaAward />,
    title: "Premium Quality",
    description: "All products made with high-quality materials for durability",
  },
  {
    icon: <FaUndoAlt />,
    title: "Easy Returns",
    description: "30-day hassle-free return policy on all items",
  },
];

// Parent container variants for stagger
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

const FeaturesSection = () => {
  return (
    <section className="features-section">
      <div className="features-container">
        <div className="features-header">
          <h2 className="features-title">Features</h2>
          <p className="features-subtitle">What makes our store the fan favorite</p>
        </div>

        <motion.div
          className="features-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {features.map(({ icon, title, description }, idx) => (
            <motion.article
              className="feature-card"
              key={idx}
              variants={cardVariants}
            >
              <div className="feature-icon">{icon}</div>
              <h3 className="feature-title">{title}</h3>
              <p className="feature-description">{description}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
