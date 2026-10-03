import React, { useState, useEffect } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, Tag, ShieldCheck, Truck, RefreshCw } from 'lucide-react';

export const HeroBanner = ({ onShopNow, onSelectCategory }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      tag: '🔥 SUMMER SALE 2026',
      title: 'Effortless Style, Premium Comfort',
      subtitle: 'Discover the latest in designer apparel, street kicks, and smart accessories at up to 50% OFF.',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&auto=format&fit=crop&q=80',
      category: 'Clothing',
      accentColor: '#4f46e5',
    },
    {
      id: 2,
      tag: '⚡ NEW ARRIVALS',
      title: 'Performance Footwear & Kicks',
      subtitle: 'Engineered for athletes, crafted for trendsetters. Step into state-of-the-art support.',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1200&auto=format&fit=crop&q=80',
      category: 'Footwear',
      accentColor: '#06b6d4',
    },
    {
      id: 3,
      tag: '✨ SMART TECH & AUDIO',
      title: 'Active Noise Cancelling & Audio',
      subtitle: 'Immerse yourself in pristine acoustics with our high-fidelity wireless collection.',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200&auto=format&fit=crop&q=80',
      category: 'Electronics',
      accentColor: '#f59e0b',
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const slide = slides[currentSlide];

  return (
    <div style={{ marginBottom: '2.5rem' }}>
      {/* Main Hero Slider */}
      <div
        style={{
          position: 'relative',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          minHeight: '440px',
          display: 'flex',
          alignItems: 'center',
          background: '#0f172a',
          boxShadow: 'var(--shadow-xl)',
        }}
      >
        {/* Background Image with Gradient Overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(${slide.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.55)',
            transition: 'background-image 0.5s ease-in-out',
          }}
        />

        {/* Dynamic Glow Gradient */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(90deg, rgba(15,23,42,0.92) 0%, rgba(15,23,42,0.65) 60%, rgba(15,23,42,0.2) 100%)',
          }}
        />

        {/* Content */}
        <div
          style={{
            position: 'relative',
            zIndex: 10,
            maxWidth: '620px',
            padding: '3rem 2.5rem',
            color: '#ffffff',
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              background: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(8px)',
              padding: '0.4rem 0.9rem',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.82rem',
              fontWeight: '700',
              marginBottom: '1rem',
              letterSpacing: '0.04em',
              border: '1px solid rgba(255,255,255,0.25)',
            }}
          >
            <Tag size={14} color="#fcd34d" />
            <span>{slide.tag}</span>
          </div>

          <h1
            style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              color: '#ffffff',
              fontWeight: '800',
              lineHeight: 1.15,
              marginBottom: '1rem',
              letterSpacing: '-0.02em',
            }}
          >
            {slide.title}
          </h1>

          <p
            style={{
              fontSize: '1.05rem',
              color: '#cbd5e1',
              marginBottom: '1.75rem',
              lineHeight: 1.6,
            }}
          >
            {slide.subtitle}
          </p>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <button
              onClick={() => onShopNow(slide.category)}
              className="btn-primary"
              style={{
                fontSize: '1rem',
                padding: '0.85rem 1.75rem',
                borderRadius: 'var(--radius-md)',
              }}
            >
              <span>Shop Now</span>
              <ArrowRight size={18} />
            </button>

            <button
              onClick={() => onSelectCategory(slide.category)}
              className="btn-secondary"
              style={{
                fontSize: '1rem',
                padding: '0.85rem 1.5rem',
                background: 'rgba(255, 255, 255, 0.12)',
                color: '#ffffff',
                borderColor: 'rgba(255, 255, 255, 0.25)',
                backdropFilter: 'blur(8px)',
              }}
            >
              Explore {slide.category}
            </button>
          </div>
        </div>

        {/* Carousel Slider Controls */}
        <button
          onClick={() => setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))}
          style={{
            position: 'absolute',
            left: '1rem',
            zIndex: 20,
            background: 'rgba(255, 255, 255, 0.2)',
            color: '#ffffff',
            backdropFilter: 'blur(6px)',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background 0.2s',
          }}
          aria-label="Previous Slide"
        >
          <ChevronLeft size={22} />
        </button>

        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
          style={{
            position: 'absolute',
            right: '1rem',
            zIndex: 20,
            background: 'rgba(255, 255, 255, 0.2)',
            color: '#ffffff',
            backdropFilter: 'blur(6px)',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background 0.2s',
          }}
          aria-label="Next Slide"
        >
          <ChevronRight size={22} />
        </button>

        {/* Slider Dots */}
        <div
          style={{
            position: 'absolute',
            bottom: '1.25rem',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: '0.5rem',
            zIndex: 20,
          }}
        >
          {slides.map((_, idx) => (
            <div
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              style={{
                width: currentSlide === idx ? '28px' : '8px',
                height: '8px',
                borderRadius: '4px',
                background: currentSlide === idx ? '#ffffff' : 'rgba(255,255,255,0.4)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
            />
          ))}
        </div>
      </div>

      {/* Feature Value Badges */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1rem',
          marginTop: '1.25rem',
        }}
      >
        <div
          style={{
            background: '#ffffff',
            padding: '1rem 1.25rem',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.85rem',
          }}
        >
          <div style={{ background: '#eef2ff', padding: '0.65rem', borderRadius: '10px', color: '#4f46e5' }}>
            <Truck size={22} />
          </div>
          <div>
            <div style={{ fontWeight: '700', fontSize: '0.92rem' }}>Free Express Delivery</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Orders above $50 qualify</div>
          </div>
        </div>

        <div
          style={{
            background: '#ffffff',
            padding: '1rem 1.25rem',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.85rem',
          }}
        >
          <div style={{ background: '#ecfdf5', padding: '0.65rem', borderRadius: '10px', color: '#10b981' }}>
            <ShieldCheck size={22} />
          </div>
          <div>
            <div style={{ fontWeight: '700', fontSize: '0.92rem' }}>100% Secure Checkout</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Encrypted payments & COD</div>
          </div>
        </div>

        <div
          style={{
            background: '#ffffff',
            padding: '1rem 1.25rem',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.85rem',
          }}
        >
          <div style={{ background: '#fffbeb', padding: '0.65rem', borderRadius: '10px', color: '#f59e0b' }}>
            <RefreshCw size={22} />
          </div>
          <div>
            <div style={{ fontWeight: '700', fontSize: '0.92rem' }}>Hassle-Free Returns</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>30 days instant return policy</div>
          </div>
        </div>
      </div>
    </div>
  );
};
