//seed
const mongoose = require('mongoose');
const Product = require('../models/Product');
const products = require('./products.json');

mongoose.connect('mongodb://localhost:27017/my-ecom-auth')
  .then(async () => {
    console.log('Connected to DB');
    await Product.deleteMany(); // optional: wipe old data
    await Product.insertMany(products);
    console.log('Products seeded successfully');
    mongoose.disconnect();
  })
  .catch(err => console.error('Seed error:', err));
 