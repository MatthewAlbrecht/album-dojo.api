const Sequelize = require('sequelize');

const sequelize = require('../../config/database');

const { User } = require('./User');

const tableName = 'lists';

const List = sequelize.define('List', {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
  },
  userId: {
    type: Sequelize.UUID,
    references: {
      model: User,
      key: 'id',
    },
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING,
  },
  description: {
    type: Sequelize.STRING(511),
  },
  maxCount: {
    type: Sequelize.INTEGER,
  },
  createdFromTemplate: {
    type: Sequelize.BOOLEAN,
  },
}, { tableName });

module.exports = { List };
