const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLInt,
  GraphQLList,
} = require('graphql')

const { AlbumGenreType } = require('../types')

const AlbumGenreConnection = new GraphQLObjectType({
  name: 'AlbumGenresConnection',
  description: 'This represents a paginatable list of AlbumGenres',
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
    albumGenres: {
      type: new GraphQLList(AlbumGenreType),
      resolve: connection => connection.albumGenres,
    },
  }),
})

module.exports = { AlbumGenreConnection }
