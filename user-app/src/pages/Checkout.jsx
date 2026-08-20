import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';
import { useCart } from '../context/CartContext';

export default function Checkout() {
  const { items, totalPrice, clearCart } = useCart();
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');
  const [placing, setPlacing] = useState(false);
  const navigate = useNavigate();

  async function handlePlaceOrder(e) {
    e.preventDefault();
    setError('');

    if (!address.trim()) {
      setError('Please enter a shipping address');
      return;
    }

    setPlacing(true);
    try {
      await api.post('/orders', {
        items: items.map((i) => ({ productId: i.productId, quantity: i.quantity })),
        shippingAddress: address
      });
      clearCart();
      navigate('/orders');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to place order');
    } finally {
      setPlacing(false);
    }
  }

  return (
    <div className="wrap narrow">
      <h1>Checkout</h1>

      <div className="checkout-summary">
        {items.map((item) => (
          <div className="checkout-line" key={item.productId}>
            <span>{item.name} × {item.quantity}</span>
            <span>₹{(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
        <div className="checkout-line total">
          <span>Total</span>
          <span>₹{totalPrice.toFixed(2)}</span>
        </div>
      </div>

      <form className="auth-form" onSubmit={handlePlaceOrder}>
        <label>Shipping Address</label>
        <textarea
          rows="3"
          placeholder="Street, city, state, PIN code"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        {error && <p className="error-msg">{error}</p>}
        <button className="btn-primary" disabled={placing}>
          {placing ? 'Placing order…' : 'Place Order'}
        </button>
      </form>
    </div>
  );
}
