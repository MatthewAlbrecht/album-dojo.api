const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLInt,
  GraphQLList,
} = require('graphql')

const { PermissionType } = require('../types')

const PermissionConnection = new GraphQLObjectType({
  name: 'PermissionsConnection',
  description: 'This represents a paginatable list of Permissions',
  fields: () => ({
    totalCount: {
      type: GraphQLInt,
      resolve: connection => connection.totalCount,
    },
    cursor: {
      type: GraphQLString,
      resolve: connection => connection.cursor,
    },
    hasMore: {
      type: GraphQLBoolean,
      resolve: connection => connection.hasMore,
    },
    permissions: {
      type: new GraphQLList(PermissionType),
      resolve: connection => connection.permissions,
    },
  }),
})

module.exports = { PermissionConnection }
