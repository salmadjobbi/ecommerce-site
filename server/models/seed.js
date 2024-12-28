const sequelize = require('./db');
const Product = require('./models/Product');

// Seed products
const seedProducts = async () => {
  await sequelize.sync({ force: true }); // Drops tables if they exist and recreates them

  await Product.bulkCreate([
    { name: 'Product 1', description: 'Description 1', price: 100, image: '/images/product1.jpg' },
    { name: 'Product 2', description: 'Description 2', price: 200, image: '/images/product2.jpg' },
    { name: 'Product 3', description: 'Description 3', price: 300, image: '/images/product3.jpg' },
  ]);

  console.log('Products seeded!');
  process.exit();
};

seedProducts();
