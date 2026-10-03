import React, { useState, useEffect } from 'react';
import { Package, Truck, Calendar, MapPin, CheckCircle, Clock, ShoppingBag } from 'lucide-react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';

export const MyOrdersPage = ({ onStartShopping }) => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (user && localStorage.getItem('shopez_token')) {
          const data = await api.getMyOrders();
          setOrders(data);
        } else {
          // Local fallback
          const local = JSON.parse(localStorage.getItem('shopez_my_orders') || '[]');
          setOrders(local);
        }
      } catch (err) {
        const local = JSON.parse(localStorage.getItem('shopez_my_orders') || '[]');
        setOrders(local);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
        <p>Loading your orders...</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div
        style={{
          background: '#ffffff',
          borderRadius: 'var(--radius-lg)',
          padding: '4rem 2rem',
          textAlign: 'center',
          maxWidth: '600px',
          margin: '2rem auto',
          border: '1px solid var(--border-color)',
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
            margin: '0 auto 1.25rem',
          }}
        >
          <ShoppingBag size={36} />
        </div>
        <h2 style={{ fontSize: '1.4rem', fontWeight: '800', marginBottom: '0.5rem' }}>No Orders Found</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginBottom: '1.75rem' }}>
          You haven't placed any orders yet. Explore our latest collections and shop your favorites today!
        </p>
        <button onClick={onStartShopping} className="btn-primary">
          Start Shopping
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ marginBottom: '1.75rem' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: '800', marginBottom: '0.25rem' }}>My Orders</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Track delivery status, review past purchases, and download order receipts
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {orders.map((order) => {
          const formattedDate = new Date(order.orderDate || order.createdAt || Date.now()).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          });

          const deliveryDate = order.deliveryDate
            ? new Date(order.deliveryDate).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
              })
            : 'In 3 to 4 days';

          const items = order.items && order.items.length > 0 ? order.items : [
            {
              title: order.title || 'ShopEZ Item',
              desc: order.desc,
              image: order.image || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
              size: order.size || 'M',
              quantity: order.quantity || 1,
              price: order.price || order.totalAmount,
            }
          ];

          const getStatusBadge = (st) => {
            if (st === 'Delivered') return <span className="badge badge-delivered">Delivered</span>;
            if (st === 'Shipped') return <span className="badge badge-shipped">Shipped</span>;
            if (st === 'Cancelled') return <span className="badge badge-discount">Cancelled</span>;
            return <span className="badge badge-placed">Placed</span>;
          };

          return (
            <div
              key={order._id}
              style={{
                background: '#ffffff',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border-color)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              {/* Order Header */}
              <div
                style={{
                  padding: '1rem 1.5rem',
                  background: '#f8fafc',
                  borderBottom: '1px solid var(--border-color)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '0.75rem',
                }}
              >
                <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.85rem' }}>
                  <div>
                    <span style={{ color: 'var(--text-muted)' }}>Order Placed: </span>
                    <strong style={{ color: 'var(--text-main)' }}>{formattedDate}</strong>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-muted)' }}>Total: </span>
                    <strong style={{ color: 'var(--primary)' }}>${order.totalAmount}</strong>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-muted)' }}>Payment: </span>
                    <strong>{order.paymentMethod || 'COD'}</strong>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  {getStatusBadge(order.status)}
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-subtle)', fontFamily: 'monospace' }}>
                    #{order._id.toString().slice(-8)}
                  </span>
                </div>
              </div>

              {/* Order Items */}
              <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {items.map((it, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <img
                      src={it.image}
                      alt={it.title}
                      style={{
                        width: '70px',
                        height: '70px',
                        borderRadius: '8px',
                        objectFit: 'cover',
                        backgroundColor: '#f8fafc',
                        border: '1px solid var(--border-color)',
                      }}
                    />
                    <div style={{ flex: 1 }}>
                      <h4 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '0.2rem' }}>{it.title}</h4>
                      <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', display: 'flex', gap: '0.75rem' }}>
                        <span>Size: <strong>{it.size}</strong></span>
                        <span>Quantity: <strong>{it.quantity}</strong></span>
                        <span>Price: <strong>${it.price}</strong></span>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Shipping info footer */}
                <div
                  style={{
                    borderTop: '1px dashed var(--border-color)',
                    paddingTop: '1rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '0.75rem',
                    fontSize: '0.85rem',
                    color: 'var(--text-muted)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <MapPin size={15} color="var(--primary)" />
                    <span>Ship to: <strong>{order.name}</strong>, {order.address}, {order.pincode}</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#0369a1', fontWeight: '600' }}>
                    <Truck size={15} />
                    <span>Est. Delivery: {deliveryDate}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
