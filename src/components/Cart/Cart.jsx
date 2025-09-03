import React, { useState, useEffect } from "react";
import axios from "axios";
import CartItem from "./CartItem";
import CartTotal from "./CartTotal";
import CheckoutForm from "./CheckoutForm";
import "./Cart.css";

const Cart = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [error, setError] = useState(null);
  const [showCheckout, setShowCheckout] = useState(false);
  const [checkoutForm, setCheckoutForm] = useState({
    shippingAddress: {
      fullName: "",
      address: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
      phoneNumber: "" 
    },
    paymentMethod: "credit_card"
  });

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchCart = async () => {
      try {
        setLoading(true);
        if (!token) {
          setCart({ products: [], total: 0 });
          setError("No authentication token found");
          return;
        }
        const res = await axios.get(`${API_URL}/api/carts`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCart(res.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching cart:", err.response?.data || err);
        setError(err.response?.data?.message || "Failed to fetch cart");
        setCart({ products: [], total: 0 });
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, [refreshTrigger]);

  const refreshCart = () => setRefreshTrigger(prev => prev + 1);

  const handleRemove = async (productId) => {
    try {
      await axios.delete(`${API_URL}/api/carts/remove/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      refreshCart();
    } catch (err) {
      console.error("Error removing item:", err.response?.data || err);
      setError(err.response?.data?.message || "Failed to remove item");
    }
  };

  // ✅ Update quantity in cart while respecting stock
  const handleQuantityChange = (productId, quantity, stockCount) => {
    const qty = Math.min(Math.max(1, quantity), stockCount || quantity);
    setCart(prev => ({
      ...prev,
      products: prev.products.map(p =>
        (p.productId?._id || p._id) === productId ? { ...p, quantity: qty } : p
      )
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("shipping.")) {
      const field = name.split(".")[1];
      setCheckoutForm(prev => ({
        ...prev,
        shippingAddress: {
          ...prev.shippingAddress,
          [field]: value
        }
      }));
    } else {
      setCheckoutForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const placeOrder = async (checkoutType = "detailed") => {
    try {
      if (!token) {
        setError("You must be logged in to place an order");
        return;
      }

      const orderProducts = cart.products.map(item => ({
        productId: item.productId?._id || item._id,
        name: item.productId?.name || item.name,
        price: item.productId?.price || item.price,
        quantity: item.quantity || 1,
        imageUrl: item.productId?.imageUrl || item.imageUrl || "",
      }));

      const shipping = checkoutType === "detailed" ? checkoutForm.shippingAddress : {
        fullName: "Guest User",
        address: "N/A",
        city: "N/A",
        state: "N/A",
        postalCode: "0000",
        country: "N/A",
        phoneNumber: "0000000000"
      };

      const paymentMethod = checkoutType === "detailed" ? checkoutForm.paymentMethod : "credit_card";

      const orderData = {
        products: orderProducts,
        total: cart.total,
        shippingAddress: shipping,
        paymentMethod,
      };

      await axios.post(`${API_URL}/api/orders/place`, orderData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert("Order placed successfully!");
      setShowCheckout(false);
      refreshCart();
    } catch (err) {
      console.error("Place order error:", err.response?.data || err);
      setError(err.response?.data?.message || "Failed to place order");
    }
  };

  if (loading) return <div className="cart-message"><p>Loading cart...</p></div>;
  if (!cart || cart.products.length === 0) return <div className="cart-message"><p>Your cart is empty.</p></div>;

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {error && <div className="error-message">{error}</div>}

      <div className="cart-items">
        {cart.products.map(item => (
          <CartItem
            key={item.productId?._id || item._id}
            item={item}
            API_URL={API_URL}
            onRemove={handleRemove}
            onQuantityChange={handleQuantityChange} // ✅ pass quantity handler
          />
        ))}
      </div>

      <CartTotal
        total={cart.total}
        onQuickCheckout={() => placeOrder("simple")}
        onDetailedCheckout={() => setShowCheckout(true)}
      />

      {showCheckout && (
        <CheckoutForm
          checkoutForm={checkoutForm}
          onChange={handleInputChange}
          onCancel={() => setShowCheckout(false)}
          onSubmit={() => placeOrder("detailed")}
        />
      )}
    </div>
  );
};

export default Cart;
