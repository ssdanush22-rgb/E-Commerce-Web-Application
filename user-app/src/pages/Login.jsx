import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ADMIN_APP_URL } from '../api/api';

export default function Login() {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, register } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    try {
      if (isRegister) {
        await register(name, email, password);
      } else {
        await login(email, password);
      }
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    }
  }

  return (
    <div className="auth-wrap">
      <a href={ADMIN_APP_URL} className="corner-link">Admin Login →</a>
      <div className="auth-card">
        <h1>Shopiva<span className="accent">.</span></h1>
        <div className="auth-tabs">
          <button className={`tab-btn ${!isRegister ? 'active' : ''}`} onClick={() => setIsRegister(false)}>Login</button>
          <button className={`tab-btn ${isRegister ? 'active' : ''}`} onClick={() => setIsRegister(true)}>Register</button>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {isRegister && (
            <input placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required />
          )}
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} />
          {error && <p className="error-msg">{error}</p>}
          <button className="btn-primary">{isRegister ? 'Create Account' : 'Login'}</button>
        </form>

        <Link to="/" className="back-link">← Continue browsing</Link>
      </div>
    </div>
  );
}
