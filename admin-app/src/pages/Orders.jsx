import { useEffect, useState } from 'react';
import api from '../api/api';
import Sidebar from '../components/Sidebar';

const STATUSES = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];

export default function Orders() {
  const [orders, setOrders] = useState([]);

  function loadOrders() {
    api.get('/orders').then((res) => setOrders(res.data)).catch(() => {});
  }

  useEffect(() => { loadOrders(); }, []);

  async function handleStatusChange(orderId, status) {
    await api.put(`/orders/${orderId}/status`, { status });
    loadOrders();
  }

  return (
    <div className="admin-layout">
      <Sidebar />
      <main className="admin-main">
        <h1>Orders</h1>

        <div className="order-list">
          {orders.map((order) => (
            <div className="order-card" key={order._id}>
              <div className="order-card-head">
                <span>Order #{order._id.slice(-6).toUpperCase()} — {order.user?.name} ({order.user?.email})</span>
                <select
                  className={`status-select status-${order.status}`}
                  value={order.status}
                  onChange={(e) => handleStatusChange(order._id, e.target.value)}
                >
                  {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
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
      </main>
    </div>
  );
}
