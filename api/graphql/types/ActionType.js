const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
} = require('graphql')
const { Op } = require('sequelize')

const { Action, Achievement } = require('../../models')

const ActionType = new GraphQLObjectType({
  name: 'Action',
  description: 'This represents an Action',
  fields: () => ({
    name: {
      type: GraphQLString,
      resolve: action => action.name,
    },
    code: {
      type: GraphQLString,
      resolve: action => action.code,
    },
    description: {
      type: GraphQLString,
      resolve: action => action.description,
    },
    level: {
      type: GraphQLInt,
      resolve: action => action.level,
    },
    points: {
      type: GraphQLInt,
      resolve: action => action.points,
    },
    achievementCode: {
      type: GraphQLString,
      resolve: action => action.achievementCode,
    },
    achievement: {
      type: require('./AchievementType').AchievementType,
      resolve: action => Achievement.findByPk(action.achievementCode),
    },
    relatedActions: {
      type: new GraphQLList(ActionType),
      resolve: action =>
        Action.findAll({
          where: {
            code: {
              [Op.startsWith]: action.code.slice(0, 2),
            },
          },
        }),
    },
    createdAt: {
      type: GraphQLString,
      resolve: action => action.createdAt,
    },
    updatedAt: {
      type: GraphQLString,
      resolve: action => action.updatedAt,
    },
  }),
})

module.exports = { ActionType }
