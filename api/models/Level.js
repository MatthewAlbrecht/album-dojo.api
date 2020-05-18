const Sequelize = require('sequelize');
const sequelize = require('../../config/database');

const tableName = 'levels';

const Level = sequelize.define('Level', {
  level: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
  points: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
}, { tableName });

module.exports = { Level };
