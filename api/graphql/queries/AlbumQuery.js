const {
  GraphQLID,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
} = require('graphql');

const { AlbumType } = require('../types');
const { Album } = require('../../models');

const albumQuery = {
  type: new GraphQLList(AlbumType),
  args: {
    id: {
      name: 'id',
      type: GraphQLID,
    },
    isFeatured: {
      name: 'isFeatured',
      type: GraphQLBoolean,
    },
    spotifyId: {
      name: 'spotifyId',
      type: GraphQLString,
    },
    createdAt: {
      name: 'createdAt',
      type: GraphQLString,
    },
    updatedAt: {
      name: 'updatedAt',
      type: GraphQLString,
    },
  },
  resolve: (album, args) => Album.findAll({ where: args }),
};

module.exports = { albumQuery };
