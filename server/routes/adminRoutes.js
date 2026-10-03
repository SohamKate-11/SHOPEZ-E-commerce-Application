import express from 'express';
import {
  getAdminConfig,
  updateAdminConfig,
  getDashboardStats,
} from '../controllers/adminController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

// Publicly read configuration (Banners & Categories for storefront)
router.get('/config', getAdminConfig);

// Protected Admin management routes
router.put('/config', protect, adminOnly, updateAdminConfig);
router.get('/stats', protect, adminOnly, getDashboardStats);

export default router;
