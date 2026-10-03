import AdminConfig from '../models/AdminConfig.js';
import Order from '../models/Order.js';
import Product from '../models/Product.js';
import User from '../models/User.js';

// @desc   Get store configuration (Banners & Categories)
// @route  GET /api/admin/config
export const getAdminConfig = async (req, res, next) => {
  try {
    let config = await AdminConfig.findOne();
    if (!config) {
      config = await AdminConfig.create({
        banners: [
          {
            title: 'Modern Trends for Every Season',
            subtitle: 'Discover top quality apparel, accessories, and footwear with up to 50% off.',
            image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&auto=format&fit=crop&q=80',
            link: '/products',
            discountTag: 'Flat 40% OFF',
            buttonText: 'Explore Now',
            active: true,
          },
          {
            title: 'Premium Urban Collection',
            subtitle: 'Elevate your everyday wardrobe with our curated high-comfort styles.',
            image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&auto=format&fit=crop&q=80',
            link: '/products?category=Clothing',
            discountTag: 'New Season',
            buttonText: 'Shop Collection',
            active: true,
          },
        ],
        categories: [
          { name: 'Clothing', slug: 'clothing', image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=500&auto=format&fit=crop&q=60', description: 'Shirts, Jeans, Jackets, & Tops' },
          { name: 'Footwear', slug: 'footwear', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=60', description: 'Sneakers, Loafers, & Running Shoes' },
          { name: 'Accessories', slug: 'accessories', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60', description: 'Watches, Bags, Belts, & Sunglasses' },
          { name: 'Electronics', slug: 'electronics', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60', description: 'Headphones, Gadgets & Audio' },
        ],
      });
    }
    res.json(config);
  } catch (error) {
    next(error);
  }
};

// @desc   Update store configuration (Admin only)
// @route  PUT /api/admin/config
export const updateAdminConfig = async (req, res, next) => {
  try {
    const { banners, categories } = req.body;
    let config = await AdminConfig.findOne();

    if (!config) {
      config = new AdminConfig({ banners, categories });
    } else {
      if (banners) config.banners = banners;
      if (categories) config.categories = categories;
    }

    const saved = await config.save();
    res.json(saved);
  } catch (error) {
    next(error);
  }
};

// @desc   Get admin dashboard analytics
// @route  GET /api/admin/stats
export const getDashboardStats = async (req, res, next) => {
  try {
    const totalUsers = await User.countDocuments({ usertype: 'customer' });
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();

    const orders = await Order.find();
    const totalRevenue = orders
      .filter((o) => o.status !== 'Cancelled')
      .reduce((acc, order) => acc + (order.totalAmount || 0), 0);

    const pendingOrders = orders.filter((o) => o.status === 'Placed' || o.status === 'Processing').length;
    const deliveredOrders = orders.filter((o) => o.status === 'Delivered').length;

    // Recent 5 orders
    const recentOrders = await Order.find()
      .populate('userId', 'username email')
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      totalUsers,
      totalProducts,
      totalOrders,
      totalRevenue,
      pendingOrders,
      deliveredOrders,
      recentOrders,
    });
  } catch (error) {
    next(error);
  }
};
