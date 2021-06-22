const Sequelize = require('sequelize');

const sequelize = require('../utils/database');

const CartItems = sequelize.define('CartItems', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  quantity: Sequelize.INTEGER,
});

module.exports = CartItems;
