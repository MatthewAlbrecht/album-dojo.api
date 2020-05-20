const { GraphQLID, GraphQLString, GraphQLList } = require('graphql')

const { RolePermissionType } = require('../types')
const { RolePermission } = require('../../models')

const rolePermissionQuery = {
  type: new GraphQLList(RolePermissionType),
  args: {
    id: {
      name: 'id',
      type: GraphQLID,
    },
    roleName: {
      name: 'roleName',
      type: GraphQLString,
    },
    permissionName: {
      name: 'permissionName',
      type: GraphQLString,
    },
    createdAt: {
      name: 'createdAt',
      type: GraphQLString,
    },
    updatedAt: {
      name: 'updatedAt',
      type: GraphQLString,
    },
  },
  resolve: (rolePermission, args) => RolePermission.findAll({ where: args }),
}

module.exports = { rolePermissionQuery }
