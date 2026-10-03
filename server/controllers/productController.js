import Product from '../models/Product.js';

// @desc   Fetch all products with filtering & search
// @route  GET /api/products
export const getProducts = async (req, res, next) => {
  try {
    const { category, gender, search, sort, minPrice, maxPrice } = req.query;
    let query = {};

    if (category && category !== 'All') {
      query.category = { $regex: new RegExp(`^${category}$`, 'i') };
    }

    if (gender && gender !== 'All') {
      query.gender = { $regex: new RegExp(`^${gender}$`, 'i') };
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } },
      ];
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    let productQuery = Product.find(query);

    // Sorting
    if (sort === 'price-low') {
      productQuery = productQuery.sort({ price: 1 });
    } else if (sort === 'price-high') {
      productQuery = productQuery.sort({ price: -1 });
    } else if (sort === 'discount') {
      productQuery = productQuery.sort({ discount: -1 });
    } else if (sort === 'rating') {
      productQuery = productQuery.sort({ rating: -1 });
    } else {
      productQuery = productQuery.sort({ createdAt: -1 });
    }

    const products = await productQuery;
    res.json(products);
  } catch (error) {
    next(error);
  }
};

// @desc   Fetch single product by ID
// @route  GET /api/products/:id
export const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    next(error);
  }
};

// @desc   Create a product (Admin only)
// @route  POST /api/products
export const createProduct = async (req, res, next) => {
  try {
    const {
      title,
      description,
      mainImg,
      carousel,
      category,
      sizes,
      gender,
      price,
      discount,
      stock,
      featured,
    } = req.body;

    const product = new Product({
      title,
      description,
      mainImg,
      carousel: carousel || [mainImg],
      category,
      sizes: sizes || ['S', 'M', 'L', 'XL'],
      gender: gender || 'Unisex',
      price: Number(price),
      discount: Number(discount) || 0,
      stock: Number(stock) || 50,
      featured: Boolean(featured),
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    next(error);
  }
};

// @desc   Update a product (Admin only)
// @route  PUT /api/products/:id
export const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      product.title = req.body.title ?? product.title;
      product.description = req.body.description ?? product.description;
      product.mainImg = req.body.mainImg ?? product.mainImg;
      product.carousel = req.body.carousel ?? product.carousel;
      product.category = req.body.category ?? product.category;
      product.sizes = req.body.sizes ?? product.sizes;
      product.gender = req.body.gender ?? product.gender;
      product.price = req.body.price !== undefined ? Number(req.body.price) : product.price;
      product.discount = req.body.discount !== undefined ? Number(req.body.discount) : product.discount;
      product.stock = req.body.stock !== undefined ? Number(req.body.stock) : product.stock;
      product.featured = req.body.featured !== undefined ? Boolean(req.body.featured) : product.featured;

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    next(error);
  }
};

// @desc   Delete a product (Admin only)
// @route  DELETE /api/products/:id
export const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      await Product.deleteOne({ _id: product._id });
      res.json({ message: 'Product removed successfully' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    next(error);
  }
};

// @desc   Get unique categories list
// @route  GET /api/products/categories/all
export const getProductCategories = async (req, res, next) => {
  try {
    const categories = await Product.distinct('category');
    res.json(categories);
  } catch (error) {
    next(error);
  }
};
