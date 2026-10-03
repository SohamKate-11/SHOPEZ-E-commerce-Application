import React from 'react';
import { CheckCircle, Package, ArrowRight, Truck, Calendar } from 'lucide-react';

export const OrderSuccessModal = ({ order, onClose, onViewOrders }) => {
  if (!order) return null;

  const deliveryDateFormatted = order.deliveryDate
    ? new Date(order.deliveryDate).toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
      })
    : 'In 3 to 4 days';

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-card"
        style={{ maxWidth: '480px', padding: '2rem', textAlign: 'center' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            width: '76px',
            height: '76px',
            borderRadius: '50%',
            background: 'var(--success-light)',
            color: 'var(--success)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.25rem',
            boxShadow: '0 8px 16px rgba(16, 185, 129, 0.25)',
          }}
        >
          <CheckCircle size={44} />
        </div>

        <span className="badge badge-delivered" style={{ marginBottom: '0.75rem' }}>
          Order Confirmed
        </span>

        <h2 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '0.4rem', color: 'var(--text-main)' }}>
          Thank You For Your Order!
        </h2>

        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem', lineHeight: 1.5 }}>
          Your order has been placed successfully. We've sent the confirmation receipt to{' '}
          <strong>{order.email}</strong>.
        </p>

        {/* Order Details Card */}
        <div
          style={{
            background: '#f8fafc',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-md)',
            padding: '1.25rem',
            textAlign: 'left',
            marginBottom: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.6rem',
            fontSize: '0.88rem',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--text-muted)' }}>Order ID:</span>
            <span style={{ fontWeight: '700', fontFamily: 'monospace' }}>{order._id}</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--text-muted)' }}>Total Paid:</span>
            <span style={{ fontWeight: '800', color: 'var(--primary)' }}>${order.totalAmount}</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--text-muted)' }}>Payment Method:</span>
            <span style={{ fontWeight: '600' }}>{order.paymentMethod}</span>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              paddingTop: '0.6rem',
              borderTop: '1px dashed var(--border-color)',
              color: 'var(--text-main)',
              fontWeight: '600',
            }}
          >
            <Truck size={16} color="var(--primary)" />
            <span>Estimated Delivery: {deliveryDateFormatted}</span>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
          <button
            onClick={() => {
              onClose();
              onViewOrders();
            }}
            className="btn-primary"
            style={{ fontSize: '0.9rem', justifyContent: 'center' }}
          >
            <Package size={16} />
            <span>View My Orders</span>
          </button>

          <button
            onClick={onClose}
            className="btn-secondary"
            style={{ fontSize: '0.9rem', justifyContent: 'center' }}
          >
            <span>Continue Shopping</span>
          </button>
        </div>
      </div>
    </div>
  );
};
