var express = require('express');
var router = express.Router();
const { Op } = require('sequelize');
//check these again
const paginate = require('express-paginate');
router.use(paginate.middleware(10, 50));


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('categoryList');
});

// all products
router.get('/productList', function(req, res, next) {
  let page=parseInt(req.query.page)||1;
  let limit=10;
  res.render('productList',{page,limit});
});

router.get('/Clothing', function(req, res, next) {
  const page = parseInt(req.query.page) || 1;
  const limit =10;
  res.render('clothing',{page,limit});
});
router.get('/Electronics', function(req, res, next) {
  const page = parseInt(req.query.page) || 1;
  const limit =10;
  res.render('electronics',{page,limit});
});
router.get('/Food', function(req, res, next) {
  const page = parseInt(req.query.page) || 1;
  const limit =10;
  res.render('food',{page,limit});
});
router.get('/Pharmacy', function(req, res, next) {
  const page = parseInt(req.query.page) || 1;
  const limit =10;
  res.render('pharmacy',{page,limit});
});
router.get('/Optics', function(req, res, next) {
  const page = parseInt(req.query.page) || 1;
  const limit =10;
  res.render('optics',{page,limit});
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
    const page = req.query.page || 1;
    const limit =10;
    const offset = (page - 1) * limit;

    const products = await Product.findAndCountAll({
      limit,
      offset
    });

    const pageCount = Math.ceil(products.count / limit);
    const items = products.rows.map(row => row.dataValues);

    res.json({
      pageCount,
      items
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//clothing api
router.get('/api/clothing', async (req, res) => {
  try {
    const page = req.query.page || 1;
    const limit =10;
    const offset = (page - 1) * limit;

    const products = await Product.findAndCountAll({
      where: {
        cid: 1
      },
      limit,
      offset
    });

    const pageCount = Math.ceil(products.count / limit);
    const items = products.rows.map(row => row.dataValues);

    res.json({
      pageCount,
      items
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//electronics api
router.get('/api/electronics', async (req, res) => {
  try {
    const page = req.query.page || 1;
    const limit =10;
    const offset = (page - 1) * limit;

    const products = await Product.findAndCountAll({
      where: {
        cid: 2
      },
      limit,
      offset
    });

    const pageCount = Math.ceil(products.count / limit);
    const items = products.rows.map(row => row.dataValues);

    res.json({
      pageCount,
      items
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


//food api
router.get('/api/food', async (req, res) => {
  try {
    const page = req.query.page || 1;
    const limit =10;
    const offset = (page - 1) * limit;

    const products = await Product.findAndCountAll({
      where: {
        cid: 3
      },
      limit,
      offset
    });

    const pageCount = Math.ceil(products.count / limit);
    const items = products.rows.map(row => row.dataValues);

    res.json({
      pageCount,
      items
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//pharmacy api
router.get('/api/pharmacy', async (req, res) => {
  try {
    const page = req.query.page || 1;
    const limit =10;
    const offset = (page - 1) * limit;

    const products = await Product.findAndCountAll({
      where: {
        cid: 4
      },
      limit,
      offset
    });

    const pageCount = Math.ceil(products.count / limit);
    const items = products.rows.map(row => row.dataValues);

    res.json({
      pageCount,
      items
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


//optics api
router.get('/api/optics', async (req, res) => {
  try {
    const page = req.query.page || 1;
    const limit =10;
    const offset = (page - 1) * limit;

    const products = await Product.findAndCountAll({
      where: {
        cid: 5
      },
      limit,
      offset
    });

    const pageCount = Math.ceil(products.count / limit);
    const items = products.rows.map(row => row.dataValues);

    res.json({
      pageCount,
      items
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
module.exports = router;
