const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLID,
} = require('graphql');

const { UUIDV4 } = require('sequelize');

const AlbumType = new GraphQLObjectType({
  name: 'Album',
  description: 'This represents an Album',
  fields: () => ({
    id: {
      type: GraphQLID,
      defaultValue: UUIDV4,
      resolve: (album) => album.id,
    },
    spotifyId: {
      type: GraphQLString,
      resolve: (album) => album.spotifyId,
    },
    // spotifyData: {
    //   type: GraphQLString,
    //   resolve: (album) => album.spotifyId,
    // },
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
      resolve: (album) => album.createdAt,
    },
  }),
});

module.exports = { AlbumType };
