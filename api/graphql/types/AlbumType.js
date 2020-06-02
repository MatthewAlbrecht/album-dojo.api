const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
  GraphQLInt,
  GraphQLID,
} = require('graphql')
const { GraphQLJSONObject } = require('graphql-type-json')

const AlbumConnection = new GraphQLObjectType({
  name: 'Albums',
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

const AlbumType = new GraphQLObjectType({
  name: 'Album',
  description: 'This represents an Album',
  fields: () => ({
    id: {
      type: GraphQLID,
      resolve: album => album.id,
    },
    spotifyId: {
      type: GraphQLString,
      resolve: album => album.spotifyId,
    },
    artists: {
      type: new GraphQLList(GraphQLJSONObject),
      resolve: album => album.artists,
    },
    images: {
      type: new GraphQLList(GraphQLJSONObject),
      resolve: album => album.images,
    },
    name: {
      type: GraphQLString,
      resolve: album => album.name,
    },
    releaseDate: {
      type: GraphQLString,
      resolve: album => album.releaseDate,
    },
    releaseDatePrecision: {
      type: GraphQLString,
      resolve: album => album.releaseDatePrecision,
    },
    totalTracks: {
      type: GraphQLInt,
      resolve: album => album.totalTracks,
    },
    durationInMs: {
      type: GraphQLInt,
      resolve: album => album.durationInMs,
    },
    tracks: {
      type: new GraphQLList(GraphQLString),
      resolve: album => album.tracks,
    },
    active: {
      type: GraphQLBoolean,
      resolve: album => album.active,
    },
    createdAt: {
      type: GraphQLString,
      resolve: album => album.createdAt,
    },
    updatedAt: {
      type: GraphQLString,
      resolve: album => album.updatedAt,
    },
  }),
})

module.exports = { AlbumType, AlbumConnection }
