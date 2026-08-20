import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { USER_APP_URL } from '../api/api';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Login failed');
    }
  }

  return (
    <div className="auth-wrap">
      <a href={USER_APP_URL} className="corner-link">← Back to Shop</a>
      <div className="auth-card">
        <h1>Shopiva<span className="accent"> Admin</span></h1>
        <p className="auth-sub">Sign in to manage your store</p>
        <form className="auth-form" onSubmit={handleSubmit}>
          <input type="email" placeholder="Admin Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          {error && <p className="error-msg">{error}</p>}
          <button className="btn-primary">Login</button>
        </form>
      </div>
    </div>
  );
}
