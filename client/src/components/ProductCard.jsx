import React from 'react';
import { Star, ShoppingCart, ArrowUpRight, Zap } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const ProductCard = ({ product, onViewDetails, onQuickBuy }) => {
  const { addToCart } = useCart();

  const discountedPrice =
    product.discount > 0
      ? Math.round(product.price * (1 - product.discount / 100))
      : product.price;

  return (
    <div
      style={{
        background: '#ffffff',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border-color)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        position: 'relative',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {/* Product Image Box */}
      <div
        style={{
          position: 'relative',
          paddingTop: '80%',
          backgroundColor: '#f8fafc',
          overflow: 'hidden',
          cursor: 'pointer',
        }}
        onClick={() => onViewDetails(product)}
      >
        <img
          src={product.mainImg}
          alt={product.title}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.4s ease',
          }}
          onMouseEnter={(e) => (e.target.style.transform = 'scale(1.06)')}
          onMouseLeave={(e) => (e.target.style.transform = 'scale(1.0)')}
        />

        {/* Discount Badge */}
        {product.discount > 0 && (
          <span
            className="badge badge-discount"
            style={{
              position: 'absolute',
              top: '10px',
              left: '10px',
              zIndex: 2,
            }}
          >
            {product.discount}% OFF
          </span>
        )}

        {/* Gender / Category Pill */}
        <span
          className="badge badge-gender"
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            zIndex: 2,
            background: 'rgba(255,255,255,0.85)',
            backdropFilter: 'blur(4px)',
          }}
        >
          {product.gender || 'Unisex'}
        </span>
      </div>

      {/* Product Info */}
      <div
        style={{
          padding: '1.25rem',
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          justifyContent: 'space-between',
        }}
      >
        <div>
          {/* Category & Rating */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '0.4rem',
            }}
          >
            <span style={{ fontSize: '0.78rem', color: 'var(--primary)', fontWeight: '700', textTransform: 'uppercase' }}>
              {product.category}
            </span>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', fontSize: '0.8rem', fontWeight: '600', color: '#b45309' }}>
              <Star size={14} fill="#f59e0b" color="#f59e0b" />
              <span>{product.rating || 4.7}</span>
              <span style={{ color: 'var(--text-subtle)', fontSize: '0.72rem' }}>
                ({product.reviewsCount || 48})
              </span>
            </div>
          </div>

          {/* Title */}
          <h3
            onClick={() => onViewDetails(product)}
            style={{
              fontSize: '1rem',
              fontWeight: '700',
              color: 'var(--text-main)',
              marginBottom: '0.4rem',
              lineHeight: 1.35,
              cursor: 'pointer',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {product.title}
          </h3>

          {/* Description snippet */}
          <p
            style={{
              fontSize: '0.82rem',
              color: 'var(--text-muted)',
              lineHeight: 1.45,
              marginBottom: '0.85rem',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {product.description}
          </p>
        </div>

        {/* Pricing & CTA Actions */}
        <div>
          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: '0.5rem',
              marginBottom: '1rem',
            }}
          >
            <span style={{ fontSize: '1.35rem', fontWeight: '800', color: 'var(--text-main)' }}>
              ${discountedPrice}
            </span>
            {product.discount > 0 && (
              <span
                style={{
                  fontSize: '0.9rem',
                  color: 'var(--text-subtle)',
                  textDecoration: 'line-through',
                }}
              >
                ${product.price}
              </span>
            )}
          </div>

          {/* Action Buttons: Shop Now & Add to Cart */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
            <button
              onClick={() => onQuickBuy(product)}
              className="btn-accent"
              style={{
                padding: '0.55rem 0.5rem',
                fontSize: '0.85rem',
                justifyContent: 'center',
                borderRadius: 'var(--radius-sm)',
              }}
              title="Immediate Direct Checkout"
            >
              <Zap size={14} />
              <span>Shop Now</span>
            </button>

            <button
              onClick={() => addToCart(product, product.sizes?.[0] || 'M', 1)}
              className="btn-primary"
              style={{
                padding: '0.55rem 0.5rem',
                fontSize: '0.85rem',
                justifyContent: 'center',
                borderRadius: 'var(--radius-sm)',
              }}
            >
              <ShoppingCart size={14} />
              <span>Add to Cart</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
