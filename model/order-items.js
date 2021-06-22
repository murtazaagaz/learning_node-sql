const Sequelize = require('sequelize');

const sequelize = require('../utils/database');

const OrderItems = sequelize.define(`orderItems`, {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  quantity: Sequelize.INTEGER,
});

module.exports = OrderItems;
