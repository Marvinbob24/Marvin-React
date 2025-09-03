
// import React from 'react';
// import { FaTshirt, FaFacebookF, FaInstagram, FaTwitter, FaTiktok } from 'react-icons/fa'; // import all icons
// import './Footer.css';

// const Footer = () => {
//   return (
//     <footer>
//       <div className="container">
//         <div className="footer-content">
//           {/* Footer Brand */}
//           <div className="footer-brand">
//             <div className="logo">
//               <FaTshirt className="logo-icon" size={30} />
//               <h2>Fan<span>Gear</span> Central</h2>
//             </div>
//             <p className="footer-desc">
//               Premium sports merchandise for true fans. Exclusive designs, custom gear, and fan-first experience.
//             </p>
//           </div>

//           {/* Footer Links */}
//           <div className="footer-links">
//             <div className="footer-column">
//               <h3>Shop</h3>
//               <ul>
//                 <li><a href="#">Football</a></li>
//                 <li><a href="#">Basketball</a></li>
//                 <li><a href="#">Tennis</a></li>
//                 <li><a href="#">Baseball</a></li>
//                 <li><a href="#">Hockey</a></li>
//               </ul>
//             </div>

//             <div className="footer-column">
//               <h3>Services</h3>
//               <ul>
//                 <li><a href="/Supports">About us</a></li>
//                 <li><a href="/Supports">FAQs</a></li>
//                 <li><a href="/Supports">Shipping Policy</a></li>
//                 <li><a href="/Supports">Returns & Exchanges</a></li>
//                 <li><a href="/Supports">Careers</a></li>
//               </ul>
//             </div>

//             <div className="footer-column">
//               <h3>Follow us</h3>
//               <div className="social-links">
//                 <a href="#"><FaFacebookF /></a>
//                 <a href="#"><FaInstagram /></a>
//                 <a href="#"><FaTwitter /></a>
//                 <a href="#"><FaTiktok /></a>
//               </div>
//               <p className="social-desc">
//                 Stay connected with us on social media for the latest updates and offers.
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Footer Bottom */}
//         <div className="footer-bottom">
//           <p>&copy; {new Date().getFullYear()} FanGear Central. All rights reserved.</p>
//           <div className="payment-methods">
//             <i className="fab fa-cc-visa"></i>
//             <i className="fab fa-cc-mastercard"></i>
//             <i className="fab fa-cc-amex"></i>
//             <i className="fab fa-cc-paypal"></i>
//             <i className="fab fa-cc-apple-pay"></i>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;


import React from 'react';
import { FaTshirt, FaFacebookF, FaInstagram, FaTwitter, FaTiktok } from 'react-icons/fa';
import { motion } from 'framer-motion'; // Import framer-motion
import './Footer.css';

const Footer = () => {
  const footerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <motion.footer
      variants={footerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="container">
        <motion.div className="footer-content" variants={itemVariants}>
          {/* Footer Brand */}
          <motion.div className="footer-brand" variants={itemVariants}>
            <div className="logo">
              <FaTshirt className="logo-icon" size={30} />
              <h2>Fan<span>Gear</span> Central</h2>
            </div>
            <p className="footer-desc">
              Premium sports merchandise for true fans. Exclusive designs, custom gear, and fan-first experience.
            </p>
          </motion.div>

          {/* Footer Links */}
          <motion.div className="footer-links" variants={itemVariants}>
            <motion.div className="footer-column" variants={itemVariants}>
              <h3>Shop</h3>
              <ul>
                <li><a href="/collections/football/barcelona">Football</a></li>
                <li><a href="/collections/basketball/warriors">Basketball</a></li>
                <li><a href="/collections/tennis">Tennis</a></li>
                <li><a href="/collections/cricket">Baseball</a></li>
                <li><a href="/collections/fanart">Fan Art</a></li>
              </ul>
            </motion.div>

            <motion.div className="footer-column" variants={itemVariants}>
              <h3>Services</h3>
              <ul>
                <li><a href="/Supports">About us</a></li>
                <li><a href="/Supports">FAQs</a></li>
                <li><a href="/Supports">Shipping Policy</a></li>
                <li><a href="/Supports">Returns & Exchanges</a></li>
                <li><a href="/Supports">Careers</a></li>
              </ul>
            </motion.div>

            <motion.div className="footer-column" variants={itemVariants}>
              <h3>Follow us</h3>
              <div className="social-links">
                <a href="#"><FaFacebookF /></a>
                <a href="#"><FaInstagram /></a>
                <a href="#"><FaTwitter /></a>
                <a href="#"><FaTiktok /></a>
              </div>
              <p className="social-desc">
                Stay connected with us on social media for the latest updates and offers.
              </p>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Footer Bottom */}
        <motion.div className="footer-bottom" variants={itemVariants}>
          <p>&copy; {new Date().getFullYear()} FanGear Central. All rights reserved.</p>
          <div className="payment-methods">
            <i className="fab fa-cc-visa"></i>
            <i className="fab fa-cc-mastercard"></i>
            <i className="fab fa-cc-amex"></i>
            <i className="fab fa-cc-paypal"></i>
            <i className="fab fa-cc-apple-pay"></i>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
