import mongoose from 'mongoose';

const adminConfigSchema = new mongoose.Schema(
  {
    banners: [
      {
        title: { type: String, required: true },
        subtitle: { type: String, default: '' },
        image: { type: String, required: true },
        link: { type: String, default: '/products' },
        discountTag: { type: String, default: '' },
        buttonText: { type: String, default: 'Shop Now' },
        active: { type: Boolean, default: true },
      },
    ],
    categories: [
      {
        name: { type: String, required: true, unique: true },
        slug: { type: String, required: true },
        image: { type: String, default: '' },
        description: { type: String, default: '' },
      },
    ],
  },
  { timestamps: true }
);

const AdminConfig = mongoose.model('AdminConfig', adminConfigSchema);
export default AdminConfig;
