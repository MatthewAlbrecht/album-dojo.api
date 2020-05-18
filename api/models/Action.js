const Sequelize = require('sequelize');
const sequelize = require('../../config/database');
const { Achievement } = require('./Achievement');

const tableName = 'actions';

const Action = sequelize.define('Action', {
  code: {
    type: Sequelize.STRING,
    primaryKey: true,
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
  achievementCode: {
    type: Sequelize.STRING,
    references: {
      model: Achievement,
      key: 'code',
    },
    allowNull: true,
  },
}, { tableName });

module.exports = { Action };
