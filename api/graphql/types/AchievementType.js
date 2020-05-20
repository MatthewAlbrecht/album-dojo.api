const { GraphQLObjectType, GraphQLString, GraphQLInt } = require('graphql')

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
