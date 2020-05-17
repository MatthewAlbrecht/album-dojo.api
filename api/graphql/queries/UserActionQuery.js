const {
  GraphQLID,
  GraphQLString,
  GraphQLList,
} = require('graphql');

const { UserActionType } = require('../types');
const { UserAction } = require('../../models');

const userActionQuery = {
  type: new GraphQLList(UserActionType),
  args: {
    id: {
      name: 'id',
      type: GraphQLID,
    },
    userId: {
      name: 'userId',
      type: GraphQLID,
    },
    actionCode: {
      name: 'actionCode',
      type: GraphQLString,
    },
    achievementCode: {
      name: 'achievementCode',
      type: GraphQLString,
    },
    listId: {
      name: 'listId',
      type: GraphQLID,
    },
    userAlbumId: {
      name: 'userAlbumId',
      type: GraphQLID,
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
  resolve: (userAction, args) => UserAction.findAll({ where: args }),
};

module.exports = { userActionQuery };
