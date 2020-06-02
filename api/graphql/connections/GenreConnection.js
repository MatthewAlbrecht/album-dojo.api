const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLInt,
  GraphQLList,
} = require('graphql')

const { GenreType } = require('../types')

const GenreConnection = new GraphQLObjectType({
  name: 'GenresConnection',
  description: 'This represents a paginatable list of Genres',
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
    genres: {
      type: new GraphQLList(GenreType),
      resolve: connection => connection.genres,
    },
  }),
})

module.exports = { GenreConnection }
