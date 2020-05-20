const Sequelize = require('sequelize')
const sequelize = require('../../config/database')

const tableName = 'roles'

const Role = sequelize.define(
  'Role',
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING,
      primaryKey: true,
      unique: true,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING,
    },
  },
  { tableName }
)

module.exports = { Role }
