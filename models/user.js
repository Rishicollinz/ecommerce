const { Sequelize, DataTypes, Model } = require('sequelize');

const database = 'ecommerce';
const username = 'root';
const password = '';
const sequelize = new Sequelize(database, username, password, {
  host: 'localhost',
  dialect: 'mysql',
});

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    category: {
      type: DataTypes.STRING,
    },
    quantity: {
      type: DataTypes.INTEGER,
    },
    date: {
      type: DataTypes.DATE,
    },
  },
  { sequelize, modelName: 'categoryList', tableName: 'categoryList', timestamps:false } // Specify model and table name
);

// Sync the model with the database
User.sync()
  .then(() => {
    console.log('User model synced with database');
  })
  .catch((error) => {
    console.error('Error syncing User model:', error);
  });


module.exports = { User, sequelize }; 