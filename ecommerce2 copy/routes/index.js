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
  let pageno=parseInt(req.query.page);
  let limitno=parseInt(req.query.limit);
  console.log(pageno+" "+limitno);
  res.render('productList',{pageno,limitno});
});

router.get('/Clothing', function(req, res, next) {
  res.render('clothing');
});
router.get('/Electronics', function(req, res, next) {
  res.render('electronics');
});
router.get('/Food', function(req, res, next) {
  res.render('food');
});
router.get('/Pharmacy', function(req, res, next) {
  res.render('pharmacy');
});
router.get('/Optics', function(req, res, next) {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
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

router.get('/api/productList/', async (req, res) => {
  let pageno=parseInt(req.query.page);
  let limitno=parseInt(req.query.limit);
  try {
    await prodSequelize.sync();
    let sid=10*pageno;
    const products = await Product.findAll({
      where: {
        id: {
          [Op.gt]: sid,
        }
      },
      limit: limitno,
    })
    res.json(products);
  } catch (err) {
    console.error('Error fetching all products:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/api/clothing', async (req, res) => {
  try {
    await prodSequelize.sync();
    let sid=1;
    const products = await Product.findAll({
      where: {
        id: {
          [Op.gt]: sid,
        },
        cid:1
      },
      limit: 100,
    })
    res.json(products);
  } catch (err) {
    console.error('Error fetching all products:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//electronics
router.get('/api/electronics', async (req, res) => {
  try {
    await prodSequelize.sync();
    let sid=10*2;
    const products = await Product.findAll({
      where: {
        id: {
          [Op.gt]: sid,
        },
        cid:2
      },
      limit: 10,
    })
    res.json(products);
  } catch (err) {
    console.error('Error fetching all products:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//food
router.get('/api/food', async (req, res) => {
  try {
    await prodSequelize.sync();
    let sid=10*2;
    const products = await Product.findAll({
      where: {
        id: {
          [Op.gt]: sid,
        },
        cid:3
      },
      limit: 10,
    })
    res.json(products);
  } catch (err) {
    console.error('Error fetching all products:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//pharmacy
router.get('/api/pharmacy', async (req, res) => {
  try {
    await prodSequelize.sync();
    let sid=10*2;
    const products = await Product.findAll({
      where: {
        id: {
          [Op.gt]: sid,
        },
        cid:4
      },
      limit: 10,
    })
    res.json(products);
  } catch (err) {
    console.error('Error fetching all products:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//optics
// router.get('/api/optics', async (req, res) => {
//   try {
//     await prodSequelize.sync();
//     let sid=10*2;
//     const products = await Product.findAll({
//       where: {
//         id: {
//           [Op.gt]: sid,
//         },
//         cid:5
//       },
//       limit: 10,
//     })
//     res.json(products);
//   } catch (err) {
//     console.error('Error fetching all products:', err);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

router.get('/api/optics', async (req, res) => {
  try {
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    console.log(page+" "+limit);
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
