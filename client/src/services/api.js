// API client with token injection & fallback support

const BASE_URL = '/api';

const defaultHeaders = () => {
  const token = localStorage.getItem('shopez_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

export const api = {
  // Auth
  login: async (email, password) => {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Login failed');
    return data;
  },

  register: async (username, email, password, usertype = 'customer') => {
    const res = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password, usertype }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Registration failed');
    return data;
  },

  getMe: async () => {
    const res = await fetch(`${BASE_URL}/auth/me`, {
      headers: defaultHeaders(),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to fetch user');
    return data;
  },

  // Products
  getProducts: async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${BASE_URL}/products?${query}`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to fetch products');
    return data;
  },

  getProductById: async (id) => {
    const res = await fetch(`${BASE_URL}/products/${id}`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to fetch product');
    return data;
  },

  createProduct: async (productData) => {
    const res = await fetch(`${BASE_URL}/products`, {
      method: 'POST',
      headers: defaultHeaders(),
      body: JSON.stringify(productData),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to create product');
    return data;
  },

  updateProduct: async (id, productData) => {
    const res = await fetch(`${BASE_URL}/products/${id}`, {
      method: 'PUT',
      headers: defaultHeaders(),
      body: JSON.stringify(productData),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to update product');
    return data;
  },

  deleteProduct: async (id) => {
    const res = await fetch(`${BASE_URL}/products/${id}`, {
      method: 'DELETE',
      headers: defaultHeaders(),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to delete product');
    return data;
  },

  // Cart
  getCart: async () => {
    const res = await fetch(`${BASE_URL}/cart`, {
      headers: defaultHeaders(),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to fetch cart');
    return data;
  },

  addToCart: async ({ productId, size, quantity }) => {
    const res = await fetch(`${BASE_URL}/cart`, {
      method: 'POST',
      headers: defaultHeaders(),
      body: JSON.stringify({ productId, size, quantity }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to add item to cart');
    return data;
  },

  updateCartItem: async (id, { size, quantity }) => {
    const res = await fetch(`${BASE_URL}/cart/${id}`, {
      method: 'PUT',
      headers: defaultHeaders(),
      body: JSON.stringify({ size, quantity }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to update cart');
    return data;
  },

  removeFromCart: async (id) => {
    const res = await fetch(`${BASE_URL}/cart/${id}`, {
      method: 'DELETE',
      headers: defaultHeaders(),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to delete item from cart');
    return data;
  },

  clearCart: async () => {
    const res = await fetch(`${BASE_URL}/cart`, {
      method: 'DELETE',
      headers: defaultHeaders(),
    });
    return await res.json();
  },

  // Orders
  createOrder: async (orderPayload) => {
    const res = await fetch(`${BASE_URL}/orders`, {
      method: 'POST',
      headers: defaultHeaders(),
      body: JSON.stringify(orderPayload),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Order placement failed');
    return data;
  },

  getMyOrders: async () => {
    const res = await fetch(`${BASE_URL}/orders/my-orders`, {
      headers: defaultHeaders(),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to fetch orders');
    return data;
  },

  getAllOrders: async () => {
    const res = await fetch(`${BASE_URL}/orders`, {
      headers: defaultHeaders(),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to fetch all orders');
    return data;
  },

  updateOrderStatus: async (id, status, deliveryDate) => {
    const res = await fetch(`${BASE_URL}/orders/${id}/status`, {
      method: 'PUT',
      headers: defaultHeaders(),
      body: JSON.stringify({ status, deliveryDate }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to update order status');
    return data;
  },

  // Admin Config & Analytics
  getAdminConfig: async () => {
    const res = await fetch(`${BASE_URL}/admin/config`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to load configuration');
    return data;
  },

  getAdminStats: async () => {
    const res = await fetch(`${BASE_URL}/admin/stats`, {
      headers: defaultHeaders(),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to load admin stats');
    return data;
  },
};
