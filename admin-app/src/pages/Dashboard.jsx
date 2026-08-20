import { useEffect, useState } from 'react';
import api from '../api/api';
import Sidebar from '../components/Sidebar';

export default function Dashboard() {
  const [stats, setStats] = useState({ products: 0, orders: 0, revenue: 0, pending: 0 });

  useEffect(() => {
    async function loadStats() {
      const [productsRes, ordersRes] = await Promise.all([
        api.get('/products'),
        api.get('/orders')
      ]);
      const orders = ordersRes.data;
      setStats({
        products: productsRes.data.length,
        orders: orders.length,
        revenue: orders.reduce((sum, o) => sum + o.totalAmount, 0),
        pending: orders.filter((o) => o.status === 'pending').length
      });
    }
    loadStats().catch(() => {});
  }, []);

  return (
    <div className="admin-layout">
      <Sidebar />
      <main className="admin-main">
        <h1>Dashboard</h1>
        <div className="stat-cards">
          <div className="stat-card">
            <span className="stat-card-label">Total Products</span>
            <span className="stat-card-num">{stats.products}</span>
          </div>
          <div className="stat-card">
            <span className="stat-card-label">Total Orders</span>
            <span className="stat-card-num">{stats.orders}</span>
          </div>
          <div className="stat-card">
            <span className="stat-card-label">Pending Orders</span>
            <span className="stat-card-num">{stats.pending}</span>
          </div>
          <div className="stat-card highlight">
            <span className="stat-card-label">Total Revenue</span>
            <span className="stat-card-num">₹{stats.revenue.toFixed(2)}</span>
          </div>
        </div>
      </main>
    </div>
  );
}
