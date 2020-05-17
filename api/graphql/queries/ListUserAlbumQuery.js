const {
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
} = require('graphql');

const { ListUserAlbumType } = require('../types');
const { ListUserAlbum } = require('../../models');

const listUserAlbumQuery = {
  type: new GraphQLList(ListUserAlbumType),
  args: {
    id: {
      name: 'id',
      type: GraphQLID,
    },
    listId: {
      name: 'listId',
      type: GraphQLID,
    },
    userAlbumId: {
      name: 'listId',
      type: GraphQLID,
    },
    rank: {
      name: 'rank',
      type: GraphQLInt,
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
  resolve: (listUserAlbum, args) => ListUserAlbum.findAll({ where: args }),
};

module.exports = { listUserAlbumQuery };
