import React, { useState, useMemo } from 'react';
import { ProductCard } from '../components/ProductCard';
import { Filter, SlidersHorizontal, ArrowUpDown, X, Search } from 'lucide-react';

export const CatalogPage = ({
  products,
  selectedCategory,
  setSelectedCategory,
  searchQuery,
  setSearchQuery,
  onViewDetails,
  onQuickBuy,
}) => {
  const [selectedGender, setSelectedGender] = useState('All');
  const [maxPrice, setMaxPrice] = useState(300);
  const [minDiscount, setMinDiscount] = useState(0);
  const [sortBy, setSortBy] = useState('featured');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const categories = ['All', 'Clothing', 'Footwear', 'Accessories', 'Electronics'];
  const genders = ['All', 'Men', 'Women', 'Kids', 'Unisex'];

  // Client-side filtering & sorting
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Category filter
        if (selectedCategory && selectedCategory !== 'All') {
          if (p.category.toLowerCase() !== selectedCategory.toLowerCase()) return false;
        }

        // Gender filter
        if (selectedGender !== 'All') {
          if (p.gender && p.gender !== selectedGender && p.gender !== 'Unisex') return false;
        }

        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = p.title.toLowerCase().includes(q);
          const matchDesc = p.description.toLowerCase().includes(q);
          const matchCat = p.category.toLowerCase().includes(q);
          if (!matchTitle && !matchDesc && !matchCat) return false;
        }

        // Price filter
        const finalPrice = p.discount > 0 ? p.price * (1 - p.discount / 100) : p.price;
        if (finalPrice > maxPrice) return false;

        // Discount filter
        if ((p.discount || 0) < minDiscount) return false;

        return true;
      })
      .sort((a, b) => {
        const priceA = a.discount > 0 ? a.price * (1 - a.discount / 100) : a.price;
        const priceB = b.discount > 0 ? b.price * (1 - b.discount / 100) : b.price;

        if (sortBy === 'price-low') return priceA - priceB;
        if (sortBy === 'price-high') return priceB - priceA;
        if (sortBy === 'discount') return (b.discount || 0) - (a.discount || 0);
        if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
        return 0;
      });
  }, [products, selectedCategory, selectedGender, searchQuery, maxPrice, minDiscount, sortBy]);

  const clearAllFilters = () => {
    setSelectedCategory('All');
    setSelectedGender('All');
    setMaxPrice(300);
    setMinDiscount(0);
    setSearchQuery('');
    setSortBy('featured');
  };

  return (
    <div>
      {/* Header Bar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1.5rem',
          flexWrap: 'wrap',
          gap: '1rem',
          background: '#ffffff',
          padding: '1.25rem 1.5rem',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-color)',
        }}
      >
        <div>
          <h1 style={{ fontSize: '1.4rem', fontWeight: '800' }}>
            {selectedCategory === 'All' ? 'All Products' : selectedCategory}
          </h1>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Showing <strong>{filteredProducts.length}</strong> available items
            {searchQuery && ` for "${searchQuery}"`}
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {/* Sort Dropdown */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <ArrowUpDown size={16} color="var(--text-muted)" />
            <select
              className="form-input"
              style={{ padding: '0.45rem 0.75rem', fontSize: '0.85rem' }}
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="featured">Featured / Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="discount">Highest Discount</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>

          <button
            onClick={clearAllFilters}
            className="btn-secondary"
            style={{ padding: '0.45rem 0.75rem', fontSize: '0.85rem' }}
          >
            Reset Filters
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '1.5rem', alignItems: 'start' }}>
        {/* Filter Sidebar */}
        <aside
          style={{
            background: '#ffffff',
            padding: '1.5rem',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-color)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '800', fontSize: '1.05rem' }}>
            <SlidersHorizontal size={18} color="var(--primary)" />
            <span>Filters</span>
          </div>

          {/* Categories */}
          <div>
            <div style={{ fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.6rem', color: 'var(--text-main)' }}>
              Category
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    textAlign: 'left',
                    padding: '0.45rem 0.75rem',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.88rem',
                    fontWeight: selectedCategory === cat ? '700' : '500',
                    background: selectedCategory === cat ? 'var(--primary-light)' : 'transparent',
                    color: selectedCategory === cat ? 'var(--primary)' : 'var(--text-main)',
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Gender */}
          <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.25rem' }}>
            <div style={{ fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.6rem', color: 'var(--text-main)' }}>
              Department / Gender
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
              {genders.map((g) => (
                <button
                  key={g}
                  onClick={() => setSelectedGender(g)}
                  style={{
                    padding: '0.35rem 0.75rem',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.82rem',
                    fontWeight: selectedGender === g ? '700' : '500',
                    border: selectedGender === g ? '1.5px solid var(--primary)' : '1px solid var(--border-color)',
                    background: selectedGender === g ? 'var(--primary-light)' : '#ffffff',
                    color: selectedGender === g ? 'var(--primary)' : 'var(--text-main)',
                  }}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          {/* Price Slider */}
          <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.5rem' }}>
              <span>Max Price</span>
              <span style={{ color: 'var(--primary)' }}>${maxPrice}</span>
            </div>
            <input
              type="range"
              min="20"
              max="300"
              step="10"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--primary)' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-subtle)' }}>
              <span>$20</span>
              <span>$300</span>
            </div>
          </div>

          {/* Minimum Discount */}
          <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.25rem' }}>
            <div style={{ fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.6rem' }}>
              Minimum Discount
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              {[0, 10, 20, 30].map((disc) => (
                <label key={disc} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', cursor: 'pointer' }}>
                  <input
                    type="radio"
                    name="minDiscount"
                    checked={minDiscount === disc}
                    onChange={() => setMinDiscount(disc)}
                    style={{ accentColor: 'var(--primary)' }}
                  />
                  <span>{disc === 0 ? 'Any Discount' : `${disc}% or more`}</span>
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* Product Grid / Results */}
        <main>
          {filteredProducts.length === 0 ? (
            <div
              style={{
                background: '#ffffff',
                borderRadius: 'var(--radius-lg)',
                padding: '3.5rem 2rem',
                textAlign: 'center',
                border: '1px solid var(--border-color)',
              }}
            >
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  background: '#f1f5f9',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1rem',
                  color: 'var(--text-subtle)',
                }}
              >
                <Search size={32} />
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '0.4rem' }}>
                No Products Match Your Filters
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                Try adjusting your search query, increasing max price, or resetting filters.
              </p>
              <button onClick={clearAllFilters} className="btn-primary" style={{ fontSize: '0.9rem' }}>
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="product-grid">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  onViewDetails={onViewDetails}
                  onQuickBuy={onQuickBuy}
                />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
