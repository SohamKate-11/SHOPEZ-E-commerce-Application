import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { AuthModal } from './components/AuthModal';

import { HomePage } from './pages/HomePage';
import { CatalogPage } from './pages/CatalogPage';
import { MyOrdersPage } from './pages/MyOrdersPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';

import { initialProducts } from './data/mockProducts';
import { api } from './services/api';

export function App() {
  const [currentView, setCurrentView] = useState('home'); // 'home' | 'catalog' | 'orders' | 'admin'
  const [products, setProducts] = useState(initialProducts);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [checkoutItems, setCheckoutItems] = useState(null);
  const [placedOrder, setPlacedOrder] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Fetch live products if backend API is online
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const liveProducts = await api.getProducts();
        if (liveProducts && liveProducts.length > 0) {
          setProducts(liveProducts);
        }
      } catch (err) {
        // Keeps the initialProducts mock dataset
        console.log('Running with standalone catalog dataset.');
      }
    };

    loadProducts();
  }, []);

  // Handlers for Buy Now & Quick Actions
  const handleQuickBuy = (product, size = 'M', quantity = 1) => {
    const buyItem = {
      _id: product._id,
      productId: product._id,
      title: product.title,
      description: product.description,
      mainImg: product.mainImg,
      size,
      quantity,
      price: product.price,
      discount: product.discount || 0,
    };
    setCheckoutItems([buyItem]);
  };

  const handleProceedToCheckoutFromCart = (items) => {
    setCheckoutItems(items);
  };

  const handleOrderSuccess = (order) => {
    setCheckoutItems(null);
    setPlacedOrder(order);
  };

  // Admin Catalog Handlers
  const handleProductCreated = (newProd) => {
    setProducts((prev) => [newProd, ...prev]);
  };

  const handleProductUpdated = (updatedProd) => {
    setProducts((prev) =>
      prev.map((p) => (p._id === updatedProd._id ? updatedProd : p))
    );
  };

  const handleProductDeleted = (deletedId) => {
    setProducts((prev) => prev.filter((p) => p._id !== deletedId));
  };

  return (
    <div className="app-container">
      {/* Top Navbar */}
      <Navbar
        currentView={currentView}
        setCurrentView={setCurrentView}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        onOpenAuth={() => setIsAuthModalOpen(true)}
      />

      {/* Main View Area */}
      <div className="main-content">
        {currentView === 'home' && (
          <HomePage
            products={products}
            onViewDetails={(prod) => setSelectedProduct(prod)}
            onQuickBuy={(prod) => handleQuickBuy(prod, prod.sizes?.[0] || 'M', 1)}
            onNavigateCatalog={(filters) => {
              if (filters.category) setSelectedCategory(filters.category);
              setCurrentView('catalog');
            }}
            onSelectCategory={(cat) => {
              setSelectedCategory(cat);
              setCurrentView('catalog');
            }}
          />
        )}

        {currentView === 'catalog' && (
          <CatalogPage
            products={products}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onViewDetails={(prod) => setSelectedProduct(prod)}
            onQuickBuy={(prod) => handleQuickBuy(prod, prod.sizes?.[0] || 'M', 1)}
          />
        )}

        {currentView === 'orders' && (
          <MyOrdersPage onStartShopping={() => setCurrentView('catalog')} />
        )}

        {currentView === 'admin' && (
          <AdminDashboardPage
            products={products}
            onProductCreated={handleProductCreated}
            onProductUpdated={handleProductUpdated}
            onProductDeleted={handleProductDeleted}
          />
        )}
      </div>

      {/* Footer */}
      <Footer />

      {/* Overlays & Modals */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onDirectBuy={(prod, size, qty) => handleQuickBuy(prod, size, qty)}
        />
      )}

      <CartDrawer onProceedToCheckout={handleProceedToCheckoutFromCart} />

      {checkoutItems && (
        <CheckoutModal
          checkoutItems={checkoutItems}
          onClose={() => setCheckoutItems(null)}
          onOrderSuccess={handleOrderSuccess}
        />
      )}

      {placedOrder && (
        <OrderSuccessModal
          order={placedOrder}
          onClose={() => setPlacedOrder(null)}
          onViewOrders={() => setCurrentView('orders')}
        />
      )}

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </div>
  );
}
export default App;
