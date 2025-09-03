import React, { useState } from "react";
import "./Blogs.css";

// Import my local images
import sportswearImg from "../../assets/Test/sportswearImg.jpeg";
import footballJerseyImg from "../../assets/Test/footballJerseyImg.jpeg";
import basketballFashionImg from "../../assets/Test/basketballfashionImg.jpeg";

const Blog = () => {
  const [expanded, setExpanded] = useState({});

  const toggleReadMore = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const blogPosts = [
    {
      id: 1,
      title: "The Rise of Modern Sportswear",
      date: "August 9, 2025",
      image: sportswearImg,
      shortText:
        "Sportswear has evolved drastically in the last decade, blending performance with style...",
      fullText:
        "Sportswear has evolved drastically in the last decade, blending performance with style. Athletes and everyday users alike now demand apparel that not only performs well but also looks good. From breathable fabrics to smart materials that monitor body temperature, the innovation is remarkable. Sports brands are partnering with tech companies to create garments with built-in sensors, moisture control systems, and even AI-powered design improvements. This fusion of technology and fashion is creating a new era where your jersey is as much a gadget as your smartphone."
    },
    {
      id: 2,
      title: "Why Football Jerseys Are More Than Just Clothing",
      date: "August 5, 2025",
      image: footballJerseyImg,
      shortText:
        "A football jersey isn't just a shirt - it's a badge of honor and identity...",
      fullText:
        "A football jersey isn't just a shirt - it's a badge of honor and identity. When fans wear their teams colors, they're not just showing support; they're expressing a part of who they are. From the design details inspired by historical wins to the use of advanced performance fabrics, jerseys carry deep meaning. Some clubs even incorporate hidden symbols and tributes to past legends in their kits. The passion and emotional connection tied to these shirts are why fans proudly wear them both in and out of the stadium."
    },
    {
      id: 3,
      title: "How Basketball Culture Influences Fashion",
      date: "August 1, 2025",
      image: basketballFashionImg,
      shortText:
        "Basketball has become a huge influence on streetwear and everyday fashion...",
      fullText:
        "Basketball has become a huge influence on streetwear and everyday fashion. From baggy shorts and oversized jerseys in the 90s to today's sleek, fitted styles, the sport's fashion evolution has mirrored cultural trends. NBA players are now style icons, using the tunnel walk before games as a personal runway. Brands collaborate with players to create limited-edition sneakers, jackets, and accessories that fans rush to collect. This crossover between sport and lifestyle has made basketball fashion one of the most influential forces in the apparel industry."
    }
  ];

  return (
    <div className="blog-container">
      <h1 className="blog-title">Our Blog</h1>
      <div className="blog-grid">
        {blogPosts.map((post) => (
          <div className="blog-card" key={post.id}>
            <img src={post.image} alt={post.title} className="blog-image" />
            <div className="blog-content">
              <h2>{post.title}</h2>
              <p className="blog-date">{post.date}</p>
              <p>{expanded[post.id] ? post.fullText : post.shortText}</p>
              <button
                className="read-more-btn"
                onClick={() => toggleReadMore(post.id)}
              >
                {expanded[post.id] ? "Read Less" : "Read More"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
