import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { api } from '../services/api';
import { useAuth } from './AuthContext';
import { useToast } from './ToastContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const { addToast } = useToast();
  const [items, setItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Load cart from backend when user is logged in, or from localStorage for guest
  const loadCart = async () => {
    if (user) {
      try {
        setLoading(true);
        const data = await api.getCart();
        setItems(data);
      } catch (err) {
        // Fallback to local
        const local = localStorage.getItem('shopez_cart');
        if (local) setItems(JSON.parse(local));
      } finally {
        setLoading(false);
      }
    } else {
      const local = localStorage.getItem('shopez_cart');
      if (local) setItems(JSON.parse(local));
      else setItems([]);
    }
  };

  useEffect(() => {
    loadCart();
  }, [user]);

  // Sync to localStorage as backup
  useEffect(() => {
    if (!user) {
      localStorage.setItem('shopez_cart', JSON.stringify(items));
    }
  }, [items, user]);

  const addToCart = async (product, size = 'M', quantity = 1) => {
    if (user) {
      try {
        await api.addToCart({ productId: product._id, size, quantity });
        await loadCart();
        addToast(`Added "${product.title}" to cart!`, 'success');
        setIsCartOpen(true);
        return;
      } catch (err) {
        // Continue with local state if offline
      }
    }

    // Local cart fallback
    setItems((prev) => {
      const existingIndex = prev.findIndex(
        (i) => (i.productId === product._id || i._id === product._id) && i.size === size
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        const newItem = {
          _id: 'cart_' + Date.now(),
          productId: product._id,
          title: product.title,
          description: product.description,
          mainImg: product.mainImg,
          price: product.price,
          discount: product.discount || 0,
          size,
          quantity,
        };
        return [...prev, newItem];
      }
    });

    addToast(`Added "${product.title}" to cart!`, 'success');
    setIsCartOpen(true);
  };

  const updateQuantity = async (itemId, newQty) => {
    if (newQty <= 0) {
      return removeFromCart(itemId);
    }

    if (user && !itemId.startsWith('cart_')) {
      try {
        await api.updateCartItem(itemId, { quantity: newQty });
        await loadCart();
        return;
      } catch (err) {
        // fallback
      }
    }

    setItems((prev) =>
      prev.map((item) => (item._id === itemId ? { ...item, quantity: newQty } : item))
    );
  };

  const removeFromCart = async (itemId) => {
    if (user && !itemId.startsWith('cart_')) {
      try {
        await api.removeFromCart(itemId);
        await loadCart();
        addToast('Item removed from cart', 'info');
        return;
      } catch (err) {
        // fallback
      }
    }

    setItems((prev) => prev.filter((item) => item._id !== itemId));
    addToast('Item removed from cart', 'info');
  };

  const clearCart = async () => {
    if (user) {
      try {
        await api.clearCart();
      } catch (err) {}
    }
    setItems([]);
    localStorage.removeItem('shopez_cart');
  };

  // Calculations
  const { totalItems, originalSubtotal, discountSavings, finalTotal } = useMemo(() => {
    let count = 0;
    let original = 0;
    let savings = 0;

    items.forEach((item) => {
      count += item.quantity;
      const basePrice = (item.price || 0) * item.quantity;
      original += basePrice;
      if (item.discount > 0) {
        savings += (basePrice * item.discount) / 100;
      }
    });

    return {
      totalItems: count,
      originalSubtotal: Math.round(original),
      discountSavings: Math.round(savings),
      finalTotal: Math.round(original - savings),
    };
  }, [items]);

  return (
    <CartContext.Provider
      value={{
        items,
        loading,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        totalItems,
        originalSubtotal,
        discountSavings,
        finalTotal,
        refreshCart: loadCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
