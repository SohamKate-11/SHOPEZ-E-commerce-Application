import Order from '../models/Order.js';
import Cart from '../models/Cart.js';

// @desc   Create new order
// @route  POST /api/orders
export const createOrder = async (req, res, next) => {
  try {
    const {
      name,
      mobile,
      email,
      address,
      pincode,
      items,
      paymentMethod = 'COD',
      clearUserCart = true,
    } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'No order items specified' });
    }

    if (!name || !mobile || !address || !pincode) {
      return res.status(400).json({ message: 'Please provide full delivery and contact information' });
    }

    // Calculate total
    const totalAmount = items.reduce((acc, item) => {
      const finalPrice = item.discount > 0 ? item.price * (1 - item.discount / 100) : item.price;
      return acc + finalPrice * item.quantity;
    }, 0);

    const firstItem = items[0];

    const order = new Order({
      userId: req.user._id,
      name,
      mobile,
      email: email || req.user.email,
      address,
      pincode,
      items,
      // Map first item details for ER-diagram single-level schema matching
      title: firstItem.title,
      desc: firstItem.desc || firstItem.description,
      image: firstItem.image || firstItem.mainImg,
      size: firstItem.size,
      quantity: firstItem.quantity,
      price: firstItem.price,
      discount: firstItem.discount,
      totalAmount: Math.round(totalAmount),
      paymentMethod,
    });

    const savedOrder = await order.save();

    // Optionally clear user's cart after successful order
    if (clearUserCart) {
      await Cart.deleteMany({ userId: req.user._id });
    }

    res.status(201).json(savedOrder);
  } catch (error) {
    next(error);
  }
};

// @desc   Get logged in user orders
// @route  GET /api/orders/my-orders
export const getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    next(error);
  }
};

// @desc   Get all orders (Admin only)
// @route  GET /api/orders
export const getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find()
      .populate('userId', 'username email')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    next(error);
  }
};

// @desc   Get order by ID
// @route  GET /api/orders/:id
export const getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id).populate('userId', 'username email');
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Ensure only the owner or an admin can view the order
    if (order.userId._id.toString() !== req.user._id.toString() && req.user.usertype !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to view this order' });
    }

    res.json(order);
  } catch (error) {
    next(error);
  }
};

// @desc   Update order status (Admin only)
// @route  PUT /api/orders/:id/status
export const updateOrderStatus = async (req, res, next) => {
  try {
    const { status, deliveryDate } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (status) order.status = status;
    if (deliveryDate) order.deliveryDate = deliveryDate;

    const updated = await order.save();
    res.json(updated);
  } catch (error) {
    next(error);
  }
};
