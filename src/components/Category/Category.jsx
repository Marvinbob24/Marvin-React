// src/pages/Collection.jsx
import React from 'react';
import './Category.css';

const collections = [
  {
    id: 1,
    title: "Summer 2025 Collection",
    description: "Fresh gear for the new season",
    image: "/images/collection-summer.jpeg",
  },
  {
    id: 2,
    title: "Limited Editions",
    description: "Exclusive and rare fan merch",
    image: "/images/collection-limited.jpeg",
  },
  {
    id: 3,
    title: "Fan Favorites",
    description: "Top picks loved by our community",
    image: "/images/collection-favorites.jpg",
  },
  {
    id: 4,
    title: "Custom Wear",
    description: "Design your own personalized gear",
    image: "/images/collection-custom.jpg",
  },
];

const Category = () => {
  return (
    <div className="collection-page">
      <h1>Our Collections</h1>
      <div className="collection-grid">
        {collections.map((collection) => (
          <div key={collection.id} className="collection-card">
            <img src={collection.image} alt={collection.title} />
            <h3>{collection.title}</h3>
            <p>{collection.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;