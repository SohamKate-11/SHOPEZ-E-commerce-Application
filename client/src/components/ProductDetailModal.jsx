import React, { useState } from 'react';
import { X, Star, ShoppingCart, Zap, Check, Truck, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const ProductDetailModal = ({ product, onClose, onDirectBuy }) => {
  if (!product) return null;

  const { addToCart } = useCart();
  const [selectedImg, setSelectedImg] = useState(product.mainImg);
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || 'M');
  const [quantity, setQuantity] = useState(1);

  const images = product.carousel?.length ? product.carousel : [product.mainImg];
  const discountedPrice =
    product.discount > 0
      ? Math.round(product.price * (1 - product.discount / 100))
      : product.price;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-card"
        style={{ maxWidth: '820px', padding: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            zIndex: 10,
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(4px)',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid var(--border-color)',
            color: 'var(--text-main)',
          }}
        >
          <X size={20} />
        </button>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
          {/* Gallery View */}
          <div style={{ padding: '1.5rem', background: '#f8fafc', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div
              style={{
                width: '100%',
                height: '360px',
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                backgroundColor: '#ffffff',
                border: '1px solid var(--border-color)',
              }}
            >
              <img
                src={selectedImg}
                alt={product.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            {/* Thumbnail selector */}
            <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImg(img)}
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    border: selectedImg === img ? '2px solid var(--primary)' : '1px solid var(--border-color)',
                    flexShrink: 0,
                  }}
                >
                  <img src={img} alt={`Thumb ${idx}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </button>
              ))}
            </div>
          </div>

          {/* Details & Selectors */}
          <div style={{ padding: '2rem 1.75rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              {/* Category & Gender */}
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem' }}>
                <span className="badge badge-category">{product.category}</span>
                <span className="badge badge-gender">{product.gender || 'Unisex'}</span>
                {product.discount > 0 && <span className="badge badge-discount">{product.discount}% OFF</span>}
              </div>

              <h2 style={{ fontSize: '1.45rem', fontWeight: '800', marginBottom: '0.5rem', lineHeight: 1.25 }}>
                {product.title}
              </h2>

              {/* Rating */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', color: '#f59e0b' }}>
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      fill={i < Math.floor(product.rating || 4.5) ? '#f59e0b' : 'none'}
                      color="#f59e0b"
                    />
                  ))}
                </div>
                <span style={{ fontWeight: '700', fontSize: '0.9rem' }}>{product.rating || 4.8}</span>
                <span style={{ color: 'var(--text-subtle)', fontSize: '0.85rem' }}>
                  ({product.reviewsCount || 64} verified customer reviews)
                </span>
              </div>

              {/* Price */}
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', marginBottom: '1.25rem' }}>
                <span style={{ fontSize: '1.85rem', fontWeight: '800', color: 'var(--text-main)' }}>
                  ${discountedPrice}
                </span>
                {product.discount > 0 && (
                  <span style={{ fontSize: '1.1rem', color: 'var(--text-subtle)', textDecoration: 'line-through' }}>
                    ${product.price}
                  </span>
                )}
                {product.discount > 0 && (
                  <span style={{ color: 'var(--success)', fontWeight: '700', fontSize: '0.88rem' }}>
                    Save ${(product.price - discountedPrice).toFixed(0)}
                  </span>
                )}
              </div>

              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                {product.description}
              </p>

              {/* Sizes Selection */}
              {product.sizes && product.sizes.length > 0 && (
                <div style={{ marginBottom: '1.25rem' }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.5rem', color: 'var(--text-main)' }}>
                    Select Size: <span style={{ color: 'var(--primary)' }}>{selectedSize}</span>
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {product.sizes.map((s) => (
                      <button
                        key={s}
                        onClick={() => setSelectedSize(s)}
                        style={{
                          padding: '0.5rem 0.9rem',
                          borderRadius: 'var(--radius-sm)',
                          border: selectedSize === s ? '2px solid var(--primary)' : '1px solid var(--border-color)',
                          background: selectedSize === s ? 'var(--primary-light)' : '#ffffff',
                          color: selectedSize === s ? 'var(--primary)' : 'var(--text-main)',
                          fontWeight: selectedSize === s ? '700' : '600',
                          fontSize: '0.85rem',
                          transition: 'all 0.15s',
                        }}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Picker */}
              <div style={{ marginBottom: '1.75rem' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.5rem', color: 'var(--text-main)' }}>
                  Quantity:
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      border: '1px solid var(--border-color)',
                      borderRadius: 'var(--radius-md)',
                      background: '#f8fafc',
                    }}
                  >
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      style={{ padding: '0.5rem 0.85rem', fontWeight: '700', fontSize: '1.1rem' }}
                    >
                      -
                    </button>
                    <span style={{ padding: '0.5rem 0.75rem', fontWeight: '700', minWidth: '32px', textAlign: 'center' }}>
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      style={{ padding: '0.5rem 0.85rem', fontWeight: '700', fontSize: '1.1rem' }}
                    >
                      +
                    </button>
                  </div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--success)', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <Check size={14} /> In Stock ({product.stock || 45} left)
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1rem' }}>
                <button
                  onClick={() => {
                    onDirectBuy(product, selectedSize, quantity);
                    onClose();
                  }}
                  className="btn-accent"
                  style={{ justifyContent: 'center', padding: '0.85rem' }}
                >
                  <Zap size={18} />
                  <span>Shop Now</span>
                </button>

                <button
                  onClick={() => {
                    addToCart(product, selectedSize, quantity);
                    onClose();
                  }}
                  className="btn-primary"
                  style={{ justifyContent: 'center', padding: '0.85rem' }}
                >
                  <ShoppingCart size={18} />
                  <span>Add to Cart</span>
                </button>
              </div>

              <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <Truck size={14} /> Free 3-Day Shipping
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <ShieldCheck size={14} /> 30-Day Money Back
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
