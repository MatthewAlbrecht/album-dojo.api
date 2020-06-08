const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLInt,
  GraphQLList,
} = require('graphql')

const { AchievementType } = require('../types')

const AchievementConnection = new GraphQLObjectType({
  name: 'AchievementsConnection',
  description: 'This represents a paginatable list of Achievements',
  fields: () => ({
    totalCount: {
      type: GraphQLInt,
      resolve: connection => connection.totalCount,
    },
    cursor: {
      type: GraphQLString,
      resolve: connection => connection.cursor,
    },
    hasMore: {
      type: GraphQLBoolean,
      resolve: connection => connection.hasMore,
    },
    achievements: {
      type: new GraphQLList(AchievementType),
      resolve: connection => connection.achievements,
    },
  }),
})

module.exports = { AchievementConnection }
