/* eslint-disable global-require */
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
} = require('graphql');
const {
  User,
  Achievement,
  List,
  UserAlbum,
} = require('../../models');

const UserAchievementType = new GraphQLObjectType({
  name: 'UserAchievement',
  description: 'This represents an UserAchievement',
  fields: () => ({
    id: {
      type: GraphQLID,
      resolve: (userAchievement) => userAchievement.id,
    },
    userId: {
      type: GraphQLID,
      resolve: (userAchievement) => userAchievement.userId,
    },
    achievementCode: {
      type: GraphQLString,
      resolve: (userAchievement) => userAchievement.achievementCode,
    },
    user: {
      type: require('./UserType').UserType,
      resolve: (userAchievement) => User.findByPk(userAchievement.userId),
    },
    achievement: {
      type: require('./PermissionType').PermissionType,
      resolve: (userAchievement) => Achievement.findOne({
        where: { code: userAchievement.achievementCode },
      }),
    },
    listId: {
      type: GraphQLID,
      resolve: (userAchievement) => userAchievement.listId,
    },
    list: {
      type: require('./ListType').ListType,
      resolve: (userAchievement) => List.findByPk(userAchievement.listId),
    },
    userAlbum: {
      type: require('./UserAlbumType').UserAlbumType,
      resolve: (userAchievement) => UserAlbum.findByPk(userAchievement.userAlbumId),
    },
    userAlbumId: {
      type: GraphQLID,
      resolve: (userAchievement) => userAchievement.userAlbumId,
    },
    createdAt: {
      type: GraphQLString,
      resolve: (userAchievement) => userAchievement.createdAt,
    },
    updatedAt: {
      type: GraphQLString,
      resolve: (userAchievement) => userAchievement.updatedAt,
    },
  }),
});

module.exports = { UserAchievementType };
