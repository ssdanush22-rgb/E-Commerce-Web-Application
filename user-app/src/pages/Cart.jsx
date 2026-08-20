import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function Cart() {
  const { items, updateQuantity, removeFromCart, totalPrice } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="wrap">
        <div className="empty-state">
          <span className="emoji">🛒</span>
          Your cart is empty. <Link to="/">Browse products</Link>
        </div>
      </div>
    );
  }

  function handleCheckout() {
    if (!user) {
      navigate('/login');
      return;
    }
    navigate('/checkout');
  }

  return (
    <div className="wrap">
      <h1>Your Cart</h1>
      <div className="cart-list">
        {items.map((item) => (
          <div className="cart-row" key={item.productId}>
            <div className="cart-row-img">
              {item.image ? <img src={item.image} alt={item.name} /> : <div className="product-img-placeholder small">No Image</div>}
            </div>
            <div className="cart-row-info">
              <h3>{item.name}</h3>
              <p>₹{item.price} each</p>
            </div>
            <div className="qty-row">
              <button onClick={() => updateQuantity(item.productId, item.quantity - 1)}>−</button>
              <span>{item.quantity}</span>
              <button onClick={() => updateQuantity(item.productId, item.quantity + 1)}>+</button>
            </div>
            <div className="cart-row-total">₹{(item.price * item.quantity).toFixed(2)}</div>
            <button className="remove-btn" onClick={() => removeFromCart(item.productId)}>Remove</button>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <span>Total: <strong>₹{totalPrice.toFixed(2)}</strong></span>
        <button className="btn-primary" onClick={handleCheckout}>Proceed to Checkout</button>
      </div>
    </div>
  );
}
