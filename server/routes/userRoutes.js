// routes/userRoutes.js
import express from 'express';
import bcrypt from 'bcrypt';
import { createUser, getUsers } from '../models/user.js'; // Import functions

const router = express.Router();

// Register a user
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10); // Hash password
    const user = await createUser(name, email, hashedPassword);  // Create user
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to register user' });
  }
});

// Get all users
router.get('/users', async (req, res) => {
  try {
    const users = await getUsers(); // Get all users
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

export default router;  // Export the router
