import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import Product from './models/Product.js';
import AdminConfig from './models/AdminConfig.js';
import Cart from './models/Cart.js';
import Order from './models/Order.js';

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/shopez');
    console.log('MongoDB connected for seeding...');

    // Clear existing collections
    await User.deleteMany({});
    await Product.deleteMany({});
    await AdminConfig.deleteMany({});
    await Cart.deleteMany({});
    await Order.deleteMany({});

    console.log('Cleared existing data.');

    // 1. Seed Users (Admin and Customer)
    const adminUser = await User.create({
      username: 'ShopEZ Admin',
      email: 'admin@shopez.com',
      password: 'adminpassword123',
      usertype: 'admin',
    });

    const demoCustomer = await User.create({
      username: 'Alex Parker',
      email: 'alex@example.com',
      password: 'userpassword123',
      usertype: 'customer',
    });

    console.log(`Created Users: Admin (${adminUser.email}) and Customer (${demoCustomer.email})`);

    // 2. Seed Admin Config (Banners and Categories)
    await AdminConfig.create({
      banners: [
        {
          title: 'Elevate Your Style - Summer 2026',
          subtitle: 'Discover premium apparel, footwear & accessories tailored for your lifestyle.',
          image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&auto=format&fit=crop&q=80',
          link: '/products',
          discountTag: 'Up to 50% OFF',
          buttonText: 'Shop Catalog',
          active: true,
        },
        {
          title: 'Urban Streetwear & Athletic Kicks',
          subtitle: 'Step into unmatched comfort and bold aesthetics.',
          image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&auto=format&fit=crop&q=80',
          link: '/products?category=Footwear',
          discountTag: 'New Releases',
          buttonText: 'Explore Footwear',
          active: true,
        },
      ],
      categories: [
        {
          name: 'Clothing',
          slug: 'clothing',
          image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=500&auto=format&fit=crop&q=60',
          description: 'Premium everyday shirts, hoodies, jackets, & denim',
        },
        {
          name: 'Footwear',
          slug: 'footwear',
          image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=60',
          description: 'Performance sneakers, boots, and casual loafers',
        },
        {
          name: 'Accessories',
          slug: 'accessories',
          image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60',
          description: 'Luxury watches, minimalist wallets, and leather bags',
        },
        {
          name: 'Electronics',
          slug: 'electronics',
          image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60',
          description: 'Wireless noise-canceling headphones & tech essentials',
        },
      ],
    });

    // 3. Seed Products
    const products = [
      {
        title: 'Classic Vintage Denim Jacket',
        description: 'Crafted from 100% premium heavyweight denim with reinforced stitching and relaxed modern fit.',
        mainImg: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=800&auto=format&fit=crop&q=80',
        carousel: [
          'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=800&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1543076447-215ad9ba6923?w=800&auto=format&fit=crop&q=80',
        ],
        category: 'Clothing',
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        gender: 'Men',
        price: 89,
        discount: 20,
        rating: 4.8,
        reviewsCount: 142,
        stock: 35,
        featured: true,
      },
      {
        title: 'Air Pulse Performance Runners',
        description: 'Engineered breathable mesh upper with responsive dual-density cushioning for all-day sprint comfort.',
        mainImg: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80',
        carousel: [
          'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&auto=format&fit=crop&q=80',
        ],
        category: 'Footwear',
        sizes: ['7', '8', '9', '10', '11', '12'],
        gender: 'Unisex',
        price: 130,
        discount: 15,
        rating: 4.9,
        reviewsCount: 320,
        stock: 45,
        featured: true,
      },
      {
        title: 'Minimalist Matte Chronograph Watch',
        description: 'Sleek brushed stainless steel body with sapphire crystal dial and genuine Italian leather strap.',
        mainImg: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80',
        carousel: [
          'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800&auto=format&fit=crop&q=80',
        ],
        category: 'Accessories',
        sizes: ['One Size'],
        gender: 'Unisex',
        price: 195,
        discount: 25,
        rating: 4.7,
        reviewsCount: 88,
        stock: 20,
        featured: true,
      },
      {
        title: 'Oversized Pastel Cozy Knit Sweater',
        description: 'Ultra-soft organic wool blend sweater featuring ribbed cuffs, relaxed dropped shoulders, and thermal warmth.',
        mainImg: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&auto=format&fit=crop&q=80',
        carousel: [
          'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&auto=format&fit=crop&q=80',
        ],
        category: 'Clothing',
        sizes: ['XS', 'S', 'M', 'L'],
        gender: 'Women',
        price: 65,
        discount: 10,
        rating: 4.6,
        reviewsCount: 95,
        stock: 40,
        featured: false,
      },
      {
        title: 'Pro Sound Active Noise-Cancelling Headphones',
        description: 'High-fidelity acoustic drivers with 40-hour battery life and spatial immersive audio experience.',
        mainImg: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
        carousel: [
          'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&auto=format&fit=crop&q=80',
        ],
        category: 'Electronics',
        sizes: ['Standard'],
        gender: 'Unisex',
        price: 249,
        discount: 30,
        rating: 4.9,
        reviewsCount: 512,
        stock: 60,
        featured: true,
      },
      {
        title: 'Kids Fun Graphic Hoodie & Jogger Set',
        description: '100% breathable organic cotton two-piece outfit featuring colorful prints and elastic drawstring waistband.',
        mainImg: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=800&auto=format&fit=crop&q=80',
        carousel: [
          'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=800&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=800&auto=format&fit=crop&q=80',
        ],
        category: 'Clothing',
        sizes: ['4Y', '6Y', '8Y', '10Y', '12Y'],
        gender: 'Kids',
        price: 45,
        discount: 15,
        rating: 4.8,
        reviewsCount: 76,
        stock: 50,
        featured: false,
      },
      {
        title: 'Full-Grain Artisan Leather Backpack',
        description: 'Handcrafted water-resistant leather backpack featuring a 15-inch padded laptop sleeve and brass hardware.',
        mainImg: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=80',
        carousel: [
          'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=800&auto=format&fit=crop&q=80',
        ],
        category: 'Accessories',
        sizes: ['20L'],
        gender: 'Unisex',
        price: 160,
        discount: 18,
        rating: 4.7,
        reviewsCount: 110,
        stock: 25,
        featured: false,
      },
      {
        title: 'Women Breathable Studio Leggings & Crop Top',
        description: 'Seamless four-way stretch fabric with moisture-wicking technology designed for yoga, gym, and casual wear.',
        mainImg: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&auto=format&fit=crop&q=80',
        carousel: [
          'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&auto=format&fit=crop&q=80',
        ],
        category: 'Clothing',
        sizes: ['XS', 'S', 'M', 'L'],
        gender: 'Women',
        price: 58,
        discount: 12,
        rating: 4.9,
        reviewsCount: 204,
        stock: 70,
        featured: true,
      },
    ];

    await Product.insertMany(products);
    console.log(`Seeded ${products.length} products successfully!`);

    console.log('\n--- SEED SUMMARY ---');
    console.log('Admin Email: admin@shopez.com | Password: adminpassword123');
    console.log('Customer Email: alex@example.com | Password: userpassword123');
    console.log('--------------------\n');

    process.exit(0);
  } catch (err) {
    console.error('Error seeding data:', err);
    process.exit(1);
  }
};

seedData();
