const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLInt,
  GraphQLList,
} = require('graphql')

const { ActionType } = require('../types')

const ActionConnection = new GraphQLObjectType({
  name: 'ActionsConnection',
  description: 'This represents a paginatable list of Actions',
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
    actions: {
      type: new GraphQLList(ActionType),
      resolve: connection => connection.actions,
    },
  }),
})

module.exports = { ActionConnection }
