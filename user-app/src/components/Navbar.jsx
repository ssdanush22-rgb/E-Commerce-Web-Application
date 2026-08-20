import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { totalItems } = useCart();

  return (
    <nav className="navbar">
      <div className="nav-wrap">
        <Link to="/" className="nav-logo">Shopiva<span>.</span></Link>
        <div className="nav-links">
          <Link to="/">Products</Link>
          {user && <Link to="/orders">My Orders</Link>}
          <Link to="/cart" className="cart-link">
            Cart {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
          </Link>
          {user ? (
            <>
              <span className="nav-user">Hi, {user.name}</span>
              <button className="btn-ghost" onClick={logout}>Logout</button>
            </>
          ) : (
            <Link to="/login" className="btn-primary-sm">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
}
