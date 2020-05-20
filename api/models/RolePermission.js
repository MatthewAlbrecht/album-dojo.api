const Sequelize = require('sequelize')
const sequelize = require('../../config/database')

const tableName = 'rolePermissions'
const RolePermission = sequelize.define(
  'RolePermission',
  {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
    },
  },
  { tableName }
)

module.exports = { RolePermission }
