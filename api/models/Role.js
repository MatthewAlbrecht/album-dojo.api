const Sequelize = require('sequelize');
const sequelize = require('../../config/database');

const tableName = 'roles';

const Role = sequelize.define('Role', {
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

module.exports = { Role };
