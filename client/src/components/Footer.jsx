import React from 'react';
import { ShoppingBag, Heart, ShieldCheck, Truck, Headphones } from 'lucide-react';

export const Footer = () => {
  return (
    <footer
      style={{
        background: '#0f172a',
        color: '#94a3b8',
        borderTop: '1px solid #1e293b',
        padding: '3.5rem 1.5rem 2rem',
        marginTop: 'auto',
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '2.5rem',
          marginBottom: '2.5rem',
        }}
      >
        {/* Brand Column */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#ffffff', marginBottom: '1rem' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #4f46e5, #06b6d4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <ShoppingBag size={20} />
            </div>
            <span style={{ fontSize: '1.3rem', fontWeight: '800' }}>
              Shop<span style={{ color: '#818cf8' }}>EZ</span>
            </span>
          </div>
          <p style={{ fontSize: '0.88rem', lineHeight: 1.6, color: '#94a3b8', marginBottom: '1rem' }}>
            Your one-stop destination for effortless online shopping. Browse curated fashion, footwear, electronics, and lifestyle goods with instant checkout.
          </p>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <span className="badge badge-discount" style={{ background: 'rgba(239, 68, 68, 0.2)', color: '#f87171', border: '1px solid #7f1d1d' }}>
              Secure & Certified
            </span>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 style={{ color: '#ffffff', fontSize: '1rem', fontWeight: '700', marginBottom: '1rem' }}>Shop Categories</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.88rem' }}>
            <li><a href="#" style={{ color: '#94a3b8' }}>Men's Fashion & Footwear</a></li>
            <li><a href="#" style={{ color: '#94a3b8' }}>Women's Styles & Outerwear</a></li>
            <li><a href="#" style={{ color: '#94a3b8' }}>Kids & Teen Apparel</a></li>
            <li><a href="#" style={{ color: '#94a3b8' }}>Accessories & Leather Goods</a></li>
            <li><a href="#" style={{ color: '#94a3b8' }}>Smart Tech & Audio</a></li>
          </ul>
        </div>

        {/* Customer Support */}
        <div>
          <h4 style={{ color: '#ffffff', fontSize: '1rem', fontWeight: '700', marginBottom: '1rem' }}>Customer Care</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.88rem' }}>
            <li><a href="#" style={{ color: '#94a3b8' }}>Track Your Order</a></li>
            <li><a href="#" style={{ color: '#94a3b8' }}>Shipping & Delivery Policy</a></li>
            <li><a href="#" style={{ color: '#94a3b8' }}>Easy Returns & Exchanges</a></li>
            <li><a href="#" style={{ color: '#94a3b8' }}>Payment Methods & COD</a></li>
            <li><a href="#" style={{ color: '#94a3b8' }}>FAQ & Help Center</a></li>
          </ul>
        </div>

        {/* Guarantee & Highlights */}
        <div>
          <h4 style={{ color: '#ffffff', fontSize: '1rem', fontWeight: '700', marginBottom: '1rem' }}>ShopEZ Promise</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.85rem' }}>
            <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
              <Truck size={18} color="#818cf8" />
              <span>Fast Worldwide Delivery</span>
            </div>
            <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
              <ShieldCheck size={18} color="#34d399" />
              <span>100% Authentic Products</span>
            </div>
            <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
              <Headphones size={18} color="#fbbf24" />
              <span>24/7 Dedicated Support</span>
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          borderTop: '1px solid #1e293b',
          paddingTop: '1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          fontSize: '0.82rem',
        }}
      >
        <div>© 2026 ShopEZ E-Commerce Inc. All rights reserved.</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
          Crafted with <Heart size={14} fill="#ef4444" color="#ef4444" /> for effortless shopping.
        </div>
      </div>
    </footer>
  );
};
