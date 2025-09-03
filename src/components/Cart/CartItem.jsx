import React from "react";

const CartItem = ({ item, API_URL, onRemove }) => {
  // If no valid product, return null (won't render)
  if (!item || (!item.productId && !item.name)) return null;

  // Safely get product details
  const name = item.productId?.name || item.name;
  const imageUrl = item.productId?.imageUrl || item.imageUrl;
  const price = Number(item.productId?.price || item.price || 0);
  const quantity = item.quantity || 1;
  const id = item.productId?._id || item._id;

  return (
    <div className="cart-item">
      {imageUrl && <img src={`${API_URL}${imageUrl}`} alt={name} />}
      <div className="cart-item-details">
        <h4>{name}</h4>
        <p>₦{price.toLocaleString()}</p>
        <p>Quantity: {quantity}</p>
      </div>
      <button className="remove-btn" onClick={() => onRemove(id)}>
        Remove
      </button>
    </div>
  );
};

export default CartItem;
