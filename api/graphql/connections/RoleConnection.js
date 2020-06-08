const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLInt,
  GraphQLList,
} = require('graphql')

const { RoleType } = require('../types')

const RoleConnection = new GraphQLObjectType({
  name: 'RolesConnection',
  description: 'This represents a paginatable list of Roles',
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
    roles: {
      type: new GraphQLList(RoleType),
      resolve: connection => connection.roles,
    },
  }),
})

module.exports = { RoleConnection }
