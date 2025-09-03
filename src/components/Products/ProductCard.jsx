import React from "react";

const ProductCard = ({ product, API_URL, user, handleAddToCart, handleDelete }) => {
  return (
    <div className="product-card">
      <img src={`${API_URL}${product.imageUrl}`} alt={product.name} loading="lazy" />
      <h3>{product.name}</h3>
      <p>₦{product.price.toLocaleString()}</p>
      <p>{product.description}</p>
      <p>
        Stock:{" "}
        {product.stockCount > 0 ? (
          product.stockCount
        ) : (
          <span className="out-of-stock">Out of stock</span>
        )}
      </p>

      <button
        className="add-cart-btn"
        onClick={() => handleAddToCart(product._id)}
        disabled={product.stockCount <= 0}
      >
        {product.stockCount > 0 ? "Add to Cart" : "Out of Stock"}
      </button>

      {user?.isAdmin && (
        <button className="delete-btn" onClick={() => handleDelete(product._id)}>
          Delete
        </button>
      )}
    </div>
  );
};

export default ProductCard;
