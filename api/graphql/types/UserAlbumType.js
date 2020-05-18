/* eslint-disable global-require */
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLFloat,
  GraphQLList,
} = require('graphql');

const { AlbumType } = require('./AlbumType');
const { Album, User } = require('../../models');

const UserAlbumType = new GraphQLObjectType({
  name: 'UserAlbum',
  description: 'This represents a User',
  fields: () => ({
    id: {
      type: GraphQLID,
      resolve: (userAlbum) => userAlbum.id,
    },
    userId: {
      type: GraphQLID,
      resolve: (userAlbum) => userAlbum.userId,
    },
    albumId: {
      type: GraphQLID,
      resolve: (userAlbum) => userAlbum.albumId,
    },
    user: {
      type: require('./UserType').UserType,
      resolve: (userAlbum) => User.findByPk(userAlbum.userId),
    },
    album: {
      type: AlbumType,
      resolve: (userAlbum) => Album.findByPk(userAlbum.albumId),
    },
    rating: {
      type: GraphQLFloat,
      resolve: (userAlbum) => userAlbum.rating,
    },
    listenDate: {
      type: GraphQLString,
      resolve: (userAlbum) => userAlbum.listenDate,
    },
    tags: {
      type: new GraphQLList(GraphQLString),
      resolve: (userAlbum) => userAlbum.tags,
    },
    createdAt: {
      type: GraphQLString,
      resolve: (userAlbum) => userAlbum.createdAt,
    },
    updatedAt: {
      type: GraphQLString,
      resolve: (userAlbum) => userAlbum.updatedAt,
    },
  }),
});

module.exports = { UserAlbumType };
