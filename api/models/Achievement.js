const Sequelize = require('sequelize');

const sequelize = require('../../config/database');

const tableName = 'achievements';

const Achievement = sequelize.define('Achievement', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
  },
  code: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      is: /[A-Z]{2}\d{3}/,
    },
  },
  description: {
    type: Sequelize.STRING(511),
  },
  level: {
    type: Sequelize.INTEGER,
  },
  imageUrl: {
    type: Sequelize.STRING,
    validate: {
      isUrl: true,
    },
  },
}, { tableName });

module.exports = { Achievement };
