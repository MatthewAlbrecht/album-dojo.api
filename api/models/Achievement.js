const Sequelize = require('sequelize')

const sequelize = require('../../config/database')

const tableName = 'achievements'

const Achievement = sequelize.define(
  'Achievement',
  {
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
    imageUrl: {
      type: Sequelize.STRING,
      validate: {
        isUrl: true,
      },
    },
  },
  { tableName }
)

module.exports = { Achievement }
