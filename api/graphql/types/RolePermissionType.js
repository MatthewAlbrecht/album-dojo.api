/* eslint-disable global-require */
const { GraphQLObjectType, GraphQLString, GraphQLID } = require('graphql')
const { Permission, Role } = require('../../models')

const RolePermissionType = new GraphQLObjectType({
  name: 'RolePermission',
  description: 'This represents an RolePermission',
  fields: () => ({
    id: {
      type: GraphQLID,
      resolve: rolePermission => rolePermission.id,
    },
    roleName: {
      type: GraphQLString,
      resolve: rolePermission => rolePermission.roleName,
    },
    permissionName: {
      type: GraphQLString,
      resolve: rolePermission => rolePermission.permissionName,
    },
    permission: {
      type: require('./PermissionType').PermissionType,
      resolve: rolePermission =>
        Permission.findByPk(rolePermission.permissionName),
    },
    role: {
      type: require('./RoleType').RoleType,
      resolve: rolePermission => Role.findByPk(rolePermission.roleName),
    },
    createdAt: {
      type: GraphQLString,
      resolve: rolePermission => rolePermission.createdAt,
    },
    updatedAt: {
      type: GraphQLString,
      resolve: rolePermission => rolePermission.updatedAt,
    },
  }),
})

module.exports = { RolePermissionType }
