import Cart from '../models/Cart.js';
import Product from '../models/Product.js';

// @desc   Get user cart items
// @route  GET /api/cart
export const getCart = async (req, res, next) => {
  try {
    const items = await Cart.find({ userId: req.user._id }).populate('productId');
    res.json(items);
  } catch (error) {
    next(error);
  }
};

// @desc   Add item to cart
// @route  POST /api/cart
export const addToCart = async (req, res, next) => {
  try {
    const { productId, size = 'M', quantity = 1 } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check if product with same size is already in cart for this user
    let existingItem = await Cart.findOne({
      userId: req.user._id,
      productId: product._id,
      size: size,
    });

    if (existingItem) {
      existingItem.quantity += Number(quantity);
      const updatedItem = await existingItem.save();
      return res.json(updatedItem);
    }

    const cartItem = new Cart({
      userId: req.user._id,
      productId: product._id,
      title: product.title,
      description: product.description,
      mainImg: product.mainImg,
      size: size,
      quantity: Number(quantity),
      price: product.price,
      discount: product.discount,
    });

    const savedItem = await cartItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    next(error);
  }
};

// @desc   Update cart item quantity/size
// @route  PUT /api/cart/:id
export const updateCartItem = async (req, res, next) => {
  try {
    const { quantity, size } = req.body;
    const cartItem = await Cart.findOne({ _id: req.params.id, userId: req.user._id });

    if (!cartItem) {
      return res.status(404).json({ message: 'Cart item not found' });
    }

    if (quantity !== undefined) {
      if (quantity <= 0) {
        await Cart.deleteOne({ _id: cartItem._id });
        return res.json({ message: 'Item removed from cart' });
      }
      cartItem.quantity = Number(quantity);
    }

    if (size !== undefined) {
      cartItem.size = size;
    }

    const updated = await cartItem.save();
    res.json(updated);
  } catch (error) {
    next(error);
  }
};

// @desc   Remove an item from cart
// @route  DELETE /api/cart/:id
export const removeFromCart = async (req, res, next) => {
  try {
    const cartItem = await Cart.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
    if (!cartItem) {
      return res.status(404).json({ message: 'Cart item not found' });
    }
    res.json({ message: 'Item removed from cart' });
  } catch (error) {
    next(error);
  }
};

// @desc   Clear entire user cart
// @route  DELETE /api/cart
export const clearCart = async (req, res, next) => {
  try {
    await Cart.deleteMany({ userId: req.user._id });
    res.json({ message: 'Cart cleared successfully' });
  } catch (error) {
    next(error);
  }
};
