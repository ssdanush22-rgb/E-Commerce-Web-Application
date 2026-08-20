import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Sidebar() {
  const { admin, logout } = useAuth();

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">Shopiva<span> Admin</span></div>
      <nav className="sidebar-nav">
        <NavLink to="/" end>Dashboard</NavLink>
        <NavLink to="/products">Products</NavLink>
        <NavLink to="/orders">Orders</NavLink>
      </nav>
      <div className="sidebar-foot">
        <p>{admin?.name}</p>
        <button className="btn-ghost" onClick={logout}>Logout</button>
      </div>
    </aside>
  );
}
