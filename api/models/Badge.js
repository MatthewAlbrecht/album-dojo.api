const Sequelize = require('sequelize');

const sequelize = require('../../config/database');

const tableName = 'badges';

const Badge = sequelize.define('Badge', {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING,
  },
  code: {
    type: Sequelize.STRING,
  },
  description: {
    type: Sequelize.STRING(511),
  },
  imageUrl: {
    type: Sequelize.STRING,
    validate: {
      isUrl: true,
    },
  },
}, { tableName });

module.exports = { Badge };
