var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('categoryList');
});

// all products
router.get('/productList', function(req, res, next) {
  res.render('productList');
});

//api for getting category list
const { User,  sequelize } = require('../models/user');

router.get('/api/categoryList', async (req, res) => {
  try {
    await sequelize.sync();
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//api for getting all product list
const { Product,  prodSequelize } = require('../models/product');

router.get('/api/productList', async (req, res) => {
  try {
    await prodSequelize.sync();
    const products = await Product.findAll();
    res.json(products);
  } catch (err) {
    console.error('Error fetching all products:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
