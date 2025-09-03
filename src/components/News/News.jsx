import React, { useState } from "react";
import { motion } from "framer-motion";
import "./News.css";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setEmail("");
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  return (
    <motion.section
      className="newsletter"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="container">
        <div className="newsletter-content">
          <h2>Join the Fan Club</h2>
          <p>Subscribe to get exclusive deals, new product alerts, and fan content</p>

          <form className="newsletter-form" onSubmit={handleSubmit}>
            <input
              type="email"
              className="newsletter-input"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className="newsletter-btn">
              Subscribe
            </button>
          </form>

          {submitted && (
            <motion.div
              className="newsletter-success"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              Thanks for subscribing! Check your email for a special discount.
            </motion.div>
          )}

          <p className="disclaimer">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </motion.section>
  );
};

export default Newsletter;
