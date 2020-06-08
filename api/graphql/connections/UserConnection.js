const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLInt,
  GraphQLList,
} = require('graphql')

const { UserType } = require('../types')

const UserConnection = new GraphQLObjectType({
  name: 'UsersConnection',
  description: 'This represents a paginatable list of Users',
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
    users: {
      type: new GraphQLList(UserType),
      resolve: connection => connection.users,
    },
  }),
})

module.exports = { UserConnection }
