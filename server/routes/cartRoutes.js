// cartRoutes.js
import express from 'express';

const router = express.Router();

// Define your routes here
router.get('/', (req, res) => {
  res.send('Cart Route');
});

export default router; // Export the router as default
