const Sequelize = require('sequelize')

const sequelize = require('../../config/database')

const tableName = 'lists'

const List = sequelize.define(
  'List',
  {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
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
  },
  { tableName }
)

module.exports = { List }
