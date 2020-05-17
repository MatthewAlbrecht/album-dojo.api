const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLID,
} = require('graphql');
const { GraphQLJSONObject } = require('graphql-type-json');

const AlbumType = new GraphQLObjectType({
  name: 'Album',
  description: 'This represents an Album',
  fields: () => ({
    id: {
      type: GraphQLID,
      resolve: (album) => album.id,
    },
    spotifyId: {
      type: GraphQLString,
      resolve: (album) => album.spotifyId,
    },
    spotifyData: {
      type: GraphQLJSONObject,
      resolve: (album) => album.spotifyData,
    },
    isFeatured: {
      type: GraphQLBoolean,
      resolve: (album) => album.isFeatured,
    },
    createdAt: {
      type: GraphQLString,
      resolve: (album) => album.createdAt,
    },
    updatedAt: {
      type: GraphQLString,
      resolve: (album) => album.updatedAt,
    },
  }),
});

module.exports = { AlbumType };
