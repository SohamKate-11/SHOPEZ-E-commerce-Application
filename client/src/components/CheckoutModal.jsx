import React, { useState } from 'react';
import { X, CreditCard, Banknote, Smartphone, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { api } from '../services/api';
import { useToast } from '../context/ToastContext';

export const CheckoutModal = ({ checkoutItems, onClose, onOrderSuccess }) => {
  const { user } = useAuth();
  const { clearCart } = useCart();
  const { addToast } = useToast();

  const [formData, setFormData] = useState({
    name: user?.username || '',
    email: user?.email || '',
    mobile: '9876543210',
    address: '221B Baker Street, Flat 4B',
    pincode: '400001',
    paymentMethod: 'COD',
  });

  const [loading, setLoading] = useState(false);

  // Calculate order items totals
  const totalAmount = checkoutItems.reduce((acc, item) => {
    const unitPrice =
      item.discount > 0 ? item.price * (1 - item.discount / 100) : item.price;
    return acc + unitPrice * item.quantity;
  }, 0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.mobile || !formData.address || !formData.pincode) {
      addToast('Please fill in all delivery details', 'warning');
      return;
    }

    setLoading(true);

    try {
      // Map items for API schema
      const formattedItems = checkoutItems.map((item) => ({
        productId: item.productId || item._id,
        title: item.title,
        desc: item.description || item.desc || '',
        image: item.mainImg || item.image,
        size: item.size || 'M',
        quantity: item.quantity,
        price: item.price,
        discount: item.discount || 0,
      }));

      let order;
      if (user && localStorage.getItem('shopez_token')) {
        order = await api.createOrder({
          ...formData,
          items: formattedItems,
          totalAmount: Math.round(totalAmount),
        });
      } else {
        // Guest or offline mock order
        const estDelivery = new Date();
        estDelivery.setDate(estDelivery.getDate() + 4);

        order = {
          _id: 'ORD-' + Math.floor(100000 + Math.random() * 900000),
          userId: user?._id || 'guest',
          ...formData,
          items: formattedItems,
          title: formattedItems[0].title,
          image: formattedItems[0].image,
          totalAmount: Math.round(totalAmount),
          status: 'Placed',
          orderDate: new Date().toISOString(),
          deliveryDate: estDelivery.toISOString(),
        };

        // Save into local storage
        const savedOrders = JSON.parse(localStorage.getItem('shopez_my_orders') || '[]');
        savedOrders.unshift(order);
        localStorage.setItem('shopez_my_orders', JSON.stringify(savedOrders));
      }

      await clearCart();
      addToast('🎉 Order placed successfully!', 'success');
      onOrderSuccess(order);
    } catch (err) {
      addToast(err.message || 'Failed to place order', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-card"
        style={{ maxWidth: '750px', padding: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            padding: '1.25rem 1.75rem',
            borderBottom: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: '#f8fafc',
          }}
        >
          <div>
            <h2 style={{ fontSize: '1.3rem', fontWeight: '800' }}>Order Details & Checkout</h2>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              Complete your order with secure shipping and instant confirmation
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              padding: '0.4rem',
              borderRadius: '50%',
              background: '#ffffff',
              border: '1px solid var(--border-color)',
            }}
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ padding: '1.75rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {/* Left: Shipping & Contact Form */}
            <div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: '700', marginBottom: '1rem', color: 'var(--text-main)' }}>
                1. Delivery Address
              </h3>

              <div className="form-group">
                <label className="form-label">Full Name *</label>
                <input
                  type="text"
                  required
                  className="form-input"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. John Doe"
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div className="form-group">
                  <label className="form-label">Mobile Number *</label>
                  <input
                    type="tel"
                    required
                    className="form-input"
                    value={formData.mobile}
                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                    placeholder="10-digit number"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Pincode / Postal *</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    value={formData.pincode}
                    onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                    placeholder="e.g. 400001"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Email Address (for Order Updates) *</label>
                <input
                  type="email"
                  required
                  className="form-input"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@example.com"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Street Address & Landmark *</label>
                <textarea
                  required
                  rows={2}
                  className="form-input"
                  style={{ resize: 'none' }}
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Apartment, Street name, Area"
                />
              </div>

              {/* Payment Method Selector */}
              <h3 style={{ fontSize: '1.05rem', fontWeight: '700', margin: '1.25rem 0 0.75rem', color: 'var(--text-main)' }}>
                2. Payment Method
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem' }}>
                {[
                  { id: 'COD', label: 'Cash on Delivery', icon: Banknote },
                  { id: 'Card', label: 'Credit/Debit Card', icon: CreditCard },
                  { id: 'UPI', label: 'Instant UPI', icon: Smartphone },
                ].map((pm) => {
                  const Icon = pm.icon;
                  const isSelected = formData.paymentMethod === pm.id;
                  return (
                    <div
                      key={pm.id}
                      onClick={() => setFormData({ ...formData, paymentMethod: pm.id })}
                      style={{
                        padding: '0.75rem 0.5rem',
                        borderRadius: 'var(--radius-md)',
                        border: isSelected ? '2px solid var(--primary)' : '1px solid var(--border-color)',
                        background: isSelected ? 'var(--primary-light)' : '#ffffff',
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '0.35rem',
                        textAlign: 'center',
                        transition: 'all 0.15s',
                      }}
                    >
                      <Icon size={20} color={isSelected ? 'var(--primary)' : 'var(--text-muted)'} />
                      <span style={{ fontSize: '0.75rem', fontWeight: isSelected ? '700' : '500' }}>
                        {pm.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right: Order Summary Preview */}
            <div
              style={{
                background: '#f8fafc',
                padding: '1.25rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-color)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '0.85rem' }}>
                  Items in this Order ({checkoutItems.length})
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxHeight: '200px', overflowY: 'auto', marginBottom: '1rem' }}>
                  {checkoutItems.map((item, idx) => {
                    const price = item.discount > 0 ? item.price * (1 - item.discount / 100) : item.price;
                    return (
                      <div
                        key={idx}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.75rem',
                          background: '#ffffff',
                          padding: '0.6rem',
                          borderRadius: '8px',
                          border: '1px solid var(--border-color)',
                        }}
                      >
                        <img
                          src={item.mainImg || item.image}
                          alt={item.title}
                          style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: '6px' }}
                        />
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: '0.85rem', fontWeight: '700', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {item.title}
                          </div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                            Size: {item.size || 'M'} | Qty: {item.quantity}
                          </div>
                        </div>
                        <div style={{ fontWeight: '700', fontSize: '0.9rem' }}>
                          ${Math.round(price * item.quantity)}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', borderTop: '1px solid var(--border-color)', paddingTop: '0.85rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    <span>Estimated Shipping</span>
                    <span style={{ color: 'var(--success)', fontWeight: '700' }}>FREE</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    <span>Estimated Delivery</span>
                    <span style={{ fontWeight: '600' }}>3-4 Business Days</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: '800', marginTop: '0.5rem', paddingTop: '0.5rem', borderTop: '1px dashed var(--border-color)' }}>
                    <span>Final Amount</span>
                    <span style={{ color: 'var(--primary)' }}>${Math.round(totalAmount)}</span>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: '1.5rem' }}>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary"
                  style={{
                    width: '100%',
                    padding: '0.9rem',
                    fontSize: '1rem',
                    borderRadius: 'var(--radius-md)',
                  }}
                >
                  <CheckCircle2 size={18} />
                  <span>{loading ? 'Processing Order...' : 'Confirm & Place Order'}</span>
                </button>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.35rem',
                    fontSize: '0.75rem',
                    color: 'var(--text-muted)',
                    marginTop: '0.6rem',
                  }}
                >
                  <ShieldCheck size={14} color="var(--success)" />
                  <span>Guaranteed Safe Checkout</span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
