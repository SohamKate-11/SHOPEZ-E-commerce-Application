import React, { useState } from 'react';
import { X, Lock, Mail, User, Sparkles, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const AuthModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const { login, register } = useAuth();
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    usertype: 'customer',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (isLoginMode) {
      const res = await login(formData.email, formData.password);
      if (res.success) onClose();
    } else {
      const res = await register(
        formData.username,
        formData.email,
        formData.password,
        formData.usertype
      );
      if (res.success) onClose();
    }
    setLoading(false);
  };

  const fillQuickCredentials = (role) => {
    if (role === 'admin') {
      setFormData({
        username: 'ShopEZ Admin',
        email: 'admin@shopez.com',
        password: 'adminpassword123',
        usertype: 'admin',
      });
    } else {
      setFormData({
        username: 'Alex Parker',
        email: 'alex@example.com',
        password: 'userpassword123',
        usertype: 'customer',
      });
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-card"
        style={{ maxWidth: '440px', padding: '2rem' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: '#f1f5f9',
            borderRadius: '50%',
            padding: '0.4rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <X size={18} />
        </button>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <div
            style={{
              width: '52px',
              height: '52px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #4f46e5, #06b6d4)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 0.75rem',
            }}
          >
            <Lock size={24} />
          </div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: '800' }}>
            {isLoginMode ? 'Welcome to ShopEZ' : 'Create an Account'}
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            {isLoginMode ? 'Sign in to access your cart & orders' : 'Join ShopEZ for seamless shopping'}
          </p>
        </div>

        {/* Tab switch */}
        <div
          style={{
            display: 'flex',
            background: '#f1f5f9',
            borderRadius: 'var(--radius-md)',
            padding: '0.25rem',
            marginBottom: '1.5rem',
          }}
        >
          <button
            type="button"
            onClick={() => setIsLoginMode(true)}
            style={{
              flex: 1,
              padding: '0.5rem',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.88rem',
              fontWeight: '700',
              background: isLoginMode ? '#ffffff' : 'transparent',
              color: isLoginMode ? 'var(--primary)' : 'var(--text-muted)',
              boxShadow: isLoginMode ? 'var(--shadow-sm)' : 'none',
              transition: 'all 0.2s',
            }}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => setIsLoginMode(false)}
            style={{
              flex: 1,
              padding: '0.5rem',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.88rem',
              fontWeight: '700',
              background: !isLoginMode ? '#ffffff' : 'transparent',
              color: !isLoginMode ? 'var(--primary)' : 'var(--text-muted)',
              boxShadow: !isLoginMode ? 'var(--shadow-sm)' : 'none',
              transition: 'all 0.2s',
            }}
          >
            Register
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {!isLoginMode && (
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <div style={{ position: 'relative' }}>
                <User size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-subtle)' }} />
                <input
                  type="text"
                  required
                  className="form-input"
                  style={{ paddingLeft: '2.5rem' }}
                  placeholder="e.g. Alex Parker"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                />
              </div>
            </div>
          )}

          <div className="form-group">
            <label className="form-label">Email Address</label>
            <div style={{ position: 'relative' }}>
              <Mail size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-subtle)' }} />
              <input
                type="email"
                required
                className="form-input"
                style={{ paddingLeft: '2.5rem' }}
                placeholder="name@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <div style={{ position: 'relative' }}>
              <Lock size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-subtle)' }} />
              <input
                type="password"
                required
                className="form-input"
                style={{ paddingLeft: '2.5rem' }}
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>
          </div>

          {!isLoginMode && (
            <div className="form-group">
              <label className="form-label">Account Role</label>
              <select
                className="form-input"
                value={formData.usertype}
                onChange={(e) => setFormData({ ...formData, usertype: e.target.value })}
              >
                <option value="customer">Shopper / Customer</option>
                <option value="admin">Store Admin / Seller</option>
              </select>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-primary"
            style={{ width: '100%', padding: '0.85rem', marginTop: '0.5rem' }}
          >
            <span>{loading ? 'Please wait...' : isLoginMode ? 'Sign In' : 'Create Account'}</span>
            <ArrowRight size={18} />
          </button>
        </form>

        {/* 1-Click Quick Fill Credentials */}
        <div style={{ marginTop: '1.5rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border-color)' }}>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '0.6rem', textAlign: 'center', fontWeight: '600' }}>
            ⚡ 1-Click Demo Accounts:
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
            <button
              type="button"
              onClick={() => fillQuickCredentials('customer')}
              style={{
                fontSize: '0.75rem',
                padding: '0.45rem',
                borderRadius: '6px',
                border: '1px solid #cbd5e1',
                background: '#f8fafc',
                fontWeight: '600',
              }}
            >
              Customer Demo
            </button>
            <button
              type="button"
              onClick={() => fillQuickCredentials('admin')}
              style={{
                fontSize: '0.75rem',
                padding: '0.45rem',
                borderRadius: '6px',
                border: '1px solid #ddd6fe',
                background: '#f5f3ff',
                color: '#7c3aed',
                fontWeight: '600',
              }}
            >
              Admin Demo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
