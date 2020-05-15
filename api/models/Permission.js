const Sequelize = require('sequelize');
const sequelize = require('../../config/database');

const tableName = 'permissions';
const Permission = sequelize.define('Permission', {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
  },
}, { tableName });

module.exports = { Permission };
