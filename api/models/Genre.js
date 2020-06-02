const Sequelize = require('sequelize')
const sequelize = require('../../config/database')

const tableName = 'genres'

const Genre = sequelize.define(
  'Genre',
  {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING,
    },
  },
  { tableName }
)

module.exports = { Genre }
