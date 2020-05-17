/* eslint-disable global-require */
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
} = require('graphql');
const {
  User,
  Achievement,
  UserAlbum,
  List,
  Action,
} = require('../../models');

const UserActionType = new GraphQLObjectType({
  name: 'UserAction',
  description: 'This represents an UserAction',
  fields: () => ({
    id: {
      type: GraphQLID,
      resolve: (userAction) => userAction.id,
    },
    userId: {
      type: GraphQLID,
      resolve: (userAction) => userAction.userId,
    },
    user: {
      type: require('./UserType').UserType,
      resolve: (userAction) => User.findByPk(userAction.userId),
    },
    actionCode: {
      type: GraphQLString,
      resolve: (userAction) => userAction.actionCode,
    },
    achievementCode: {
      type: GraphQLString,
      resolve: (userAction) => userAction.achievementCode,
    },
    listId: {
      type: GraphQLID,
      resolve: (userAction) => userAction.listId,
    },
    userAlbumId: {
      type: GraphQLID,
      resolve: (userAction) => userAction.userAlbumId,
    },
    action: {
      type: require('./ActionType').ActionType,
      resolve: (userAction) => Action.findOne({
        where: { code: userAction.actionCode },
      }),
    },
    achievement: {
      type: require('./PermissionType').PermissionType,
      resolve: (userAction) => Achievement.findOne({
        where: { code: userAction.achievementCode },
      }),
    },
    list: {
      type: require('./ListType').ListType,
      resolve: (userAction) => List.findByPk(userAction.listId),
    },
    userAlbum: {
      type: require('./UserAlbumType').UserAlbumType,
      resolve: (userAction) => UserAlbum.findByPk(userAction.userAlbumId),
    },
    createdAt: {
      type: GraphQLString,
      resolve: (userAction) => userAction.createdAt,
    },
    updatedAt: {
      type: GraphQLString,
      resolve: (userAction) => userAction.updatedAt,
    },
  }),
});

module.exports = { UserActionType };
