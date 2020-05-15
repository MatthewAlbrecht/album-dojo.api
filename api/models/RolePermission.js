const Sequelize = require('sequelize');
const sequelize = require('../../config/database');
const { Role } = require('./Role');
const { Permission } = require('./Permission');

const tableName = 'rolePermissions';
const RolePermission = sequelize.define('RolePermission', {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
  },
  roleName: {
    type: Sequelize.STRING,
    references: {
      model: Role,
      key: 'name',
    },
    allowNull: false,
  },
  permissionName: {
    type: Sequelize.STRING,
    references: {
      model: Permission,
      key: 'name',
    },
    allowNull: false,
  },
}, { tableName });

module.exports = { RolePermission };
