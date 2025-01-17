import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { createUser } from './db.js';

const port = process.env.PORT || 2222;

const app = express(); // Create an express app instance

// Properly define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import your DB functions and routes
import userRoutes from './routes/userRoutes.js';
import cartRoutes from './routes/cartRoutes.js';

dotenv.config();

// Middleware to parse JSON and urlencoded request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, '../frontend')));
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Route for main index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html')); // Ensure path is correct
});

// Route for cart.html
app.get('/cart', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/cart.html')); // Corrected cart path
});

// Route for cart-data
app.get('/cart-data', (req, res) => {
  res.json({ cart: [] }); // Replace with actual cart data
});

// Example user routes
app.use('/api', userRoutes);
app.use('/api/cart', cartRoutes);

// Handle errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
app.post('/api/checkout', async (req, res) => {
  const { name, email, phone, address } = req.body;

  // Validate the fields
  if (!name || !email || !phone || !address) {
    return res.status(400).json({ error: 'Tous les champs sont obligatoires.' });
  }

  try {
    // Create the user and store in the database
    const newUser = await createUser(name, email, phone, address); // Ensure the createUser function is correct

    // Respond with a success message
    return res.status(201).json({
      message: 'Commande réussie !',
      user: newUser,
    });

  } catch (error) {
    console.error('Error during checkout:', error); // Log the error for debugging
    return res.status(500).json({ error: 'Erreur lors de la commande' });
  }
});


app.use(cors());
// Start the server
app.listen(2222, '0.0.0.0', () => {
  console.log('Server running at http://0.0.0.0:2222');
});
