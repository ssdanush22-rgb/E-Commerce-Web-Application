import { useEffect, useState } from 'react';
import api from '../api/api';

const STATUS_LABELS = {
  pending: 'Pending',
  processing: 'Processing',
  shipped: 'Shipped',
  delivered: 'Delivered',
  cancelled: 'Cancelled'
};

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/orders/mine')
      .then((res) => setOrders(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="status-msg">Loading orders…</p>;

  if (orders.length === 0) {
    return (
      <div className="wrap">
        <div className="empty-state">
          <span className="emoji">📦</span>
          You haven't placed any orders yet.
        </div>
      </div>
    );
  }

  return (
    <div className="wrap">
      <h1>My Orders</h1>
      <div className="order-list">
        {orders.map((order) => (
          <div className="order-card" key={order._id}>
            <div className="order-card-head">
              <span>Order #{order._id.slice(-6).toUpperCase()}</span>
              <span className={`status-badge status-${order.status}`}>{STATUS_LABELS[order.status]}</span>
            </div>
            <div className="order-items">
              {order.items.map((item, idx) => (
                <div className="order-item-line" key={idx}>
                  <span>{item.name} × {item.quantity}</span>
                  <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="order-card-foot">
              <span>Shipping to: {order.shippingAddress}</span>
              <strong>Total: ₹{order.totalAmount.toFixed(2)}</strong>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
