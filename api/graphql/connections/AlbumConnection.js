const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLInt,
  GraphQLList,
} = require('graphql')

const { AlbumType } = require('../types')

const AlbumConnection = new GraphQLObjectType({
  name: 'AlbumsConnection',
  description: 'This represents a paginatable list of Albums',
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
    albums: {
      type: new GraphQLList(AlbumType),
      resolve: connection => connection.albums,
    },
  }),
})

module.exports = { AlbumConnection }
