import React, { useState } from 'react';
import {
  ShoppingBag,
  ShoppingCart,
  User,
  Search,
  LayoutDashboard,
  Package,
  LogOut,
  Menu,
  X,
  Sparkles,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export const Navbar = ({
  currentView,
  setCurrentView,
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  onOpenAuth,
}) => {
  const { user, logout, isAdmin } = useAuth();
  const { totalItems, setIsCartOpen } = useCart();
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const categories = ['All', 'Clothing', 'Footwear', 'Accessories', 'Electronics'];

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--border-color)',
        boxShadow: 'var(--shadow-sm)',
      }}
    >
      {/* Top Banner */}
      <div
        style={{
          background: 'linear-gradient(90deg, #4f46e5, #7c3aed, #06b6d4)',
          color: '#ffffff',
          textAlign: 'center',
          fontSize: '0.8rem',
          padding: '0.35rem 1rem',
          fontWeight: '600',
          letterSpacing: '0.02em',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem',
        }}
      >
        <Sparkles size={14} />
        <span>Welcome to ShopEZ! Enjoy Free Worldwide Express Shipping on all orders above $50</span>
      </div>

      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0.85rem 1.25rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1.25rem',
        }}
      >
        {/* Brand Logo */}
        <div
          onClick={() => {
            setCurrentView('home');
            setSelectedCategory('All');
          }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            cursor: 'pointer',
          }}
        >
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #4f46e5, #06b6d4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              boxShadow: '0 4px 10px rgba(79, 70, 229, 0.3)',
            }}
          >
            <ShoppingBag size={22} />
          </div>
          <div>
            <div style={{ fontSize: '1.4rem', fontWeight: '800', letterSpacing: '-0.03em', lineHeight: 1 }}>
              Shop<span style={{ color: '#4f46e5' }}>EZ</span>
            </div>
            <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: '600', letterSpacing: '0.05em' }}>
              EFFORTLESS SHOPPING
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div
          style={{
            flex: '1',
            maxWidth: '460px',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Search
            size={18}
            style={{
              position: 'absolute',
              left: '1rem',
              color: 'var(--text-subtle)',
            }}
          />
          <input
            type="text"
            placeholder="Search products, brands, or styles..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              if (currentView !== 'catalog') setCurrentView('catalog');
            }}
            style={{
              width: '100%',
              padding: '0.65rem 1rem 0.65rem 2.6rem',
              borderRadius: 'var(--radius-full)',
              border: '1.5px solid var(--border-color)',
              background: '#f8fafc',
              fontSize: '0.9rem',
              outline: 'none',
              transition: 'all 0.2s',
            }}
            onFocus={(e) => (e.target.style.borderColor = 'var(--primary)')}
            onBlur={(e) => (e.target.style.borderColor = 'var(--border-color)')}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              style={{
                position: 'absolute',
                right: '0.75rem',
                color: 'var(--text-subtle)',
                fontSize: '0.85rem',
              }}
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {/* Catalog Link */}
          <button
            onClick={() => setCurrentView('catalog')}
            style={{
              fontWeight: currentView === 'catalog' ? '700' : '600',
              color: currentView === 'catalog' ? 'var(--primary)' : 'var(--text-main)',
              fontSize: '0.92rem',
              padding: '0.5rem 0.75rem',
              borderRadius: 'var(--radius-sm)',
            }}
          >
            Catalog
          </button>

          {/* Orders Link */}
          {user && (
            <button
              onClick={() => setCurrentView('orders')}
              style={{
                fontWeight: currentView === 'orders' ? '700' : '600',
                color: currentView === 'orders' ? 'var(--primary)' : 'var(--text-main)',
                fontSize: '0.92rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
              }}
            >
              <Package size={17} />
              <span>My Orders</span>
            </button>
          )}

          {/* Admin Dashboard */}
          {isAdmin && (
            <button
              onClick={() => setCurrentView('admin')}
              style={{
                fontWeight: currentView === 'admin' ? '700' : '600',
                color: '#7c3aed',
                background: '#f5f3ff',
                padding: '0.45rem 0.8rem',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.88rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                border: '1px solid #ddd6fe',
              }}
            >
              <LayoutDashboard size={16} />
              <span>Admin Panel</span>
            </button>
          )}

          {/* Cart Trigger */}
          <button
            onClick={() => setIsCartOpen(true)}
            style={{
              position: 'relative',
              background: '#f1f5f9',
              padding: '0.6rem',
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-main)',
              transition: 'background 0.2s',
            }}
            title="Open Shopping Cart"
          >
            <ShoppingCart size={20} />
            {totalItems > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: '-5px',
                  right: '-5px',
                  background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                  color: '#ffffff',
                  fontSize: '0.72rem',
                  fontWeight: '700',
                  minWidth: '20px',
                  height: '20px',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '0 4px',
                  boxShadow: '0 2px 5px rgba(239, 68, 68, 0.4)',
                }}
              >
                {totalItems}
              </span>
            )}
          </button>

          {/* User Auth Dropdown */}
          {user ? (
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setShowUserDropdown(!showUserDropdown)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.45rem 0.75rem',
                  background: 'var(--primary-light)',
                  color: 'var(--primary)',
                  borderRadius: 'var(--radius-md)',
                  fontWeight: '600',
                  fontSize: '0.9rem',
                }}
              >
                <User size={18} />
                <span style={{ maxWidth: '100px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {user.username}
                </span>
              </button>

              {showUserDropdown && (
                <div
                  style={{
                    position: 'absolute',
                    right: 0,
                    top: 'calc(100% + 8px)',
                    background: '#ffffff',
                    boxShadow: 'var(--shadow-lg)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-color)',
                    width: '200px',
                    padding: '0.5rem',
                    zIndex: 200,
                  }}
                >
                  <div style={{ padding: '0.5rem', borderBottom: '1px solid var(--border-color)', marginBottom: '0.35rem' }}>
                    <div style={{ fontWeight: '700', fontSize: '0.9rem' }}>{user.username}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {user.email}
                    </div>
                    <div style={{ marginTop: '0.3rem' }}>
                      <span className="badge badge-category" style={{ fontSize: '0.65rem' }}>
                        {user.usertype.toUpperCase()}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setCurrentView('orders');
                      setShowUserDropdown(false);
                    }}
                    style={{
                      width: '100%',
                      textAlign: 'left',
                      padding: '0.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      fontSize: '0.88rem',
                      borderRadius: 'var(--radius-sm)',
                    }}
                  >
                    <Package size={16} /> My Orders
                  </button>

                  {isAdmin && (
                    <button
                      onClick={() => {
                        setCurrentView('admin');
                        setShowUserDropdown(false);
                      }}
                      style={{
                        width: '100%',
                        textAlign: 'left',
                        padding: '0.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        fontSize: '0.88rem',
                        color: '#7c3aed',
                        borderRadius: 'var(--radius-sm)',
                      }}
                    >
                      <LayoutDashboard size={16} /> Admin Panel
                    </button>
                  )}

                  <button
                    onClick={() => {
                      logout();
                      setShowUserDropdown(false);
                    }}
                    style={{
                      width: '100%',
                      textAlign: 'left',
                      padding: '0.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      fontSize: '0.88rem',
                      color: 'var(--danger)',
                      borderRadius: 'var(--radius-sm)',
                    }}
                  >
                    <LogOut size={16} /> Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="btn-primary"
              style={{ padding: '0.55rem 1.1rem', fontSize: '0.88rem' }}
            >
              Sign In
            </button>
          )}
        </div>
      </div>

      {/* Category Pills Navigation Bar */}
      <div
        style={{
          borderTop: '1px solid var(--border-color)',
          background: '#ffffff',
          padding: '0.45rem 1.25rem',
          display: 'flex',
          justifyContent: 'center',
          gap: '0.5rem',
          overflowX: 'auto',
        }}
      >
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setSelectedCategory(cat);
              if (currentView !== 'catalog') setCurrentView('catalog');
            }}
            style={{
              padding: '0.35rem 0.9rem',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.85rem',
              fontWeight: selectedCategory === cat ? '700' : '500',
              background: selectedCategory === cat ? 'var(--primary-light)' : 'transparent',
              color: selectedCategory === cat ? 'var(--primary)' : 'var(--text-muted)',
              transition: 'all 0.2s',
            }}
          >
            {cat}
          </button>
        ))}
      </div>
    </header>
  );
};
