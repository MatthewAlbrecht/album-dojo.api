const {
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLBoolean,
} = require('graphql')
const { GraphQLJSONObject } = require('graphql-type-json')

const { AlbumType } = require('../types')
const { Album } = require('../../models')

const albumQuery = {
  type: new GraphQLList(AlbumType),
  args: {
    id: {
      type: GraphQLID,
      name: 'id',
    },
    spotifyId: {
      type: GraphQLString,
      name: 'spotifyId',
    },
    artists: {
      type: new GraphQLList(GraphQLJSONObject),
      name: 'artists',
    },
    images: {
      type: new GraphQLList(GraphQLJSONObject),
      name: 'images',
    },
    name: {
      type: GraphQLString,
      name: 'name',
    },
    releaseDate: {
      type: GraphQLString,
      name: 'releaseDate',
    },
    releaseDatePrecision: {
      type: GraphQLString,
      name: 'releaseDatePrecision',
    },
    totalTracks: {
      type: GraphQLInt,
      name: 'totalTracks',
    },
    durationInMs: {
      type: GraphQLInt,
      name: 'durationInMs',
    },
    tracks: {
      type: new GraphQLList(GraphQLString),
      name: 'tracks',
    },
    active: {
      type: GraphQLBoolean,
      name: 'active',
    },
    createdAt: {
      type: GraphQLString,
      name: 'createdAt',
    },
    updatedAt: {
      type: GraphQLString,
      name: 'updatedAt',
    },
  },
  resolve: (album, args) => Album.findAll({ where: args }),
}

module.exports = { albumQuery }
