import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      required: [true, 'Customer name is required'],
    },
    mobile: {
      type: String,
      required: [true, 'Mobile number is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
    },
    address: {
      type: String,
      required: [true, 'Delivery address is required'],
    },
    pincode: {
      type: String,
      required: [true, 'Pincode is required'],
    },
    items: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        title: { type: String, required: true },
        desc: { type: String, default: '' },
        image: { type: String, required: true },
        size: { type: String, default: 'M' },
        quantity: { type: Number, required: true, default: 1 },
        price: { type: Number, required: true },
        discount: { type: Number, default: 0 },
      },
    ],
    // ER diagram field mappings for single-item or summary references
    title: { type: String },
    desc: { type: String },
    image: { type: String },
    size: { type: String },
    quantity: { type: Number },
    price: { type: Number },
    discount: { type: Number },

    totalAmount: {
      type: Number,
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ['COD', 'Card', 'UPI', 'NetBanking'],
      default: 'COD',
    },
    orderDate: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ['Placed', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
      default: 'Placed',
    },
    deliveryDate: {
      type: Date,
    },
  },
  { timestamps: true }
);

// Auto compute estimated delivery date if not set (3 to 5 days after orderDate)
orderSchema.pre('save', function (next) {
  if (!this.deliveryDate) {
    const est = new Date(this.orderDate || Date.now());
    est.setDate(est.getDate() + 4);
    this.deliveryDate = est;
  }
  next();
});

const Order = mongoose.model('Order', orderSchema);
export default Order;
