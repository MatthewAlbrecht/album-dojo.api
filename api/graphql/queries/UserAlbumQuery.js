const {
  GraphQLID,
  GraphQLString,
  GraphQLFloat,
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
    rating: {
      name: 'rating',
      type: GraphQLFloat,
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
