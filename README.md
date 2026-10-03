# ShopEZ - Modern E-Commerce Application

ShopEZ is a full-stack e-commerce application built with **React (Frontend)**, **Express & Node.js (MVC REST API Backend)**, and **Mongoose / MongoDB (Database)**.

---

## 📁 Project Architecture

```
ShopEZ/
├── client/                     # React Frontend (Vite)
│   ├── src/
│   │   ├── components/         # Navbar, HeroBanner, ProductCard, CartDrawer, Modals
│   │   ├── context/            # AuthContext, CartContext, ToastContext
│   │   ├── pages/              # HomePage, CatalogPage, MyOrdersPage, AdminDashboardPage
│   │   ├── services/           # api.js (REST API Client + Fallback)
│   │   ├── data/               # initial catalog data
│   │   ├── App.jsx             # Main Application layout & routing
│   │   ├── main.jsx            # React root provider wrapper
│   │   └── index.css           # Modern design system & styling
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── server/                     # Express REST API (MVC Pattern)
│   ├── config/
│   │   └── db.js               # MongoDB Mongoose connection
│   ├── controllers/
│   │   ├── authController.js   # User registration & login (JWT + bcrypt)
│   │   ├── productController.js# Product catalog & filters
│   │   ├── cartController.js   # User cart management
│   │   ├── orderController.js  # Order placement & status tracking
│   │   └── adminController.js  # Banners, categories & store KPIs
│   ├── middleware/
│   │   ├── authMiddleware.js   # JWT authentication & admin authorization
│   │   └── errorMiddleware.js  # Global error handling
│   ├── models/
│   │   ├── User.js             # User model
│   │   ├── Product.js          # Product model
│   │   ├── Cart.js             # Cart model
│   │   ├── Order.js            # Order model
│   │   └── AdminConfig.js      # Banners and Categories
│   ├── routes/
│   │   ├── authRoutes.js       # /api/auth
│   │   ├── productRoutes.js    # /api/products
│   │   ├── cartRoutes.js       # /api/cart
│   │   ├── orderRoutes.js      # /api/orders
│   │   └── adminRoutes.js      # /api/admin
│   ├── seed.js                 # Database seeder
│   ├── index.js                # Server entry point
│   ├── package.json
│   └── .env
│
└── initial.md                  # Project requirements specification
```

---

## 🚀 How to Run the Application

### 1. Start the Backend Server
```bash
cd server
npm install
npm run seed      # (Optional) Populates MongoDB with sample catalog products & admin
npm run dev       # Starts Express API at http://localhost:5000
```

### 2. Start the Frontend Client
In a separate terminal:
```bash
cd client
npm install
npm run dev       # Starts React app at http://localhost:3000
```

---

## 🔑 Demo Credentials

| Role | Email | Password |
| :--- | :--- | :--- |
| **Admin / Seller** | `admin@shopez.com` | `adminpassword123` |
| **Customer / Shopper** | `alex@example.com` | `userpassword123` |

*(You can also use the 1-click quick-fill buttons in the Sign In modal!)*

---

## ✨ Key Features

1. **Comprehensive Product Catalog**:
   - Filter by **Category** (Clothing, Footwear, Accessories, Electronics), **Gender** (Men, Women, Kids, Unisex), price range, and minimum discount.
   - Search by title, keywords, and specifications.
   - Multi-image carousel gallery with thumbnail selector.

2. **Instant "Shop Now" & Cart Checkout**:
   - Direct purchase modal capturing delivery address, mobile, email, and payment methods (COD, Card, UPI).
   - Interactive slide-over cart drawer with quantity and size controls.

3. **My Orders & Tracking**:
   - Customer order history with live status indicators (`Placed`, `Processing`, `Shipped`, `Delivered`).
   - Estimated delivery calculation and receipt summaries.

4. **Seller & Admin Dashboard**:
   - Store KPIs: Total Revenue, Total Orders, Active Products, Registered Users.
   - Add, edit, and delete products with image URLs, sizes, and discount tags.
   - Order fulfillment controls for updating order statuses.
