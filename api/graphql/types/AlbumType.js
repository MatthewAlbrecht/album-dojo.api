const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
  GraphQLInt,
  GraphQLID,
} = require('graphql')
const { GraphQLJSONObject } = require('graphql-type-json')
const { GenreType } = require('./GenreType')

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
    genres: {
      type: new GraphQLList(GenreType),
      resolve: async album => album.getGenres(),
    },
    duplicateOfId: {
      type: GraphQLString,
      resolve: album => album.duplicateOfId,
    },
    duplicateOf: {
      type: AlbumType,
      resolve: album => album.getDuplicate(),
    },
    duplicates: {
      type: AlbumType,
      resolve: album => album.getDuplicates(),
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

module.exports = { AlbumType }
