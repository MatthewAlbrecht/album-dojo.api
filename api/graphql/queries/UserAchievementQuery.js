const { GraphQLID, GraphQLString, GraphQLList } = require('graphql')

const { UserAchievementType } = require('../types')
const { UserAchievement } = require('../../models')

const userAchievementQuery = {
  type: new GraphQLList(UserAchievementType),
  args: {
    id: {
      name: 'id',
      type: GraphQLID,
    },
    userId: {
      name: 'userId',
      type: GraphQLID,
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
  resolve: (userAchievement, args) => UserAchievement.findAll({ where: args }),
}

module.exports = { userAchievementQuery }
