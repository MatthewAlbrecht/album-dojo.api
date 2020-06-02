const {
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLID,
  GraphQLBoolean,
} = require('graphql')
const { GraphQLJSONObject } = require('graphql-type-json')

const AlbumInputType = type => {
  let allGraphFields = {}

  switch (type) {
    case 'delete':
      allGraphFields = {
        id: {
          type: new GraphQLNonNull(GraphQLID),
        },
      }
      break
    case 'update':
      allGraphFields = {
        id: {
          type: new GraphQLNonNull(GraphQLID),
        },
        spotifyId: {
          type: GraphQLString,
        },
        duplicateSpotifyIds: {
          type: new GraphQLList(GraphQLJSONObject),
        },
        artists: {
          type: new GraphQLList(GraphQLJSONObject),
        },
        images: {
          type: new GraphQLList(GraphQLJSONObject),
        },
        name: {
          type: GraphQLString,
        },
        releaseDatePrecision: {
          type: GraphQLString,
        },
        totalTracks: {
          type: GraphQLInt,
        },
        durationInMs: {
          type: GraphQLInt,
        },
        tracks: {
          type: new GraphQLList(GraphQLString),
        },
        active: {
          type: GraphQLBoolean,
        },
      }
      break
    case 'create':
      allGraphFields = {
        spotifyId: {
          type: GraphQLString,
        },
        duplicateSpotifyIds: {
          type: new GraphQLList(GraphQLJSONObject),
        },
        artists: {
          type: new GraphQLList(GraphQLJSONObject),
        },
        images: {
          type: new GraphQLList(GraphQLJSONObject),
        },
        name: {
          type: GraphQLString,
        },
        releaseDate: {
          type: GraphQLString,
        },
        totalTracks: {
          type: GraphQLInt,
        },
        durationInMs: {
          type: GraphQLInt,
        },
        tracks: {
          type: new GraphQLList(GraphQLString),
        },
        active: {
          type: GraphQLBoolean,
        },
      }
      break
    case 'createById':
      allGraphFields = {
        spotifyId: {
          type: new GraphQLNonNull(GraphQLString),
        },
        spotifyAccessToken: {
          type: new GraphQLNonNull(GraphQLString),
        },
      }
      break
    case 'createByPlaylistId':
      allGraphFields = {
        spotifyPlaylistId: {
          type: new GraphQLNonNull(GraphQLString),
        },
        spotifyAccessToken: {
          type: new GraphQLNonNull(GraphQLString),
        },
      }
      break
    default:
      allGraphFields = {
        id: {
          type: new GraphQLNonNull(GraphQLID),
        },
      }
  }

  const albumInputType = new GraphQLInputObjectType({
    name: `AlbumInputType${type[0].toUpperCase() + type.slice(1)}`,
    description: 'This represents a AlbumInputType',
    fields: allGraphFields,
  })

  return albumInputType
}

module.exports = { AlbumInputType }
