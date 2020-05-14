const {
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
} = require('graphql');

const { UserAlbumType } = require('../types');
const { UserAlbum } = require('../../models');

const userAlbumQuery = {
  type: new GraphQLList(UserAlbumType),
  args: {
    id: {
      name: 'id',
      type: GraphQLID,
    },
    userId: {
      name: 'userId',
      type: GraphQLID,
    },
    albumId: {
      name: 'albumId',
      type: GraphQLID,
    },
    // user: {
    //   type: UserType,
    //   resolve: (userAlbum) => userAlbum.getUser(),
    // },
    // album: {
    //   type: AlbumType,
    //   resolve: (userAlbum) => userAlbum.getAlbum(),
    // },
    rating: {
      name: 'rating',
      type: GraphQLInt,
    },
    listenDate: {
      name: 'listenDate',
      type: GraphQLString,
    },
    tags: {
      name: 'tags',
      type: new GraphQLList(GraphQLString),
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
  resolve: (userAlbum, args) => UserAlbum.findAll({ where: args }),
};

module.exports = { userAlbumQuery };
