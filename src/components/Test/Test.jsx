// // src/components/Testimonials/Testimonials.jsx
// import React from 'react';
// import './Test.css';

// import michaelImg from '../../assets/Test/test1.jpeg';
// import jessicaImg from '../../assets/Test/test2.jpeg';
// import davidImg from '../../assets/Test/test3.jpeg';

// const Testimonials = () => {
//   const testimonials = [
//     {
//       id: 1,
//       text: "The quality of the jersey I bought exceeded my expectations! The custom printing is perfect and it arrived in just 3 days.",
//       author: "Michael T.",
//       role: "Football Fan",
//       image: michaelImg,
//     },
//     {
//       id: 2,
//       text: "As a college basketball supporter, it's hard to find gear for our team. FanGear Central had exactly what I was looking for!",
//       author: "Jessica L.",
//       role: "College Supporter",
//       image: jessicaImg,
//     },
//     {
//       id: 3,
//       text: "I bought the limited edition hoodie as a gift, and my brother absolutely loved it! The design is unique and the material is premium.",
//       author: "David K.",
//       role: "Gift Buyer",
//       image: davidImg,
//     }
//   ];

//   return (
//     <section className="section testimonials-section">
//       <div className="container">
//         <div className="section-header">
//           <h2 className="section-title">What Fans Say</h2>
//           <p className="section-subtitle">Don't just take our word for it – hear from our customers</p>
//         </div>

//         <div className="testimonial-grid">
//           {testimonials.map((testimonial) => (
//             <div className="testimonial-card" key={testimonial.id}>
//               <div className="testimonial-text">
//                 {testimonial.text}
//               </div>
//               <div className="testimonial-author">
//                 <img src={testimonial.image} alt={testimonial.author} className="author-img" />
//                 <div className="author-info">
//                   <h4>{testimonial.author}</h4>
//                   <p>{testimonial.role}</p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Testimonials;


import React from "react";
import { motion } from "framer-motion";
import "./Test.css";

import michaelImg from "../../assets/Test/test1.jpeg";
import jessicaImg from "../../assets/Test/test2.jpeg";
import davidImg from "../../assets/Test/test3.jpeg";

const testimonials = [
  {
    id: 1,
    text: "The quality of the jersey I bought exceeded my expectations! The custom printing is perfect and it arrived in just 3 days.",
    author: "Michael T.",
    role: "Football Fan",
    image: michaelImg,
  },
  {
    id: 2,
    text: "As a college basketball supporter, it's hard to find gear for our team. FanGear Central had exactly what I was looking for!",
    author: "Jessica L.",
    role: "College Supporter",
    image: jessicaImg,
  },
  {
    id: 3,
    text: "I bought the limited edition hoodie as a gift, and my brother absolutely loved it! The design is unique and the material is premium.",
    author: "David K.",
    role: "Gift Buyer",
    image: davidImg,
  },
];

// Variants for cards
const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

// Container variants for staggered animation
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const Testimonials = () => {
  return (
    <section className="section testimonials-section">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">What Fans Say</h2>
          <p className="section-subtitle">
            Don't just take our word for it – hear from our customers
          </p>
        </motion.div>

        <motion.div
          className="testimonial-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {testimonials.map((testimonial) => (
            <motion.div
              className="testimonial-card"
              key={testimonial.id}
              variants={cardVariants}
            >
              <div className="testimonial-text">{testimonial.text}</div>
              <div className="testimonial-author">
                <img
                  src={testimonial.image}
                  alt={testimonial.author}
                  className="author-img"
                />
                <div className="author-info">
                  <h4>{testimonial.author}</h4>
                  <p>{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
