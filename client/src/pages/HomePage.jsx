import React from 'react';
import { HeroBanner } from '../components/HeroBanner';
import { ProductCard } from '../components/ProductCard';
import { ArrowRight, Sparkles, Flame, Layers } from 'lucide-react';

export const HomePage = ({
  products,
  onViewDetails,
  onQuickBuy,
  onNavigateCatalog,
  onSelectCategory,
}) => {
  const featuredProducts = products.filter((p) => p.featured).slice(0, 4);
  const dealProducts = products.filter((p) => (p.discount || 0) >= 15).slice(0, 4);

  const categories = [
    {
      name: 'Clothing',
      count: '120+ Styles',
      image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=500&auto=format&fit=crop&q=60',
    },
    {
      name: 'Footwear',
      count: '80+ Kicks',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=60',
    },
    {
      name: 'Accessories',
      count: '60+ Essentials',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60',
    },
    {
      name: 'Electronics',
      count: '40+ Gadgets',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60',
    },
  ];

  return (
    <div>
      {/* Hero Slider */}
      <HeroBanner
        onShopNow={(cat) => onNavigateCatalog({ category: cat })}
        onSelectCategory={onSelectCategory}
      />

      {/* Category Showcase */}
      <section style={{ marginBottom: '3.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1.25rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--primary)', fontWeight: '700', fontSize: '0.85rem' }}>
              <Layers size={16} />
              <span>COLLECTIONS</span>
            </div>
            <h2 style={{ fontSize: '1.6rem', fontWeight: '800' }}>Shop By Category</h2>
          </div>
          <button
            onClick={() => onNavigateCatalog({})}
            style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--primary)', fontWeight: '700', fontSize: '0.9rem' }}
          >
            <span>View All</span>
            <ArrowRight size={16} />
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
          {categories.map((cat) => (
            <div
              key={cat.name}
              onClick={() => onSelectCategory(cat.name)}
              style={{
                position: 'relative',
                height: '190px',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                cursor: 'pointer',
                boxShadow: 'var(--shadow-md)',
              }}
            >
              <img
                src={cat.image}
                alt={cat.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s' }}
                onMouseEnter={(e) => (e.target.style.transform = 'scale(1.08)')}
                onMouseLeave={(e) => (e.target.style.transform = 'scale(1.0)')}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, rgba(15,23,42,0.1) 0%, rgba(15,23,42,0.85) 100%)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  padding: '1.25rem',
                  color: '#ffffff',
                }}
              >
                <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#ffffff', marginBottom: '0.15rem' }}>{cat.name}</h3>
                <span style={{ fontSize: '0.8rem', color: '#cbd5e1' }}>{cat.count}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section style={{ marginBottom: '3.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1.25rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--primary)', fontWeight: '700', fontSize: '0.85rem' }}>
              <Sparkles size={16} />
              <span>HANDPICKED</span>
            </div>
            <h2 style={{ fontSize: '1.6rem', fontWeight: '800' }}>Featured Highlights</h2>
          </div>
          <button
            onClick={() => onNavigateCatalog({})}
            style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--primary)', fontWeight: '700', fontSize: '0.9rem' }}
          >
            <span>Explore All</span>
            <ArrowRight size={16} />
          </button>
        </div>

        <div className="product-grid">
          {(featuredProducts.length > 0 ? featuredProducts : products.slice(0, 4)).map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              onViewDetails={onViewDetails}
              onQuickBuy={onQuickBuy}
            />
          ))}
        </div>
      </section>

      {/* Flash Deals / Top Discounts */}
      <section style={{ marginBottom: '2rem' }}>
        <div
          style={{
            background: 'linear-gradient(135deg, #1e1b4b, #312e81)',
            borderRadius: 'var(--radius-lg)',
            padding: '2rem',
            color: '#ffffff',
            boxShadow: 'var(--shadow-xl)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: '#ef4444', padding: '0.3rem 0.75rem', borderRadius: 'var(--radius-full)', fontSize: '0.78rem', fontWeight: '800', marginBottom: '0.5rem' }}>
                <Flame size={14} />
                <span>HOT DISCOUNTS</span>
              </div>
              <h2 style={{ fontSize: '1.6rem', fontWeight: '800', color: '#ffffff' }}>Limited Time Flash Deals</h2>
            </div>
            <button
              onClick={() => onNavigateCatalog({ sort: 'discount' })}
              className="btn-accent"
              style={{ padding: '0.65rem 1.25rem', fontSize: '0.9rem' }}
            >
              <span>View All Deals</span>
              <ArrowRight size={16} />
            </button>
          </div>

          <div className="product-grid">
            {(dealProducts.length > 0 ? dealProducts : products.slice(0, 4)).map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                onViewDetails={onViewDetails}
                onQuickBuy={onQuickBuy}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
