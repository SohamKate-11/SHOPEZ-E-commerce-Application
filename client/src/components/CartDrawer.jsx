import React from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const CartDrawer = ({ onProceedToCheckout }) => {
  const {
    items,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    originalSubtotal,
    discountSavings,
    finalTotal,
    totalItems,
  } = useCart();

  if (!isCartOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.65)',
        backdropFilter: 'blur(4px)',
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'flex-end',
        animation: 'fadeIn 0.2s ease-out',
      }}
      onClick={() => setIsCartOpen(false)}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '460px',
          height: '100%',
          backgroundColor: '#ffffff',
          boxShadow: 'var(--shadow-xl)',
          display: 'flex',
          flexDirection: 'column',
          animation: 'slideLeft 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            padding: '1.25rem 1.5rem',
            borderBottom: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <ShoppingBag size={20} color="var(--primary)" />
            <h2 style={{ fontSize: '1.2rem', fontWeight: '800' }}>Your Cart ({totalItems})</h2>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            style={{
              padding: '0.4rem',
              borderRadius: '50%',
              background: '#f1f5f9',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Item List */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}
        >
          {items.length === 0 ? (
            <div
              style={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                color: 'var(--text-muted)',
                padding: '2rem',
              }}
            >
              <div
                style={{
                  width: '72px',
                  height: '72px',
                  borderRadius: '50%',
                  background: 'var(--primary-light)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--primary)',
                  marginBottom: '1rem',
                }}
              >
                <ShoppingBag size={36} />
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: '700', marginBottom: '0.4rem', color: 'var(--text-main)' }}>
                Your cart is empty
              </h3>
              <p style={{ fontSize: '0.88rem', marginBottom: '1.5rem' }}>
                Looks like you haven't added any items yet. Explore our catalog and find great deals!
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="btn-primary"
                style={{ fontSize: '0.9rem' }}
              >
                Start Shopping
              </button>
            </div>
          ) : (
            items.map((item) => {
              const unitPrice =
                item.discount > 0
                  ? Math.round(item.price * (1 - item.discount / 100))
                  : item.price;
              const itemTotal = unitPrice * item.quantity;

              return (
                <div
                  key={item._id}
                  style={{
                    display: 'flex',
                    gap: '1rem',
                    padding: '1rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-color)',
                    background: '#f8fafc',
                  }}
                >
                  <img
                    src={item.mainImg}
                    alt={item.title}
                    style={{
                      width: '75px',
                      height: '75px',
                      objectFit: 'cover',
                      borderRadius: '8px',
                      backgroundColor: '#ffffff',
                    }}
                  />
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                        <h4 style={{ fontSize: '0.95rem', fontWeight: '700', lineHeight: 1.3 }}>{item.title}</h4>
                        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.2rem' }}>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                            Size: <strong style={{ color: 'var(--text-main)' }}>{item.size || 'M'}</strong>
                          </span>
                          {item.discount > 0 && (
                            <span className="badge badge-discount" style={{ fontSize: '0.65rem' }}>
                              {item.discount}% OFF
                            </span>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={() => removeFromCart(item._id)}
                        style={{ color: 'var(--text-subtle)', padding: '0.2rem' }}
                        title="Remove item"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.75rem' }}>
                      <div
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          border: '1px solid var(--border-color)',
                          borderRadius: '6px',
                          background: '#ffffff',
                        }}
                      >
                        <button
                          onClick={() => updateQuantity(item._id, item.quantity - 1)}
                          style={{ padding: '0.2rem 0.5rem', fontWeight: '700' }}
                        >
                          -
                        </button>
                        <span style={{ padding: '0.2rem 0.5rem', fontSize: '0.85rem', fontWeight: '700', minWidth: '24px', textAlign: 'center' }}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item._id, item.quantity + 1)}
                          style={{ padding: '0.2rem 0.5rem', fontWeight: '700' }}
                        >
                          +
                        </button>
                      </div>

                      <div style={{ fontWeight: '800', fontSize: '1rem', color: 'var(--text-main)' }}>
                        ${itemTotal}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer & Price Breakdown */}
        {items.length > 0 && (
          <div
            style={{
              padding: '1.5rem',
              borderTop: '1px solid var(--border-color)',
              background: '#ffffff',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                <span>Subtotal</span>
                <span>${originalSubtotal}</span>
              </div>
              {discountSavings > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', color: 'var(--success)', fontWeight: '600' }}>
                  <span>Discounts Applied</span>
                  <span>-${discountSavings}</span>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                <span>Shipping</span>
                <span style={{ color: 'var(--success)', fontWeight: '700' }}>FREE</span>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '1.25rem',
                  fontWeight: '800',
                  color: 'var(--text-main)',
                  paddingTop: '0.75rem',
                  borderTop: '1px solid var(--border-color)',
                }}
              >
                <span>Total Amount</span>
                <span>${finalTotal}</span>
              </div>
            </div>

            <button
              onClick={() => {
                setIsCartOpen(false);
                onProceedToCheckout(items);
              }}
              className="btn-primary"
              style={{
                width: '100%',
                padding: '0.9rem',
                fontSize: '1rem',
                borderRadius: 'var(--radius-md)',
              }}
            >
              <span>Proceed to Checkout</span>
              <ArrowRight size={18} />
            </button>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.4rem',
                fontSize: '0.75rem',
                color: 'var(--text-muted)',
                marginTop: '0.75rem',
              }}
            >
              <ShieldCheck size={14} color="var(--success)" />
              <span>Safe & Secure 256-Bit Encrypted Checkout</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
