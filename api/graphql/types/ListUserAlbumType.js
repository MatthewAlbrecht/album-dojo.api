/* eslint-disable global-require */
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
} = require('graphql');
const { UserAlbum } = require('../../models');

const ListUserAlbumType = new GraphQLObjectType({
  name: 'ListUserAlbum',
  description: 'This represents an ListUserAlbum',
  fields: () => ({
    id: {
      type: GraphQLID,
      resolve: (listUserAlbum) => listUserAlbum.id,
    },
    listId: {
      type: GraphQLID,
      resolve: (listUserAlbum) => listUserAlbum.listId,
    },
    userAlbum: {
      type: require('./UserAlbumType').UserAlbumType,
      resolve: (listUserAlbum) => UserAlbum.findByPk(listUserAlbum.userAlbumId),
    },
    rank: {
      type: GraphQLInt,
      resolve: (listUserAlbum) => listUserAlbum.rank,
    },
    createdAt: {
      type: GraphQLString,
      resolve: (listUserAlbum) => listUserAlbum.createdAt,
    },
    updatedAt: {
      type: GraphQLString,
      resolve: (listUserAlbum) => listUserAlbum.updatedAt,
    },
  }),
});

module.exports = { ListUserAlbumType };
