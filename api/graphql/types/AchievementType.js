const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLInt,
} = require('graphql')
const { Op } = require('sequelize')

const { Achievement, Action } = require('../../models')

const AchievementType = new GraphQLObjectType({
  name: 'Achievement',
  description: 'This represents an Achievement',
  fields: () => ({
    name: {
      type: GraphQLString,
      resolve: achievement => achievement.name,
    },
    code: {
      type: GraphQLString,
      resolve: achievement => achievement.code,
    },
    description: {
      type: GraphQLString,
      resolve: achievement => achievement.description,
    },
    level: {
      type: GraphQLInt,
      resolve: achievement => achievement.level,
    },
    imageUrl: {
      type: GraphQLString,
      resolve: achievement => achievement.imageUrl,
    },
    relatedAchievements: {
      type: new GraphQLList(AchievementType),
      resolve: achievement =>
        Achievement.findAll({
          where: {
            code: {
              [Op.startsWith]: achievement.code.slice(0, 2),
            },
          },
        }),
    },
    relatedAction: {
      type: require('./ActionType').ActionType,
      resolve: achievement =>
        Action.findOne({
          where: {
            achievementCode: achievement.code,
          },
        }),
    },
    createdAt: {
      type: GraphQLString,
      resolve: achievement => achievement.createdAt,
    },
    updatedAt: {
      type: GraphQLString,
      resolve: achievement => achievement.updatedAt,
    },
  }),
})

module.exports = { AchievementType }
