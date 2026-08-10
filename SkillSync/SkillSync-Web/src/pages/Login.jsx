import React, { useState } from 'react';
import { LogIn, Mail, Lock, AlertCircle } from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';
import '../styles/login.css';

const Login = ({ setActivePage, data, setCurrentUser }) => {
  const [email, setEmail] = useState('alex@skillsync.io');
  const [password, setPassword] = useState('password123');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    const user = data.users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (user && user.password === password) {
      setCurrentUser(user);
      setActivePage('Dashboard');
    } else {
      setError('Invalid email or password. Demo accounts: alex@skillsync.io, sophia@skillsync.io');
    }
  };

  return (
    <div className="auth-page-container">
      <Card glow className="auth-card">
        <div className="auth-header">
          <div style={{
            width: '50px',
            height: '50px',
            borderRadius: '14px',
            background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1rem',
            color: '#fff'
          }}>
            <LogIn size={26} />
          </div>
          <h2>Welcome Back</h2>
          <p className="auth-subtitle">Sign in to access your SkillSync dashboard</p>
        </div>

        {error && (
          <div style={{
            padding: '0.75rem 1rem',
            background: 'rgba(239, 68, 68, 0.15)',
            border: '1px solid rgba(239, 68, 68, 0.4)',
            borderRadius: '8px',
            color: '#fca5a5',
            fontSize: '0.85rem',
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <AlertCircle size={16} />
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email Address</label>
            <div style={{ position: 'relative' }}>
              <input
                type="email"
                className="input-field"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@domain.com"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          <Button type="submit" variant="primary" size="large" style={{ width: '100%', marginTop: '1rem' }}>
            Sign In
          </Button>
        </form>

        <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          Don't have an account?{' '}
          <button
            onClick={() => setActivePage('Register')}
            style={{ background: 'none', border: 'none', color: 'var(--primary)', fontWeight: '600', cursor: 'pointer' }}
          >
            Create one here
          </button>
        </div>
      </Card>
    </div>
  );
};

export default Login;
