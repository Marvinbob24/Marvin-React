


// // src/components/FanArtSection/FanArtSection.jsx
// import React from 'react';
// import './fanart.css';

// // Import images
// import footballImg from '../../assets/Fan1.jpeg';
// import basketballImg from '../../assets/Fan2.jpg';
// import tennisImg from '../../assets/Fan3.jpeg';
// import baseballImg from '../../assets/Fan4.jpeg';

// const FanArtSection = () => {
//   const fanArt = [
//     {
//       id: 1,
//       title: "Victory Celebration",
//       artist: "Alex Johnson",
//       sport: "Football",
//       likes: 124,
//       image: footballImg,
//     },
//     {
//       id: 2,
//       title: "Court Legends",
//       artist: "Maria Garcia",
//       sport: "Basketball",
//       likes: 98,
//       image: basketballImg,
//     },
//     {
//       id: 3,
//       title: "Grand Slam Moment",
//       artist: "David Chen",
//       sport: "Tennis",
//       likes: 76,
//       image: tennisImg,
//     },
//     {
//       id: 4,
//       title: "Team Unity",
//       artist: "Sarah Williams",
//       sport: "Baseball",
//       likes: 205,
//       image: baseballImg,
//     },
//   ];

//   return (
//     <section className="section fan-art-section">
//       <div className="container">
//         <div className="section-header">
//           <h2 className="section-title">Featured Fan Art</h2>
//           <p className="section-subtitle">
//             Showcasing amazing artwork from our talented fan community
//           </p>
//         </div>

//         <div className="fan-art-grid">
//           {fanArt.map((art) => (
//             <div className="art-card" key={art.id}>
//               <div className="art-img-wrapper">
//                 <img src={art.image} alt={art.title} className="art-img" />
//               </div>
//               <div className="art-content">
//                 <h3 className="art-title">{art.title}</h3>
//                 <div className="art-meta">
//                   <span>By {art.artist}</span>
//                   <span>
//                     <i className="fas fa-heart"></i> {art.likes}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Footer Button */}
//         <div className="fan-art-footer">
//           <a href="/collections/Fanart" className="btnn">View All</a>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default FanArtSection;


// src/components/FanArtSection/FanArtSection.jsx
import React from "react";
import { motion } from "framer-motion"; // Import Framer Motion
import "./fanart.css";

// Import images
import footballImg from "../../assets/Fan1.jpeg";
import basketballImg from "../../assets/Fan2.jpg";
import tennisImg from "../../assets/Fan3.jpeg";
import baseballImg from "../../assets/Fan4.jpeg";

const fanArt = [
  {
    id: 1,
    title: "Victory Celebration",
    artist: "Alex Johnson",
    sport: "Football",
    likes: 124,
    image: footballImg,
  },
  {
    id: 2,
    title: "Court Legends",
    artist: "Maria Garcia",
    sport: "Basketball",
    likes: 98,
    image: basketballImg,
  },
  {
    id: 3,
    title: "Grand Slam Moment",
    artist: "David Chen",
    sport: "Tennis",
    likes: 76,
    image: tennisImg,
  },
  {
    id: 4,
    title: "Team Unity",
    artist: "Sarah Williams",
    sport: "Baseball",
    likes: 205,
    image: baseballImg,
  },
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

const FanArtSection = () => {
  return (
    <section className="section fan-art-section">
      <div className="container">
        <div className="section-header">
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Featured Fan Art
          </motion.h2>
          <motion.p
            className="section-subtitle"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Showcasing amazing artwork from our talented fan community
          </motion.p>
        </div>

        <motion.div
          className="fan-art-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {fanArt.map((art) => (
            <motion.div className="art-card" key={art.id} variants={cardVariants}>
              <div className="art-img-wrapper">
                <img src={art.image} alt={art.title} className="art-img" />
              </div>
              <div className="art-content">
                <h3 className="art-title">{art.title}</h3>
                <div className="art-meta">
                  <span>By {art.artist}</span>
                  <span>
                    <i className="fas fa-heart"></i> {art.likes}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="fan-art-footer">
          <a href="/collections/Fanart" className="btnn">
            View All
          </a>
        </div>
      </div>
    </section>
  );
};

export default FanArtSection;
