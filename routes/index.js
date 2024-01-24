var express = require('express');
var router = express.Router();
const { Op } = require('sequelize');
//check these again
const paginate = require('express-paginate');
const { Product,  prodSequelize } = require('../models/product');
router.use(paginate.middleware(10, 50));


/* GET home page. */
router.get('/', function(req, res) {
  res.render('categoryList');
});

// // all products
// router.get('/productList', async(req, res, next) =>{
//   let page=parseInt(req.query.page)||1;
//   let limit=10;
//   let brands = await Product.getDistinctBrands();
//   let productnames = await Product.getDistinctProductNames();
//   res.render('productList',{page,limit,brands,productnames});
// });

router.get('/productList', function(req, res, next){
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
//for search in solr
async function brandnProdGet(){
  brands = await Product.getDistinctBrands();
  productnames = await Product.getDistinctProductNames();
  notFetched = false;
}

let brands;
let productnames;
let notFetched = true;

if(notFetched){
  brandnProdGet();
}

let pricelessThanKeywords = ["below", "less","under"];
let priceGreaterThanKeywords = ["above", "greater"];
const BASE_URL = "http://localhost:3001/solr/product";
router.get('/search', async (req, res) => {
  let query = req.query.q;
  console.log(query);
  //to check whether the there is under or less keyword in query
  let isBelow = pricelessThanKeywords.some(keyword => {
      console.log( query.toLowerCase().includes(keyword) )
      return query.toLowerCase().includes(keyword)
  });
  let isAbove = priceGreaterThanKeywords.some(keyword => query.toLowerCase().includes(keyword));

  console.log("isBelow:", isBelow); 
  console.log("isAbove:", isAbove); 

  let brandsQuery = query.split(" ");
  let productsQuery = query.split(" ");
  let priceQuery = query.split(" ");
  //to get numbers only from the query
  let numbersOnly = priceQuery
    .filter(value => !isNaN(value)) 
    .map(value => parseFloat(value)); 

  console.log("numbers")
  console.log(numbersOnly); 
  console.log(brands+"\nProducts:"+productnames);

  //this will contain the words from the query if matches the db brand
  let brandValues = brandsQuery.filter(query => brands.some(brandObj => brandObj.toLowerCase().includes((query.toLowerCase()))));
  
  //similarly but for product names...
  let productValues;
      productValues = productsQuery.filter(queryItem =>
          queryItem!== 'under' && 
          productnames.some(prdObj =>
             prdObj.toLowerCase().includes(queryItem.toLowerCase())
          )
          );
 
  
  console.log("brands")
  console.log(brandValues);
  console.log("products")
  console.log(productValues);

  //building the url
  try{
      let solrUrl = `${BASE_URL}/select?`;
      //brand query
      if(brandValues.length > 0){
          brandValues.forEach((brandValue,i) => {
              if(i>0){
                  solrUrl += `%20OR%20`;
                  solrUrl += `brand:*${encodeURIComponent(brandValue.slice(1))}*`;
              }
              else{
              if(brandValue.length > 1)
                  solrUrl += `fq=brand:*${encodeURIComponent(brandValue.slice(1))}*`;
              else
                  solrUrl += `fq=brand:${encodeURIComponent(brandValue)}`;
              }
          })
      }
      if(brandValues.length > 0){
          solrUrl += `&`
      }
      //products query
      if(productValues.length > 0){
          productValues.forEach((productValue,i) => {
              if(i>0){
                  solrUrl += `%20OR%20`;
                  solrUrl += `name:*${encodeURIComponent(productValue.slice(1))}*`;
              }else{
              if(productValue.length>1)
                  solrUrl += `fq=name:*${encodeURIComponent(productValue.slice(1))}*`;
              else    
              solrUrl += `fq=name:${encodeURIComponent(productValue)}`
              }
          })
      }
      //Price query
      if(isBelow){
          solrUrl += `&fq=`;
          let Qstr = `mrp:[* TO ${numbersOnly[0]}]`
          Qstr = (encodeURIComponent(Qstr))
          solrUrl += Qstr;
      }
      if(isAbove){
          solrUrl += `&fq=`;
          let Qstr = `mrp:[${numbersOnly[0]} TO *]`
          Qstr = (encodeURIComponent(Qstr))
          solrUrl += Qstr;
      }
      //Default query
      if(productValues.length>0 || brandValues.length>0) {
          solrUrl += `&q=*%3A*`;
      }
      solrUrl += `&indent=true&wt=json`
      console.log(solrUrl)
     
      //Data fetching
      const response = await fetch(solrUrl);
      if (response.ok) {
          let jsonResponse = await response.json();
          jsonResponse = jsonResponse.response.docs;
          console.log(jsonResponse);
          res.json(jsonResponse);
      } else {
          console.error(`Error: ${response.status} - ${response.statusText}`);
          res.status(response.status).send('Error fetching data from Solr');
      }
  }catch(err){
      console.log(err);
  }
  
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
