const Sequelize = require('sequelize');

const sequelize = require('../../config/database');

const tableName = 'achievements';

const Achievement = sequelize.define('Achievement', {
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
  basePoints: {
    type: Sequelize.INTEGER,
  },
}, { tableName });

module.exports = { Achievement };
