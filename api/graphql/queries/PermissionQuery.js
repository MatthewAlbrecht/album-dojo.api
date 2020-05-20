const { GraphQLID, GraphQLString, GraphQLList } = require('graphql')

const { PermissionType } = require('../types')
const { Permission } = require('../../models')

const permissionQuery = {
  type: new GraphQLList(PermissionType),
  args: {
    id: {
      name: 'id',
      type: GraphQLID,
    },
    name: {
      name: 'name',
      type: GraphQLString,
    },
    description: {
      name: 'description',
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
  resolve: (permission, args) => Permission.findAll({ where: args }),
}

module.exports = { permissionQuery }
