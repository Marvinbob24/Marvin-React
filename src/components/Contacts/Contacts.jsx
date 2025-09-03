
// import React, { useState } from "react";
// import { motion } from "framer-motion"; // for scroll animations
// import "./Contacts.css";

// const Contacts = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     message: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     alert("Thanks for contacting us! We'll reply soon.");
//     setFormData({ name: "", email: "", message: "" });
//   };

//   const cardVariants = {
//     hidden: { opacity: 0, y: 30 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
//   };

//   return (
//     <div className="contact-container">
//       <h1>Contact Us</h1>
//       <p className="contact-intro">
//         Got questions, suggestions, or feedback? We'd love to hear from you!
//         Whether you're a fan, a designer, or a fellow sports enthusiast, reach
//         out and let's make Fan Gear Central even better.
//       </p>

//       <div className="contact-content">
//         {/* Contact Form */}
//         <motion.form
//           onSubmit={handleSubmit}
//           className="contact-form"
//           variants={cardVariants}
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true, amount: 0.3 }}
//         >
//           <label>Name</label>
//           <input
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             placeholder="Enter your name"
//             required
//           />

//           <label>Email</label>
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             placeholder="Enter your email"
//             required
//           />

//           <label>Message</label>
//           <textarea
//             name="message"
//             value={formData.message}
//             onChange={handleChange}
//             placeholder="Write your message..."
//             required
//           ></textarea>

//           <button type="submit">Send Message</button>
//         </motion.form>

//         {/* Instagram Voting Section */}
//         <motion.div
//           className="fanart-vote"
//           variants={cardVariants}
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true, amount: 0.3 }}
//         >
//           <h2>Vote for Your Favorite Design on Instagram 📸</h2>
//           <p>
//             Help us decide which design should be featured next in our Fan Gear
//             Central shop! Click the link below to vote via Instagram.
//           </p>
//           <a
//             href="https://www.instagram.com/poll_link_here"
//             target="_blank"
//             rel="noopener noreferrer"
//             className="vote-button"
//           >
//             Vote on Instagram
//           </a>
//         </motion.div>

//         {/* WhatsApp Submission Section */}
//         <motion.div
//           className="fanart-vote"
//           variants={cardVariants}
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true, amount: 0.3 }}
//         >
//           <h2>Submit Your Design via WhatsApp 🎨</h2>
//           <p>
//             Got a design idea? Click the link below to submit your design via
//             WhatsApp. Submissions are accepted every **last Friday of the month**.
//             After the submission period, our team reviews entries and the winning
//             design will be featured in our shop!
//           </p>
//           <a
//             href="https://wa.me/2348012345678?text=I%20want%20to%20submit%20my%20design!"
//             target="_blank"
//             rel="noopener noreferrer"
//             className="vote-button"
//           >
//             Submit via WhatsApp
//           </a>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default Contacts;

import React, { useState } from "react";
import { motion } from "framer-motion";
import "./Contacts.css";

const Contacts = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thanks for contacting us! We'll reply soon.");
    setFormData({ name: "", email: "", message: "" });
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="contact-container">
      <h1>Contact Us</h1>
      <p className="contact-intro">
        Got questions, suggestions, or feedback? We'd love to hear from you!
        Whether you're a fan, a designer, or a fellow sports enthusiast, reach
        out and let's make our Fan Gear Central shop even better.
      </p>

      <div className="contact-methods">
        {/* Business Email */}
        <motion.div
          className="contact-card"
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2>Email Us 📧</h2>
          <p>
            For general inquiries, partnerships, or support, you can email us directly at:
          </p>
          <a href="mailto:support@fangearcentral.com">support@fangearcentral.com</a>
        </motion.div>

        {/* Phone / WhatsApp */}
        <motion.div
          className="contact-card"
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2>WhatsApp / Call 📱</h2>
          <p>
            Have a quick question or want to submit your fan design? Reach out via WhatsApp or call:
          </p>
          <a href="tel:+2348012345678">+234 801 234 5678</a> <br />
          <a
            href="https://wa.me/2348012345678?text=I%20want%20to%20submit%20my%20design!"
            target="_blank"
            rel="noopener noreferrer"
          >
            Submit via WhatsApp
          </a>
        </motion.div>

        {/* Instagram Voting */}
        <motion.div
          className="contact-card"
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2>Vote on Instagram 📸</h2>
          <p>
            Help us decide which design should be featured next! Click below to vote via Instagram.
          </p>
          <a
            href="https://www.instagram.com/poll_link_here"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vote on Instagram
          </a>
        </motion.div>
      </div>

      {/* Contact Form */}
      <motion.form
        onSubmit={handleSubmit}
        className="contact-form"
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <h2>Send Us a Message ✉️</h2>
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your name"
          required
        />

        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          required
        />

        <label>Message</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Write your message..."
          required
        ></textarea>

        <button type="submit">Send Message</button>
      </motion.form>
    </div>
  );
};

export default Contacts;

