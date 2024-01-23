const { Sequelize, DataTypes, Model } = require('sequelize');

const database = 'ecommerce';
const username = 'root';
const password = '';
const prodSequelize = new Sequelize(database, username, password, {
  host: 'localhost',
  dialect: 'mysql',
});

class Product extends Model {}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    cid: {
      type: DataTypes.INTEGER,
    },
    category: {
      type: DataTypes.STRING,
    },
    brand: {
      type: DataTypes.STRING,
    },
    mrp: {
      type: DataTypes.INTEGER,
    },
    discount_price: {
      type: DataTypes.INTEGER,
    },
    stock: {
      type: DataTypes.INTEGER,
    },
  },
  { sequelize: prodSequelize, modelName: 'productList', tableName: 'productList', timestamps: false } // Specify model and table name
);

// Sync the model with the database
Product.sync()
  .then(() => {
    console.log('All product model synced with database');
  })
  .catch((error) => {
    console.error('Error syncing all product model:', error);
  });

module.exports = { Product, prodSequelize };
