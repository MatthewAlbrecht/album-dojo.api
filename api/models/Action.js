const Sequelize = require('sequelize');

const sequelize = require('../../config/database');

const tableName = 'actions';

const Action = sequelize.define('Action', {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
  },
  code: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      is: /[A-Z]{2}\d{3}/,
    },
  },
  name: {
    type: Sequelize.STRING,
  },
  description: {
    type: Sequelize.STRING(511),
  },
  level: {
    type: Sequelize.INTEGER,
  },
  points: {
    type: Sequelize.INTEGER,
  },
}, { tableName });

module.exports = { Action };
